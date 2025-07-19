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
    const [activeTab, setActiveTab] = useState('Present'); // State to manage active tab
    const navigation = useNavigation();
    const { userId } = useSelector(state => state.Auth);

    function convertTo12HourFormat(time24) {
        if (!time24) return 'N/A';
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
            const response = await api.post('getpresentabsentdata', { "user_id":userId});
            const data = await response.data.data || [];
            console.log(data, 'My meetings data');
            setMeetingsData(data);
        } catch (error) {
            console.error('Error fetching meetings:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMeetings = meetingsData.filter(meeting =>
        meeting.attendance_status === activeTab
    );

    const renderMeetingItem = ({ item: meeting }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image
                    source={meeting?.attend_image ? {uri:meeting?.attend_image} : require('../../assets/meetingLogo.png')}
                    style={styles.icon}
                />
                <View>
                    <Text style={styles.meetingTitle} numberOfLines={2}>
                        {meeting?.meet_venue ?? 'Not Mentioned'}
                    </Text>
                    <View style={styles.timeRow}>
                        <Icon name="clock" size={16} color="#888" />
                        <Text style={styles.timeText}>
                            {meeting?.attend_time ? convertTo12HourFormat(meeting?.attend_time) : "Not Attended"}
                        </Text>
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
        </View>
    );

    console.log(filteredMeetings,"filteredMeetings>>>>>>>>>")

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>My Meetings</Text>
            </View>
            <View style={styles.hr} />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Present' ? styles.activeTab : null]}
                    onPress={() => setActiveTab('Present')}
                >
                    <Text style={[styles.tabText, activeTab === 'Present' ? styles.activeTabText : null]}>
                        Present
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Absent' ? styles.activeTab : null]}
                    onPress={() => setActiveTab('Absent')}
                >
                    <Text style={[styles.tabText, activeTab === 'Absent' ? styles.activeTabText : null]}>
                        Absent
                    </Text>
                </TouchableOpacity>
            </View>
            {filteredMeetings.length !== 0 && (
                <Text style={[styles.sectionTitle, { paddingHorizontal: 24 }]}>
                    {activeTab} Meetings
                </Text>
            )}
            {loading ? (
                <Loader size='large' color={commonStyles.mainColor} />
            ) : (
                <FlatList
                    data={filteredMeetings}
                    keyExtractor={(item, index) => index?.toString()}
                    contentContainerStyle={styles.scrollContent}
                    renderItem={renderMeetingItem}
                    ListEmptyComponent={() => (
                        !loading && (
                            <Text style={[commonStyles.text1, { color: commonStyles.lightColor, marginTop: responsiveHeight(40) }]}>
                                No {activeTab.toLowerCase()} meetings available.
                            </Text>
                        )
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        // backgroundColor: '#f5f5f5',
        margin:16,gap:12
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        // borderBottomWidth: 2,
        // borderBottomColor: 'transparent',
        borderWidth:1,
        borderColor: '#ccc',
        borderRadius:8
    },
    activeTab: {
        borderBottomColor: commonStyles.mainColor || '#0A1F3C',
        borderColor:commonStyles.mainColor,
        backgroundColor:commonStyles.mainColor,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
    activeTabText: {
        // color: commonStyles.mainColor || '#0A1F3C',
        fontWeight: '600',
        color:'#fff'
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
        width: 50,
        height: 50,
        marginRight: 12,
        // resizeMode: 'contain',
        borderRadius:46
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
});