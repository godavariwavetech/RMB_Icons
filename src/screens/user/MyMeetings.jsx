import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Loader from '../../components/loader';

const MyMeetings = () => {
    const [meetingsData, setMeetingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { userId } = useSelector(state => state.Auth);


    function convertTo12HourFormat(time24) {
        const [hours, minutes, seconds] = time24.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        return date.toLocaleTimeString([], options);
    }

    useEffect(() => {
        FetchedData();
    }, [userId]);

    const FetchedData = async () => {
        setLoading(true);
        try {
            const response = await api.post('get_usesr_attendance_list', { "rmb_user_id": userId });
            const data = await response.data.data || [];
            console.log(data, 'My meetings data');
            setMeetingsData(data);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderMeetingItem = ({ item: meeting }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image
                    source={require('../../assets/meetingLogo.png')}
                    style={styles.icon}
                />
                <View>
                    <Text style={styles.meetingTitle} numberOfLines={2}>
                        {meeting?.meet_venue ?? 'Lahospin'}
                    </Text>
                    <View style={styles.timeRow}>
                        <Icon name="clock" size={16} color="#888" />
                        <Text style={styles.timeText}>{meeting?.attend_time ? convertTo12HourFormat(meeting?.attend_time) : "N/A"}</Text>
                        <MaterialIcons
                            name="calendar-today"
                            size={16}
                            color="#888"
                            style={{ marginLeft: 10 }}
                        />
                        <Text style={styles.timeText}>
                            {meeting?.attend_date ?? 'N/A'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* <View style={styles.notesContainer}>
                <Text style={styles.notesTitle}>Meeting Notes:</Text>
                <ScrollView style={styles.notesScroll} nestedScrollEnabled={true}>
                    {meeting.notes?.map((note, index) => (
                        <Text key={index} style={styles.noteText}>
                            {`\u2022 ${note}`}
                        </Text>
                    ))}
                </ScrollView>
            </View> */}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>My Meetings</Text>
            </View>
            <View style={styles.hr} />

            {
                loading ? (
                    <Loader size='large' color={commonStyles.mainColor} />
                ):
            <FlatList
                data={meetingsData}
                keyExtractor={(item) => item.id?.toString()}
                contentContainerStyle={styles.scrollContent}
                ListHeaderComponent={() => (
                    <Text style={styles.sectionTitle}>Past Meetings</Text>
                )}
                renderItem={renderMeetingItem}
                ListEmptyComponent={() => (
                    !loading && <Text style={[commonStyles.text1,{color:commonStyles.lightColor,marginTop:responsiveHeight(40)}]}>No meetings available.</Text>
                )}
            />
            }

        </View>
    );
};

export default MyMeetings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0A1F3C",
        flex: 1,
        textAlign: 'center'
    },
    hr: {
        height: 0.5,
        backgroundColor: "#ccc",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 12,
        color: '#000',
    },
    card: {
        backgroundColor: '#eef2f7',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#d0d7e2',
        flex: 1
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    icon: {
        width: 43,
        height: 48,
        marginRight: 12,
        resizeMode: 'contain',
    },
    meetingTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        color: '#002855',
        flex: 1,
        flexShrink: 1,
        maxWidth: '90%'
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 4,
        fontWeight: '400'
    },
    notesContainer: {
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: commonStyles.mainColor,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    notesTitle: {
        fontWeight: '600',
        marginBottom: 4,
        color: '#002855',
    },
    noteText: {
        fontSize: 13,
        color: '#444',
    },
    notesScroll: {
        maxHeight: 72,
    },
});
