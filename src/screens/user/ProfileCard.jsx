import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ImageBackground, PanResponder, Animated, Dimensions, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import commonStyles from '../../commonstyles/CommonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import { pushFcmToken } from '../../redux/reducers/auth';



const ProfileCard = () => {
    const { userId } = useSelector(state => state.Auth);
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userCategory, setUserCategorey] = useState('');
    const [userDob, setUserDob] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [attendancePercentage, setAttendancePercentage] = useState(null);
    const [designation, setDesignation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();
    const [meetingData, setMeetingData] = useState({});
    const [meetingLength,setMeetinglength] = useState([]);
    const [draggableMenuVisible, setDraggableMenuVisible] = useState(false);
    const [homePageCounts,setHomePageCounts] = useState({});
    const [attendanceData, setAttendanceData] = useState({});
    // const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    // const ICON_SIZE = 56; // Total icon size with padding
    //     const pan = useRef(new Animated.ValueXY({ x: 300, y: 100 })).current; // default position

     const onRefresh = useCallback(() => {
        setRefreshing(true);
        FetchedData();
         getMeetings();
        getHomePageCounts();
        getAttendancePercentage()
        setRefreshing(false);
    }, []);

    //     const panResponder = useRef(
    //     PanResponder.create({
    //       onStartShouldSetPanResponder: () => true,
    //       onPanResponderMove: (e, gesture) => {
    //         let newX = pan.x._offset + gesture.dx;
    //         let newY = pan.y._offset + gesture.dy;

    //         // Clamp within screen
    //         newX = Math.max(0, Math.min(newX, SCREEN_WIDTH - ICON_SIZE));
    //         newY = Math.max(0, Math.min(newY, SCREEN_HEIGHT - ICON_SIZE - 40)); // 40 offset for bottom navbar/status

    //         pan.setValue({ x: newX - pan.x._offset, y: newY - pan.y._offset });
    //       },
    //       onPanResponderRelease: () => {
    //         pan.flattenOffset();
    //         pan.extractOffset();
    //       },
    //       onPanResponderGrant: () => {
    //         pan.setOffset({
    //           x: pan.x._value,
    //           y: pan.y._value,
    //         });
    //         pan.setValue({ x: 0, y: 0 });
    //       },
    //     })
    //   ).current;

    // Remove getDraggableMenuStyle
    // const getDraggableMenuStyle = () => ({
    //     position: 'absolute',
    //     // backgroundColor: 'white',
    //     width: 68,
    //     height: 68,
    //     borderRadius: 16,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     // elevation: 7,
    //     zIndex: 100,
    //     right: 200,
    //     bottom: 40
    //     // + (insets.bottom > 0 ? insets.bottom : 0), // Account for safe area
    // });
    //   const panResponder = useRef(
    //     PanResponder.create({
    //       onMoveShouldSetPanResponder: () => true,
    //       onPanResponderGrant: () => {
    //         console.log('PanResponder Grant:', pan.x._value, pan.y._value);
    //         pan.setOffset({ x: pan.x._value, y: pan.y._value });
    //         pan.setValue({ x: 0, y: 0 });
    //       },
    //       onPanResponderMove: Animated.event([
    //         null,
    //         { dx: pan.x, dy: pan.y }
    //       ], { useNativeDriver: false }),
    //       onPanResponderRelease: () => {
    //         console.log('PanResponder Release:', pan.x._value, pan.y._value);
    //         pan.flattenOffset();
    //       }
    //     })
    //   ).current;

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const ICON_SIZE = 68; // Based on the desired size of the bell icon
    const HORIZONTAL_PADDING = 10; // From styles.container
    const BOTTOM_OFFSET = responsiveHeight(60); // Desired offset from the bottom
    const RIGHT_OFFSET = 20; // Desired offset from the right

    // Calculate initial position for bottom-right relative to the container's content area
    const initialX = (SCREEN_WIDTH - HORIZONTAL_PADDING) - RIGHT_OFFSET - ICON_SIZE;
    const initialY = SCREEN_HEIGHT - ICON_SIZE - BOTTOM_OFFSET;

    const pan = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gestureState) => {
                pan.setOffset({ x: pan.x._value, y: pan.y._value });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: (e, gestureState) => {
                // Calculate the potential new absolute position
                const newAbsoluteX = pan.x._offset + gestureState.dx;
                const newAbsoluteY = pan.y._offset + gestureState.dy;

                // Clamp the absolute position
                const clampedAbsoluteX = Math.min(Math.max(newAbsoluteX, HORIZONTAL_PADDING), (SCREEN_WIDTH - HORIZONTAL_PADDING) - ICON_SIZE);
                const clampedAbsoluteY = Math.min(Math.max(newAbsoluteY, 0), SCREEN_HEIGHT - ICON_SIZE);

                // Set the value (relative to offset) so that offset + value = clampedAbsoluteX/Y
                pan.setValue({
                    x: clampedAbsoluteX - pan.x._offset,
                    y: clampedAbsoluteY - pan.y._offset,
                });
            },
            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    console.log(userId, '>>>>>>>>>>>>>>>>>')
    useEffect(()=>{
        dispatch(pushFcmToken())
    },[]);
    useFocusEffect(useCallback(() => {
        FetchedData();
        getMeetings();
        getHomePageCounts();
        getAttendancePercentage()
    }, []));


    const getAttendancePercentage = async()=>{
        try {
            const resp = await api.post('attendancepersentage',{"rmb_user_id":userId});
            const data = await resp.data.data;
            setAttendanceData(data);
            console.log(data[0]?.attendance_percentage, 'Attendance Percentage');
            setAttendancePercentage(data[0]?.attendance_percentage);
            console.log(data, 'Attendance Percentage Data');
        } catch (error) {
            console.log('Error fetching attendance percentage:', error);
            Alert.alert('Error', 'Failed to fetch attendance percentage');
        }
    }


    const FetchedData = async () => {
        try {
            setLoading(true);
            const resp = await api.post('getrnb_customer', { "rnb_customer_id": userId });
            console.log(resp.data.data[0], 'resssssssssssss');
            const data = await resp.data.data[0];
            console.log(data, 'data')
            if (resp.data.status === 200) {
                setUserName(data?.rnb_customer_name);
                setUserImage(data?.rnb_customer_photo);
                setUserCategorey(data?.business_category);
                setUserDob(data?.rnb_customer_dob)
                setUserPhone(data?.rnb_customer_phone_number);
                setDesignation(data?.designation);
                setCompanyName(data?.company_name)
            }

        } catch (error) {
            console.log('Error', error);
            Alert.alert(error, 'Error')
        } finally {
            setLoading(false)
        }
    }

    const getHomePageCounts = async () => {
        try {
            setLoading(true);
            const resp = await api.post('gethomepagecounts', { "rmb_user_id": userId });
            console.log(resp.data, 'Home Page Counts');
            if (resp.data.status === 200) {
                setHomePageCounts(resp.data.data[0]);
            }
        } catch (error) {
            console.log('Error', error);
            Alert.alert('Error', 'Failed to fetch home page counts');
        } finally {
            setLoading(false);
        }
    }

    const getMeetings = async () => {
        try {
            setLoading(true);
            const resp = await api.post('getnewmeetings',{
                "rmb_user_id": userId
            });
            console.log(resp.data,'meet')
            setMeetinglength(resp.data)
            const data = await resp.data.data[0];
            console.log(data, 'Meeting Data')
            if (resp.data.status == 200) {
                setMeetingData(resp.data.data)
            }
        } catch (error) {
            console.log('Error', error)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <ProfileCardSkeleton />
        )
    }

    const getSliderColor = (percentage) => {
        if (percentage <= 25) return '#FF4C4C'; // Red
        if (percentage <= 50) return '#FFA500'; // Orange
        if (percentage <= 75) return '#FFD700'; // Yellow
        return '#4CAF50'; // Green
    };


const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options);
};

