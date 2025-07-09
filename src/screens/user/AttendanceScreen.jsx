// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import commonStyles from '../../commonstyles/CommonStyles';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const AttendanceScreen = () => {
//     return (
//         <View style={{ flex: 1, backgroundColor: "#fff" }}>
//             {/* <Text>AttendanceScreen</Text> */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => { navigation.goBack() }}>
//                     <Icon name='arrow-left' size={24} color={'#0A1F3C'} />
//                 </TouchableOpacity>
//                 <Text style={styles.headerLabel}>Attendance</Text>
//             </View>
//             <View style={styles.hr} />
//             <View style={styles.container}>
//                 <View style={styles.meetingCard}>
//                     <Text style={styles.nextTitle}>Next Meeting</Text>
//                     <View style={styles.meetingRow}>
//                         <Icon name="calendar" size={18} />
//                         <Text style={styles.meetingText}>Coming Soon</Text>
//                     </View>
//                     <View style={styles.meetingRow}>
//                         <Icon name="clock" size={18} />
//                         <Text style={styles.meetingText}>7:30 AM</Text>
//                     </View>
//                     <View style={styles.meetingRow}>
//                         <Icon name="map-pin" size={18} />
//                         <Text style={styles.meetingText}>La Hospin Hotel</Text>
//                     </View>
//                     <TouchableOpacity style={styles.detailsButton}>
//                         <View style={{ flexDirection: 'row', gap: 12 }}>
//                             <Text style={styles.detailsText}>Go To Meeting</Text>
//                             <Ionicons name='arrow-forward' size={20} color="#fff" />
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default AttendanceScreen

// const styles = StyleSheet.create({
//     header: {
//         // flex:1,
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         padding: 16,
//         alignItems: 'center'
//     },
//     headerLabel: {
//         fontSize: 18,
//         fontWeight: "600",
//         color: "#0A1F3C",
//         flex: 1,
//         textAlign: 'center'
//     },
//     hr: {
//         height: 0.5,
//         backgroundColor: "#ccc",
//     },
//     container:{
//         flex:1,
//         backgroundColor:'#fff',
//         padding:16
//     },
//     meetingCard: { marginTop: 20, backgroundColor: '#fff', padding: 16, borderRadius: 10, borderWidth: 0.5, borderColor: commonStyles.mainColor },
//     nextTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
//     meetingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
//     meetingText: { marginLeft: 8, fontSize: 14 },
//     detailsButton: {
//         marginTop: 10,
//         backgroundColor: commonStyles.mainColor,
//         paddingVertical: 10,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     detailsText: { color: '#fff', fontWeight: 'bold' },
//     card2: {
//         borderWidth: 1,
//         borderColor: commonStyles.mainColor,
//         flex: 1, width: '45%',
//         height: 106, borderRadius: 8,
//         padding: 16,
//         justifyContent: 'space-between',
//         backgroundColor: '#fff'
//     },
//     card2Title: {
//         fontSize: 14,
//         color: '#000',
//         fontWeight: '500'
//     },
//     card2Value: {
//         fontSize: 20,
//         color: '#000',
//         fontWeight: '700'
//     },
// })




import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    PermissionsAndroid,
    Platform,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera } from 'react-native-image-picker';
import commonStyles from '../../commonstyles/CommonStyles';
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine';
import { useNavigation,useRoute } from '@react-navigation/native';

const AttendanceScreen = () => {
    const [selfie, setSelfie] = useState(null);
    const [checkInTime, setCheckInTime] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();
    const meetingData = route.params;

    console.log(meetingData,'Route')
    useEffect(()=>{
        // checkIfWithinRadius();
    },[]);


//     const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title: "Location Permission",
//                 message: "App needs access to your location for attendance check-in.",
//                 buttonNeutral: "Ask Me Later",
//                 buttonNegative: "Cancel",
//                 buttonPositive: "OK"
//             }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
// };

// const checkIfWithinRadius = async (targetLocation = { latitude: 0, longitude: 0 }, radiusInMeters = 100) => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//         Alert.alert('Location permission denied');
//         return;
//     }

//     Geolocation.getCurrentPosition(
//         (position) => {
//             const userLocation = {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//             };

//             console.log('User location:', userLocation);

//             const isWithinRadius = haversine(userLocation, targetLocation, { unit: 'meter' }) <= radiusInMeters;

//             if (isWithinRadius) {
//                 console.log('User is within the radius');
//             } else {
//                 console.log('User is outside the radius');
//             }
//         },
//         (error) => {
//             console.log('Location error:', error.message);
//             Alert.alert('Location Error', error.message);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
// };

const getCurrentLocation = async()=>{
    try {
    const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for navigation.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Deny',
            buttonPositive: 'Allow',
          }
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            checkIfWithinRadius()
        }
} catch (error) {
    console.log(error)
}

}


