import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import commonStyles from '../../commonstyles/CommonStyles';
import DistanceBar from '../../screens/user/svgs/DistanceBar';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const RideCard = ({ item }) => {
    const navigation = useNavigation();
    console.log(item, 'itemRide');
    const textColor = `${item.status == 'missed' ? '#CE9D00' : item.status == 'cancelled' ? '#DF1313' : item.status == 'completed' && '#178C59'}`;
    return (
        // <TouchableOpacity
        //     onPress={()=>navigation.navigate('RideHistoryDetailsScreen')}
        //     style={[styles.card, { backgroundColor: `${item.status == 'missed' ? '#FFF3DD' : item.status == 'cancelled' ? '#FFEBEB' : item.status == 'completed' && '#EFFFF2'}` }]}
        // >
        //     <View style={{ flexDirection: 'row' }}>
        //         <Text style={[styles.rideId, { fontWeight: '400' }]}>Ride ID :</Text>
        //         <Text style={styles.rideId}>{item.id}</Text>
        //     </View>
        //     <View style={styles.hr2} />
        //     <View style={styles.rideDetails}>
        //         <View>
        //             <DistanceBar />
        //         </View>

        //         <View style={styles.locationTextContainer}>
        //             <View style={{ flexDirection: 'row' }}>
        //                 <Text style={[styles.locationText]} numberOfLines={2}>
        //                     {item.startLocation}
        //                 </Text>
        //                 <Text style={[styles.rideId, { fontWeight: '400' }]}>{item.startTime}</Text>
        //             </View>
        //             <View style={{ flexDirection: 'row' }} numberOfLines={2}>
        //                 <Text style={styles.locationText}>
        //                     {item.endLocation}
        //                 </Text>
        //                 <Text style={[styles.missedLabel, { color: textColor }]}>{item.status == 'cancelled' ? `Cancelled by ${item.cancelledBy}` : item.status}</Text>
        //             </View>
        //         </View>

        //     </View>
        //     {/* <View style={{ flexDirection: 'column' }}>
        //         <Text style={styles.time}>10:28 PM</Text>
        //         <Text style={styles.missedLabel}>Missed Rides</Text>

        //     </View> */}
        // </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RideHistoryDetailsScreen')} style={styles.card}>
            <LinearGradient
                colors={
                    item.status === 'missed'
                        ? ['#FFF3DD', '#FFF']
                        : item.status === 'cancelled'
                            ? ['#FFEBEB', '#FFF']
                            : item.status === 'completed'
                                ? ['#EFFFF2', '#FFF']
                                : ['#FFF', '#FFF']
                }
                start={{ x: 0, y: 0 }}    // start from left
                end={{ x: 1, y: 0 }}
                style={styles.gradientBackground}
            >
                {/* Your ride card content goes here */}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.rideId, { fontWeight: '400' }]}>Ride ID :</Text>
                    <Text style={styles.rideId}>{item.id}</Text>
                </View>
                <View style={styles.hr2} />
                <View style={styles.rideDetails}>
                    <View>
                        <DistanceBar />
                    </View>
                    <View style={styles.locationTextContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.locationText]} numberOfLines={2}>
                                {item.startLocation}
                            </Text>
                            <Text style={[styles.rideId, { fontWeight: '400' }]}>{item.startTime}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.locationText}>{item.endLocation}</Text>
                            <Text style={[styles.missedLabel, { color: textColor }]}>
                                {item.status === 'cancelled' ? `Cancelled by ${item.cancelledBy}` : item.status}
                            </Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card: {
        // backgroundColor: '#FFF3DD',
        borderRadius: 10,
        // padding: 15,
        margin: 10,
        borderWidth: 0.5,
        borderColor: commonStyles.mainColor,
    },
    gradientBackground: {
        borderRadius: 10,
        padding: 15,
    },

    rideId: {
        fontSize: 12,
        color: '#7A7A7A',
        marginBottom: 10,
        fontWeight: '700'
    },
    hr: {
        borderWidth: 0.3,
        borderColor: '#B8B8B8',
        marginBottom: 12,
    },
    hr2: {
        height: 0.5,
        backgroundColor: '#B8B8B8',
        marginBottom: 12,
    },
    rideDetails: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4
    },
    locationContainer: {
        flexDirection: 'row',
        // flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    startIcon: {
        backgroundColor: '#00FF00',
    },
    endIcon: {
        backgroundColor: '#FF0000',
    },
    line: {
        width: 2,
        height: 20,
        backgroundColor: '#000',
    },
    locationTextContainer: {
        flex: 1,
    },
    locationText: {
        fontSize: 14,
        color: '#3D3D3D',
        marginBottom: 5,
        flex: 1,
        fontWeight: '500'
    },
    time: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    missedLabel: {
        fontSize: 14,
        // color: '#CE9D00',
        // textAlign: 'right',
        // marginTop: 10,
        fontWeight: '600',
        alignSelf: 'flex-end'
    },
});

export default RideCard;