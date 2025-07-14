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
import { isCurrentTimeInWindow } from '../../utils/isCurrentTimeInWindow';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../utils/api';
import { addAttendence } from '../../redux/reducers/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from '../../components/loader';

const AttendanceScreen = () => {
    const [selfie, setSelfie] = useState(null);
    const [isInRadius,setIsInRadius] = useState(false)
    const [checkInTime, setCheckInTime] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [userCurrentLocation, setUserCurrentLocation] = useState(null); // New state to store location
    const [locationLoading, setLocationLoading] = useState(true); // New state for location loading
    const [apiLoading, setApiLoading] = useState(false); // New state for API loading
 
    const navigation = useNavigation();
    const route = useRoute();
    const meetingData = route.params;
    const { userId } = useSelector(state => state.Auth);
    const dispatch = useDispatch();

    console.log(meetingData, 'Route')

    // Add these logs for debugging
    console.log('Render: locationLoading=', locationLoading, 'userCurrentLocation=', userCurrentLocation);

    useEffect(() => {
        const fetchLocationAndCheckRadius = async () => {
            const location = await getCurrentLocation();
            if (location) {
                // Now that location is available, we can run checkIfWithinRadius
                setIsInRadius(checkIfWithinRadius(100, location)); // Pass location directly
            }
        };
        fetchLocationAndCheckRadius();
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
        setLocationLoading(true); // Start loading
        try {
            let position = null; // Initialize position to null

            if (Platform.OS === 'android') {
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
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    try {
                        position = await new Promise((resolve, reject) => {
                            Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
                        });
                    } catch (posError) {
                        console.log('Geolocation.getCurrentPosition error (Android):', posError.message);
                        Alert.alert('Location Error', 'Could not get your current location for initial check. Please ensure location services are enabled.');
                    }
                } else {
                    Alert.alert('Location permission denied', 'Please grant location permission to use this feature.');
                }
            } else if (Platform.OS === 'ios') {
                const authorizationStatus = await Geolocation.requestAuthorization('whenInUse');
                if (authorizationStatus === 'granted') {
                    try {
                        position = await new Promise((resolve, reject) => {
                            Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
                        });
                    } catch (posError) {
                        console.log('Geolocation.getCurrentPosition error (iOS):', posError.message);
                        Alert.alert('Location Error', 'Could not get your current location for initial check. Please ensure location services are enabled and allowed for this app.');
                    }
                } else {
                    Alert.alert('Location permission denied', 'Please enable location services for this app in Settings.');
                }
            }

            if (position) {
                const { latitude, longitude } = position.coords;
                setUserCurrentLocation({ latitude, longitude });
                return { latitude, longitude };
            } else {
                // If position is null after all attempts (e.g., permission denied or location service off)
                setUserCurrentLocation(null);
                return null;
            }

        } catch (error) {
            console.log('Permission/overall error:', error);
            Alert.alert('Permission Error', 'An error occurred while requesting location or accessing services.');
            setUserCurrentLocation(null);
            return null;
        } finally {
            // Ensure loader is hidden regardless of outcome
            setLocationLoading(false);
        }
    };

    const checkIfWithinRadius = (radiusInMeters = 500, currentLocation) => {
        if (!currentLocation) {
            console.log("Cannot check radius: current location not available.");
            return false;
        }

        const target = {
            latitude: meetingData?.latitude || 0,
            longitude: meetingData?.longitude || 0,
        };
        const distance = haversine(currentLocation, target, { unit: 'meter' });

        console.log(distance, 'Distance in meters');

        return distance <= radiusInMeters; // Return boolean directly
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
            } else if (Platform.OS === 'ios') {
                // For iOS, react-native-image-picker's launchCamera usually triggers the permission prompt
                // as long as NSCameraUsageDescription is in Info.plist. 
                // No explicit request needed here if relying on the library's default behavior.
                // If you need more granular control or to check status beforehand, you would use 
                // a dedicated permissions library like react-native-permissions.
            }

            launchCamera(
                {
                    mediaType: 'photo',
                    cameraType: 'front',
                    includeBase64: true,
                    saveToPhotos: false
                },
                (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled camera');
                    } else if (response.errorCode) {
                        Alert.alert('Camera Error', response.errorMessage);
                    }
                    else {
                        const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
                        setSelfie(base64Image);
                        handleAttendanceCheck(base64Image);
                    }
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleAttendanceCheck = async (selfieUri) => {
        // Add this log for debugging
        console.log('handleAttendanceCheck: userCurrentLocation=', userCurrentLocation);

        if (!userCurrentLocation) {
            Alert.alert('Location Not Available', 'Please wait while we fetch your location, or enable location services.');
            return;
        }

        const userLocation = userCurrentLocation; // Use the pre-fetched location

        const isInTime = isCurrentTimeInWindow(meetingData);
        const target = {
            latitude: meetingData?.latitude || 0,
            longitude: meetingData?.longitude || 0,
        };
        const distance = haversine(userLocation, target, { unit: 'meter' });
        const radiusInMeters = 100; // Define your radius
        const isInRadius = distance <= radiusInMeters;

        console.log("Is in time:", isInTime);
        console.log("Is in radius:", isInRadius);

        if (isInTime && isInRadius) {
            const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
            const currentDate = new Date().toISOString().slice(0, 10);

            const payload = {
                attend_time: currentTime,
                attend_date: currentDate,
                attend_lat: userLocation.latitude.toString(),
                attend_lang: userLocation.longitude.toString(),
                rmb_user_id: userId,
                attend_meet_id: meetingData?.id,
                selfieimage: selfieUri,
            };
            console.log(payload, 'API Payload');

            try {
                setApiLoading(true); // Show loader for API call
                const resultAction = await dispatch(addAttendence(payload));
                const originalPromiseResult = unwrapResult(resultAction);
                console.log('Attendance API response:', originalPromiseResult);

                if (originalPromiseResult.status === 200) {
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
                    Alert.alert('Attendance Failed', originalPromiseResult.message || 'Something went wrong.');
                    setShowErrorModal(true);
                }
            } catch (error) {
                console.error('API Error:', error);
                Alert.alert('API Error', error.message || 'Failed to submit attendance.');
                setShowErrorModal(true);
            } finally {
                setApiLoading(false); // Hide loader after API call
            }
        } else if (!isInRadius) {
            Alert.alert('Outside Location', 'You are not within the meeting radius. Please reach the venue to mark attendance.');
            setShowErrorModal(true);
        } else if (!isInTime) {
            Alert.alert('Time Window Error', 'You are outside the designated time window for this meeting.');
            setShowErrorModal(true);
        }
    };

    const alreadyAttended = meetingData?.meeting_attend_status === 0;

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
                {meetingData && Object.keys(meetingData).length > 0 ? (
                    <View style={styles.meetingCard}>
                        <Text style={styles.nextTitle}>Next Meeting</Text>
                        <View style={styles.meetingRow}>
                            <Icon name="calendar" size={18} />
                            <Text style={styles.meetingText}>{meetingData?.meeting_date}</Text>
                        </View>
                        <View style={styles.meetingRow}>
                            <Icon name="clock" size={18} />
                            <Text style={styles.meetingText}>{meetingData?.meeting_time}</Text>
                        </View>
                        <View style={styles.meetingRow}>
                            <Icon name="map-pin" size={18} />
                            <Text style={styles.meetingText}>{meetingData?.meeting_venue}</Text>
                        </View>
                        {alreadyAttended ? (
                            <View style={[styles.detailsButton, { backgroundColor: '#ccc' }]}> 
                                <Text style={[styles.detailsText, { color: '#888' }]}>Already attended</Text>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.detailsButton} onPress={openCamera} disabled={locationLoading || !userCurrentLocation}>
                                <View style={{ flexDirection: 'row', gap: 12 }}>
                                    <Text style={styles.detailsText}>Go To Meeting</Text>
                                    <Ionicons name='arrow-forward' size={20} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <View style={styles.noMeetingCard}>
                        <Text style={styles.noMeetingText}>No Meeting Data Available</Text>
                        <Text style={styles.noMeetingSubText}>Please check back later or contact support.</Text>
                    </View>
                )}

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

            {/* Location Status Message (new) */}
            {!locationLoading && !userCurrentLocation && (
                <View style={styles.locationStatusContainer}>
                    <Text style={styles.locationStatusText}>
                        Unable to get your current location. Please ensure location services are enabled and permissions are granted.
                    </Text>
                    <TouchableOpacity onPress={getCurrentLocation} style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Retry Location</Text>
                    </TouchableOpacity>
                </View>
            )}

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

            {/* {
                selfie && (
                    <View style={{ margin: 16 }}>
                        <TouchableOpacity style={commonStyles.blueButton} onPress={() => navigation.goBack()}>
                            <Text style={commonStyles.blueButtonText}>Go To Home</Text>
                        </TouchableOpacity>
                    </View>
                )
            } */}
            {apiLoading || locationLoading ? (
                <View style={[StyleSheet.absoluteFillObject, styles.loaderContainer]}>
                    <Loader />
                </View>
            ) : null} 
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
    noMeetingCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
        marginTop: 20,
    },
    noMeetingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888',
        marginBottom: 8,
    },
    noMeetingSubText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent background
        zIndex: 1, // Ensure it's on top
    },
    locationStatusContainer: {
        padding: 16,
        backgroundColor: '#FFEBEE', // Light red background
        borderRadius: 8,
        margin: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EF5350', // Red border
    },
    locationStatusText: {
        color: '#D32F2F', // Darker red text
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
    },
    retryButton: {
        backgroundColor: commonStyles.mainColor,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
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