const convertTo12HourFormat = (time24) => {
  const [hour, minute] = time24?.split(':');
  const date = new Date();
  date.setHours(parseInt(hour));
  date.setMinutes(parseInt(minute));

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
function convertTo12Hour(time24) {
  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Converts 0 to 12
  return `${hour}:${minute} ${ampm}`;
}

console.log(attendanceData,"++++++++++++++++++++>>>>>>>>>>>>meetingLength?.data[0]")


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[commonStyles.mainColor]}
                />
            }
            >
                {/* Top Icons */}
                <View style={styles.topIcons}>
                    <View style={styles.iconBlock}>
                        <Image source={{ uri: "https://rnbicon.com/upload_images/other/ellipse2.png" }} style={styles.userIcon} />
                        <Text style={styles.iconLabel}>Icons Chapter{"\n"}President</Text>
                    </View>
                    <Image source={require('../../assets/rmbProfileLogo.png')} style={styles.rmbLogo} />
                    <View style={styles.iconBlock}>
                        <Image source={{ uri: "https://rnbicon.com/upload_images/other/ellipse1.png" }} style={styles.userIcon} />
                        <Text style={styles.iconLabel}>RMB Chapter{"\n"}President</Text>
                    </View>
                </View>

                {/* Profile Card */}
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MemberProfile')}>
                    <View style={styles.profileRow}>
                        <Image source={userImage ? { uri: userImage } : require('../../assets/personPlaceholder.jpg')} style={styles.profileImage} />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.name}>{userName ? userName : 'N/A'}</Text>
                                <Ionicons name='arrow-forward-circle-sharp' size={26} color={commonStyles.mainColor} />
                            </View>
                            <Text style={styles.role}>{designation}</Text>
                            <Text style={styles.industry}>{userCategory ? userCategory : 'N/A'}</Text>
                            <Text style={styles.chapter}>{userPhone ? userPhone : 'N/A'}</Text>
                            {/* <Text style={styles.rating}>Good</Text> */}
                        </View>
                    </View>
                    {/* <View style={styles.sliderContainer}>
                            <View style={styles.sliderTrack}>
                                <View style={[styles.sliderFill, { width: `${attendancePercentage}%` }]} />
                            </View>
                            <View style={styles.sliderLabels}>
                                <Text style={styles.sliderLabel}>Very Bad</Text>
                                <Text style={styles.sliderLabel}>Bad</Text>
                                <Text style={styles.sliderLabel}>Average</Text>
                                <Text style={styles.sliderLabel}>Good</Text>
                            </View>
                        </View> */}

                        {
                            attendanceData.length !==0  && (
                    <View style={styles.sliderContainer}>
                        <View style={styles.sliderTrack}>
                            <View
                                style={[
                                    styles.sliderFill,
                                    {
                                        width: `${attendancePercentage}%`,
                                        backgroundColor: getSliderColor(attendancePercentage),
                                    },
                                ]}
                            />
                        </View>
                        <Text style={{marginTop:8,fontSize:16}}>{attendancePercentage?.toFixed(0)}%</Text>
                        {/* <View style={styles.sliderLabels}>
                            <Text style={styles.sliderLabel}>Very Bad</Text>
                            <Text style={styles.sliderLabel}>Bad</Text>
                            <Text style={styles.sliderLabel}>Average</Text>
                            <Text style={styles.sliderLabel}>Good</Text>
                        </View> */}
                        <Text style={[styles.ratingLabel, { color: getSliderColor(attendancePercentage) }]}>
                            {attendancePercentage <= 25
                                ? 'Very Bad'
                                : attendancePercentage <= 50
                                    ? 'Bad'
                                    : attendancePercentage <= 75
                                        ? 'Average'
                                        : 'Good'}
                        </Text>
                    </View>     
                            )
                        }

                </TouchableOpacity>

                {/* <ImageBackground source={require('../../assets/rmbbgLogo.png')} style={{flex:1}}
            resizeMode='contain'
            imageStyle={{width:'250',height:200,alignItems:'center',flex:1}}
            > */}
                <View style={{ gap: 16, marginTop: 24, }}>

                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity style={styles.card2} onPress={() => navigation.navigate('LeadsGivenScreen')}>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <MaterialIcons name="people-alt" size={24} color={commonStyles.mainColor} />
                                <Text style={styles.card2Title}>Leads Given</Text>
                            </View>
                            <Text style={[styles.card2Value, { marginTop: 8 }]}>{homePageCounts?.leads_given ?? 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card2, { flex: 1 }]} onPress={() => navigation.navigate('ThankYouNoteScreen')}>
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <FontAwesome6 name="coins" size={22} color={commonStyles.mainColor} />
                                <Text style={styles.card2Title}>Thankyou Note</Text>
                            </View>
                            <Text style={[styles.card2Value, { marginTop: 8 }]}>&#8377; {homePageCounts?.thankyounote_count ?? 0}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity style={styles.card2} onPress={() => navigation.navigate('MeetingScreen')}>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <FontAwesome6 name="handshake-simple" size={24} color={commonStyles.mainColor} />
                                <Text style={styles.card2Title}>1:1 Meets</Text>
                            </View>
                            <Text style={[styles.card2Value, { marginTop: 8 }]}>{homePageCounts?.one_to_one_meeting_count ?? 0}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card2} onPress={() => navigation.navigate('MyMeetings')}>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <FontAwesome6 name="calendar-check" size={22} color={commonStyles.mainColor} />
                                <Text style={styles.card2Title}>Attendance</Text>
                            </View>
                            <Text style={[styles.card2Value, { marginTop: 8}]}>{ attendanceData? attendanceData[0]?.attended_meetings : 0}</Text>
                            {/* <Text style={{fontSize:12,color:'#3d3d3d'}}>Given/Received</Text> */}
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </ImageBackground> */}


                {/* Next Meeting */}
                {
                    meetingLength?.data?.length !==0 ? (
                <View style={styles.meetingCard}>
                    <Text style={styles.nextTitle}>Next Meeting</Text>
                    <View style={styles.meetingRow}>
                        <Icon name="calendar" size={18} />
                        <Text style={styles.meetingText}>{formatDate( meetingLength?.data&&meetingLength?.data[0]?.meeting_date)}</Text>
                    </View>
                    <View style={styles.meetingRow}>
                        <Icon name="clock" size={18} />
                        <Text style={styles.meetingText}>{meetingLength?.data&& meetingLength?.data[0]?.meeting_time ? convertTo12Hour(meetingLength?.data && meetingLength?.data[0]?.meeting_time) : 'N/A'}</Text>
                    </View>
                    <View style={styles.meetingRow}>
                        <Icon name="map-pin" size={18} />
                        <Text style={styles.meetingText}>{meetingLength?.data ? meetingLength?.data[0]?.meeting_venue : 'N/A'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('AttendanceScreen',meetingLength.data[0])} style={styles.detailsButton}>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <Text style={styles.detailsText}>Meeting</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    ) : (
                        <View style={{alignItems:"center",justifyContent:"center",marginTop:50}}>
                        <Text style={{fontSize:14,fontWeight:"700",color:"#000"}}>No Meeting Scheduled Yet</Text>
                        </View>
                    )
                }
                {/* <Ionicons name='arrow-forward' size={20} color="#fff" /> */}
            </ScrollView>
            {/* <TouchableOpacity onPress={() => console.log('Notification')} style={styles.floatingBell}>
                <Image source={require('../../assets/bellIcon.png')} style={{ width: '50', height: '50' }} />
            </TouchableOpacity> */}

            {/* <Animated.View
                style={[
                    styles.floatingBell,
                    {
                        transform: pan.getTranslateTransform()
                    },
                ]}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity onPress={() => console.log("Bell Pressed")}>
                    <Ionicons name="notifications" size={24} color="#fff" />
                </TouchableOpacity>
            </Animated.View> */}

            {/* <TouchableOpacity onPress={() => console.log('Bell Pressed')} style={styles.floatingBell}>
               <Animated.View  style={[ 
          {
            transform: pan.getTranslateTransform(),
          },
        ]}
        {...panResponder.panHandlers}
      >
          <Image source={require('../../assets/bellIcon.png')} style={{ width: '60', height: '60' }} />
      </Animated.View>
        </TouchableOpacity> */}


            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.floatingBell, pan.getLayout()]}
            >
                <TouchableOpacity
                    style={styles.menuButton}
                    //   onPress={() => setDraggableMenuVisible(!draggableMenuVisible)}
                    onPress={() => navigation.navigate('NotificationsScreen')}
                >
                    {/* <Text style={styles.menuText}>Menu</Text> */}
                    <Image source={require('../../assets/bellIcon.png')} style={{ width: '50', height: '50' }} />
                    {/* <FontAwesome6 name="book-bookmark" color={commonStyles.btnColor} size={30} /> */}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, position: 'relative' },
    topIcons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    iconBlock: { alignItems: 'center', width: 90 },
    userIcon: { width: 56, height: 56, borderRadius: 30 },
    iconLabel: { fontSize: 12, textAlign: 'center', marginTop: 4 },
    rmbLogo: { width: 85, height: 100, resizeMode: 'contain' },

    card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginTop: 20, borderWidth: 1, borderColor: commonStyles.mainColor, },
    profileRow: { flexDirection: 'row', alignItems: 'center' },
    profileImage: { width: 72, height: 72, borderRadius: 40, marginRight: 16, borderWidth: 2, borderColor: commonStyles.mainColor },
    name: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
    role: { fontSize: 14, fontWeight: "400", marginBottom: 8 },
    industry: { fontSize: 14, color: '#000', fontWeight: "400", marginBottom: 8 },
    chapter: { fontSize: 12, color: '#000', fontWeight: '500' },
    rating: { color: '#000', fontSize: 12, marginTop: 4, fontWeight: "400", alignSelf: "flex-end" },

    statsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
    statCard: {
        width: '47%',
        // backgroundColor: '#f0f8ff',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        // borderColor: '#dcdcdc',
        borderColor: commonStyles.mainColor
    },
    statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
    statLabel: { fontSize: 13, color: '#555', textAlign: 'center', marginTop: 4 },

    meetingCard: { marginTop: 20, backgroundColor: '#fff', padding: 16, borderRadius: 10, borderWidth: 0.5, borderColor: commonStyles.mainColor },
    nextTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    meetingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
    meetingText: { marginLeft: 8, fontSize: 14 },
    detailsButton: {
        marginTop: 10,
        backgroundColor: commonStyles.mainColor,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    detailsText: { color: '#fff', fontWeight: 'bold' },
    card2: {
        borderWidth: 1,
        borderColor: commonStyles.mainColor,
        flex: 1, width: '45%',
        height: 106, borderRadius: 8,
        padding: 16,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    card2Title: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500'
    },
    card2Value: {
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    },

    //slider
    sliderContainer: {
        marginTop: 12,
    },
    sliderTrack: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    sliderFill: {
        height: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    sliderLabel: {
        fontSize: 10,
        color: '#555',
    },
    ratingLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 4,
    },

    // Floating Bell Icon Styles

    // floatingBell: {
    //   position: 'absolute',
    //   backgroundColor: '#ffcc00',
    //   padding: 12,
    //   borderRadius: 28,
    //   zIndex: 1000,
    //   elevation: 5,
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    // },

    floatingBell: {
        position: 'absolute',
        // backgroundColor: 'blue', // Add background color for visibility
        //right: 20,
        //bottom: 40,
        width: 68,
        height: 68,
        borderRadius: 28,
        alignItems:"flex-end",
        justifyContent:"center",
        zIndex: 999,
    },
    menuButton:{
        // position:'absolute',
        // top:responsiveHeight(40),
        // left:responsiveWidth(85),
        // top:responsiveHeight(50),
        // left:responsiveWidth(82)
    }
});

export default ProfileCard;
