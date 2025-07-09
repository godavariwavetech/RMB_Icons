import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';

const ReferralSlipScreen = () => {
    const rating = 5; // Change this to 1-5 dynamically as needed
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Feather name='arrow-left' size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Referral Slip</Text>
            </View>
            <View style={styles.hr} />
            <View style={{ flex: 1, padding: 16 }}>
                {/* Header */}
                <View style={styles.header2}>
                    <View>
                        <Text style={styles.headerText}>From: Srikanth Namana </Text>
                        <Text style={styles.headerText}>Date: 07/07/25</Text>
                    </View>
                    {/* <Icon name="visibility" size={24} color="#fff" /> */}
                </View>

                {/* Contact Status */}
                <View style={styles.statusContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <Text style={styles.statusDot}></Text>
                        <View>
                            <Text style={styles.statusText}>Not Contacted Yet</Text>
                            <Text style={styles.statusDate}>July 07 2025</Text>
                        </View>
                    </View>
                </View>

                {/* Recipient Info */}
                <Text style={{ color: '#7d7d7d' }}>To:</Text>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../../assets/profile.png')}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.nameText}>Rajiv Chand Kakara</Text>
                        <Text style={styles.groupText}>Believers</Text>
                    </View>
                </View>

                {/* Details */}
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Referral Type</Text>
                    <Text style={styles.value}>Outside</Text>

                    <Text style={styles.label}>Referral Status:</Text>
                    <Text style={styles.value}>Told Them You Would Call</Text>

                    <Text style={[styles.label, commonStyles.mb4]}>Contact Details:</Text>
                    <View style={{ backgroundColor: '#ddded8', padding: 8, borderRadius: 8, marginTop: 4 }}>
                        <Text style={styles.contactName}>Sai Kumar valves & cocks</Text>
                        <View style={styles.contactBox}>
                            <Feather name="phone-call" size={16} color="red" />
                            <Text style={styles.contactText}> 9848285750</Text>
                        </View>
                    </View>

                    <Text style={[styles.label, commonStyles.mt20]}>Comments:</Text>
                    <Text style={styles.value}>Looking for digital marketing</Text>
                </View>
            </View>

            {/* Hotness Rating */}
            {/* <View style={{ paddingHorizontal: 16 }}>
                <Text style={[styles.label, { marginTop: 'auto' }]}>How hot is this referral?</Text>
                <View style={styles.heatBar}>
                    <View style={[styles.heatBox, { backgroundColor: '#999' }]} />
                    <View style={[styles.heatBox, { backgroundColor: '#888' }]} />
                    <View style={[styles.heatBox, { backgroundColor: '#777' }]} />
                    <View style={[styles.heatBox, { backgroundColor: '#666' }]} />
                    <View style={[styles.heatBox, { backgroundColor: 'red' }]} />
                </View>
            </View> */}
                        {/* Hotness Rating */}
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={[styles.label, { marginTop: 'auto' }]}>How hot is this referral?</Text>
                <View style={styles.heatBar}>
                    {[1, 2, 3, 4, 5].map((val) => (
                        <View
                            key={val}
                            style={[
                                styles.heatBox,
                                {
                                    backgroundColor:
                                        rating === val ? commonStyles.mainColor : '#ccc',
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // padding: 16,
        flex: 1,
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
    header2: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 14,
    },
    statusContainer: {
        marginTop: 16,
        marginBottom: 8,
    },
    statusDot: {
        width: 10,
        height: 10,
        backgroundColor: '#c3c3c3',
        borderRadius: 5,
        // marginBottom: 4,
    },
    statusText: {
        fontWeight: '600',
        fontSize: 16,
    },
    statusDate: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 16,
        marginTop: 8
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 24,
        marginRight: 12,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    groupText: {
        fontSize: 14,
        color: '#666',
    },
    detailsBox: {
        // backgroundColor: '#f7f7f7',
        borderRadius: 8,
        // padding: 12,
        marginVertical: 8,
    },
    label: {
        color: '#666',
        fontSize: 14,
        marginTop: 8,
        fontWeight: '500'
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8
    },
    contactBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    contactText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '600',
    },
    contactName: {
        fontSize: 18,
        color: '#333',
        marginLeft: 4,
        marginTop: 4,
        fontWeight: '600'
    },
    heatBar: {
        flexDirection: 'row',
        marginTop: 8,
    },
    heatBox: {
        width: 30,
        height: 30,
        marginRight: 8,
        borderRadius: 4,
    },
});

export default ReferralSlipScreen;