useEffect(()=>{
getCurrentLocation()
},[])


    const checkIfWithinRadius = (radiusInMeters = 100) => {
        Geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                console.log(userLocation,'locatio')
                const target ={
                     latitude: "17.701186286200087", 
                     longitude: "83.29349040985109",
                }

                const isWithinRadius = haversine(userLocation, target, { unit: 'meter' }) 
console.log(isWithinRadius,'RADIUS')
                if (isWithinRadius <=100) {
                    console.log('User is within the radius');
                } else {
                    console.log('User is outside the radius');
                }
            },
            (error) => {
                console.log('Location error:', error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const openCamera = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "App needs access to your camera",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Camera permission denied');
                    return;
                }
            }

            launchCamera(
                {
                    mediaType: 'photo',
                    cameraType: 'front',
                    includeBase64: false,
                    saveToPhotos: false
                },
                (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled camera');
                    } else if (response.errorCode) {
                        Alert.alert('Camera Error', response.errorMessage);
                    } else {
                        setSelfie(response.assets[0].uri);
                        setCheckInTime(new Date().toLocaleTimeString());
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Attendance</Text>
            </View>
            <View style={styles.hr} />

            <ScrollView contentContainerStyle={styles.container}>
                {/* First Card - Meeting Info */}
                <View style={styles.meetingCard}>
                    <Text style={styles.nextTitle}>Next Meeting</Text>
                    <View style={styles.meetingRow}>
                        <Icon name="calendar" size={18} />
                        <Text style={styles.meetingText}>Coming Soon</Text>
                    </View>
                    <View style={styles.meetingRow}>
                        <Icon name="clock" size={18} />
                        <Text style={styles.meetingText}>7:30 AM</Text>
                    </View>
                    <View style={styles.meetingRow}>
                        <Icon name="map-pin" size={18} />
                        <Text style={styles.meetingText}>La Hospin Hotel</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsButton} onPress={openCamera}>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <Text style={styles.detailsText}>Go To Meeting</Text>
                            <Ionicons name='arrow-forward' size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Second Card - After Selfie */}
                {selfie && (
                    <View style={[styles.meetingCard, { flexDirection: 'row', marginTop: 20 }]}>
                        <Image source={{ uri: selfie }} style={styles.selfieImage} />
                        <View style={{ flex: 1, paddingLeft: 16, gap: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.meetingText]}>Time :</Text>
                                <Text style={[styles.card2Title, { fontWeight: '700', fontSize: 16 }]}>{checkInTime}</Text>
                            </View>
                            {/* <Text style={styles.card2Title} numberOfLines={2}>Venue: La Hospin Hotel hgjg higgbiygi fwgcwrgvr 53t3g rfgrgvrv</Text> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={[styles.meetingText]}>Status:</Text>
                                <Text style={[styles.card2Title, { color: 'green', fontWeight: '700', fontSize: 16 }]}> Present</Text>
                            </View>
                        </View>
                    </View>
                    // <View>
                    //     <Image source={require('../../assets/AttendanceLogo.png')} style={{width:100,height:100}} />
                    // </View>
                )}
            </ScrollView>
            {
                selfie && (
                    <View style={{ margin: 16 }}>
                        <TouchableOpacity style={commonStyles.blueButton} onPress={() => navigation.goBack()}>
                            <Text style={commonStyles.blueButtonText}>Go To Home</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0A1F3C",
        flex: 1,
        textAlign: 'center',
        marginRight: 24 // to center correctly due to back icon
    },
    hr: {
        height: 0.5,
        backgroundColor: "#ccc",
    },
    container: {
        padding: 16
    },
    meetingCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: commonStyles.mainColor
    },
    nextTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    meetingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    meetingText: {
        marginLeft: 8,
        fontSize: 14
    },
    detailsButton: {
        marginTop: 10,
        backgroundColor: commonStyles.mainColor,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    detailsText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    selfieImage: {
        width: 85,
        height: 85,
        borderRadius: 8,
        resizeMode: 'cover'
    },
    card2Title: {
        fontSize: 14,
        color: '#000',
        // marginBottom: 6,
        fontWeight: '500'
    }
});
