import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const notifications = [
    { id: '1', name: 'Srikanth Namana', text: 'Sent you a referral', time: '2025-07-07T07:45:00Z', unread: true },
    { id: '2', name: 'Swamy Gedela', text: 'Recorded a One-to-One with you', time: '2025-07-07T07:45:00Z', unread: false },
    { id: '3', name: 'Pradeep Chowdary Chilukuri', text: 'Recently joined your chapter', time: '2025-07-07T07:45:00Z', unread: false },
    { id: '4', name: 'Raja Chopra', text: 'Recently joined your chapter', time: '2025-06-07T07:45:00Z', unread: false },
    { id: '5', name: 'Lakshmi Prasanna Mukku', text: 'Recently joined your chapter', time: '2025-07-07T07:45:00Z', unread: false },
    { id: '6', name: 'Ramseynold Katuri', text: 'Sent you a referral', time: '2025-07-06T07:45:00Z', unread: false },
    { id: '7', name: 'Jaya Bharathi Ayyala', text: 'Sent you a referral', time: '2025-07-07T07:45:00Z', unread: false },
    { id: '8', name: 'Krishna Soujanya S', text: 'Sent you a referral', time: '2025-07-07T07:45:00Z', unread: false },
    { id: '9', name: 'Krishna Soujanya S', text: 'Referral status has been updated', time: '2025-07-07T07:45:00Z', unread: false },
    { id: '10', name: 'Murali krishnam Raju Gunturi', text: 'Sent you a referral', time: '2025-07-07T07:00:00Z', unread: false },
    { id: '11', name: 'Parasa Karun Kumar', text: 'Sent you a referral', time: '2025-07-07T06:45:00Z', unread: false },
    { id: '12', name: 'Srikanth Namana', text: 'Sent you a referral', time: '2025-07-07T06:45:00Z', unread: false },
    { id: '13', name: 'Yashwanth Surya Narayana Vudathaaaaa aaaa', text: 'Sent you a referral', time: '2025-04-07T07:45:00Z', unread: false },
    { id: '14', name: 'Kiran Babu Badugu', text: 'Recorded a One-to-One with you', time: '2025-07-05T07:45:00Z', unread: false },
];

const NotificationItem = ({ item }) => {
    const navigation = useNavigation();

    // const getTimeAgo = (dateString) => {
    //     const now = new Date();
    //     const date = new Date(dateString);
    //     const diffInSeconds = Math.floor((now - date) / 1000);

    //     const minute = 60;
    //     const hour = 60 * minute;
    //     const day = 24 * hour;

    //     if (diffInSeconds < minute) {
    //         return `${diffInSeconds}s ago`;
    //     } else if (diffInSeconds < hour) {
    //         const mins = Math.floor(diffInSeconds / minute);
    //         return `${mins}m ago`;
    //     } else if (diffInSeconds < day) {
    //         const hrs = Math.floor(diffInSeconds / hour);
    //         return `${hrs}h ago`;
    //     } else {
    //         const days = Math.floor(diffInSeconds / day);
    //         return `${days}d ago`;
    //     }
    // };
    const getTimeAgo = (dateString) => {
        const now = new Date();
        const notificationTime = new Date(dateString);
        const diffInSeconds = Math.floor((now - notificationTime) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const months = Math.floor(days / 30);

        // if (minutes < 60) {
        //     return `${minutes} mins ago`;
        // } else if (hours < 24) {
        //     return `${hours} hours ago`;
        // } else {
        //     return `${days} days ago`;
        // }
        if (minutes < 60) {
            return `${minutes} mins ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days < 30) {
            return `${days} days ago`;
        } else {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ReferralSlipScreen')}>
            {/* <View style={styles.row}>
                {item.unread && <View style={styles.dot} />}
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={[styles.message, item.unread && { color: 'red', fontWeight: 'bold' }]}>
                {item.text}
            </Text>
            <Text style={styles.time}>{getTimeAgo(item.time)}</Text>
            <View style={styles.separator} /> */}
            <View style={styles.topRow}>
                <View style={styles.row}>
                    {item.unread && <View style={styles.dot} />}
                    <Text style={[styles.name]} numberOfLines={1}>{item.name}</Text>
                </View>
                <Text style={[styles.time, { alignSelf: 'flex-end' }]}>{getTimeAgo(item.time)}</Text>
            </View>
            <Text style={[styles.message, item.unread && { color: 'red', fontWeight: 'bold' }]}>
                {item.text}
            </Text>
            <View style={styles.separator} />

        </TouchableOpacity>
    )
};

const NotificationsScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Feather name='arrow-left' size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Notifications</Text>
            </View>
            <View style={styles.hr} />
            <FlatList
                data={notifications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <NotificationItem item={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: 10,
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
    item: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // 👈 allow it to shrink/grow properly
        // marginRight: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        marginRight: 6,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333', 
        flexShrink: 1
    },
    message: {
        fontSize: 14,
        marginTop: 2,
        color: '#555',
    },
    time: {
        fontSize: 12,
        color: '#999',
        // marginTop: 2,
        // marginLeft: 8,
        flexShrink: 0,
        maxWidth: 80,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginTop: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flex:1
    },

});
