import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';

const meetings = [
    {
        id: 1,
        title: 'Shelton Hotel',
        time: '11:00 AM to 11:45 AM',
        date: 'June 15, 2025',
        notes: [
            'Decided on color theme change',
            'Next version UI to be ready by June 20',
        ],
    },
    // Repeat same for demo purpose
    {
        id: 2,
        title: 'La Hospin Hotel',
        time: '10:00 AM to 10:45 AM',
        date: 'June 22, 2025',
        notes: [
            'Decided on color theme change',
            'Next version UI to be ready by June 20',
        ],
    },
    {
        id: 3,
        title: 'Shelton Hotel',
        time: '10:00 AM to 10:30 AM',
        date: 'July 1, 2025',
        notes: [
            'Decided on color theme change.Next version UI to be ready by June 20,Decided on color theme change'
        ],
    },
];

const MyMeetings = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icon name='arrow-left' size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Member Profile</Text>
            </View>
            <View style={styles.hr} />

            {/* Past Meetings */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Past Meetings</Text>
                {meetings.map((meeting) => (
                    <View key={meeting.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Image
                                source={require('../../assets/meetingLogo.png')}
                                style={styles.icon}
                            />
                            <View>
                                <Text style={styles.meetingTitle} numberOfLines={2}>{meeting.title}</Text>
                                <View style={styles.timeRow}>
                                    <Icon name="clock" size={16} color="#888" />
                                    <Text style={styles.timeText}>{meeting.time}</Text>
                                    <MaterialIcons name="calendar-today" size={16} color="#888" style={{ marginLeft: 10 }} />
                                    <Text style={styles.timeText}>{meeting.date}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Notes */}
                        {/* <View style={styles.notesContainer}>
                            <Text style={styles.notesTitle}>Meeting Notes:</Text>
                            {meeting.notes.map((note, index) => (
                                <Text key={index} style={styles.noteText} numberOfLines={3}>
                                    {note}
                                </Text>
                            ))}
                        </View> */}


                        <View style={styles.notesContainer}>
  <Text style={styles.notesTitle}>Meeting Notes:</Text>
  <ScrollView style={styles.notesScroll} nestedScrollEnabled={true}>
    {meeting.notes.map((note, index) => (
      <Text key={index} style={styles.noteText}>
        {`\u2022 ${note}`}
      </Text>
    ))}
  </ScrollView>
</View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default MyMeetings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: 50,
    },
    header: {
        // flex:1,
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
        borderColor: '#d0d7e2', flex: 1
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 10,alignItems: 'flex-start',
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
        flex:1,
        flexShrink:1,
        // width: '80%',
        // paadingRight:8,
        maxWidth:'90%'
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
        // paddingLeft: 4,
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
  maxHeight: 72, // You can increase/decrease as needed
},
});
