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
import { useNavigation, useRoute } from '@react-navigation/native';

const AttendanceScreen = () => {
    const [selfie, setSelfie] = useState(null);
    const [checkInTime, setCheckInTime] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [countdown, setCountdown] = useState(10);
 



    const navigation = useNavigation();
    const route = useRoute();
    const meetingData = route.params;

    console.log(meetingData, 'Route')
    useEffect(() => {
        // checkIfWithinRadius();
    }, []);


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

    const getCurrentLocation = async () => {
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


    useEffect(() => {
        getCurrentLocation()
    }, [])


    const checkIfWithinRadius = (radiusInMeters = 100) => {
        Geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                console.log(userLocation, 'locatio')
                const target = {
                    // latitude: "17.701186286200087",
                    // longitude: "83.29349040985109",
                    // latitude: meetingData?.latitude || 0,
                    // longitude: meetingData?.longitude || 0,
                    latitude:16.9979775,
                    longitude:81.79793
                }
                const distance = haversine(userLocation, target, { unit: 'meter' })

                console.log(distance, 'Distance in meters');

                if (distance <= radiusInMeters) {
                    setShowSuccessModal(true);
                    let interval = setInterval(() => {
                        setCountdown(prev => {
                            if (prev === 1) {
                                clearInterval(interval);
                                setShowSuccessModal(false);
                                navigation.navigate('ProfileCard');
                            }
                            return prev - 1;
                        });
                    }, 1000);
                } else {
                    setShowErrorModal(true);
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
                {/* {selfie && (
                    <View style={[styles.meetingCard, { flexDirection: 'row', marginTop: 20 }]}>
                        <Image source={{ uri: selfie }} style={styles.selfieImage} />
                        <View style={{ flex: 1, paddingLeft: 16, gap: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.meetingText]}>Time :</Text>
                                <Text style={[styles.card2Title, { fontWeight: '700', fontSize: 16 }]}>{checkInTime}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={[styles.meetingText]}>Status:</Text>
                                <Text style={[styles.card2Title, { color: 'green', fontWeight: '700', fontSize: 16 }]}> Present</Text>
                            </View>
                        </View>
                    </View>
                )} */}
            </ScrollView>

            {showSuccessModal && (
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modal}>
                        {/* <Text style={modalStyles.title}>Attendance marked successfully</Text> */}
                         <View style={modalStyles.headerRow}>
                <Text style={modalStyles.title}>Attendance marked successfully</Text>
                <TouchableOpacity onPress={() => setShowSuccessModal(false)}>
                    <Ionicons name="close-circle" size={24} color="#f44336" />
                </TouchableOpacity>
            </View>
                        <Image source={require('../../assets/AttendanceLogo.png')} style={{ width: 270, height: 150,resizeMode:"contain" }} />
                        <Text style={modalStyles.text}>You're all set for today.</Text>
                        <TouchableOpacity style={modalStyles.button}>
                            <Text style={modalStyles.buttonText}>Home in (00:0{countdown})</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {showErrorModal && (
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modal}>
                        <Text style={modalStyles.title}>Outside Location</Text>
                        <Text style={modalStyles.text}>You are not within the meeting radius. Please reach the venue to mark attendance.</Text>
                        <TouchableOpacity
                            style={[modalStyles.button, { backgroundColor: '#f44336' }]}
                            onPress={() => setShowErrorModal(false)}
                        >
                            <Text style={modalStyles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

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
    },
});

const modalStyles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        width: '85%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 8
    },
    button: {
        marginTop: 16,
        backgroundColor: commonStyles.mainColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
},

});

