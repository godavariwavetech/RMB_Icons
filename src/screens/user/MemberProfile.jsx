import React, { useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView, Linking, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import commonStyles from '../../commonstyles/CommonStyles';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
import api from '../../utils/api';

const MemberProfile = () => {
    const [selectedButton, setSelectedButton] = useState(null); // null | 'give' | 'ask'
    const navigation = useNavigation();
       const { userId } = useSelector(state => state.Auth);
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userCategory, setUserCategorey] = useState('');
    const [designation,setDesignation] = useState('')
    // const [userDob, setUserDob] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [loading,setLoading] = useState(false);

    const handleShare = async () => {
        const contactInfo = {
            title: 'Rajiv Chand - CEO Godavari Wave',
            message:
                'Contact Info:\n\n' +
                'Name: Rajiv Chand\n' +
                'Designation: CEO Godavari Wave\n' +
                'Phone: +91- 86888 83323\n' +
                'Email: rajiv@example.com\n' +
                'Address: 3rd Floor, BVR Enclave, Morampudi Rd, VL Puram, Rehmath Nagar Colony, Rajamahendravaram, Andhra Pradesh 533103',
        };

        try {
            await Share.open(contactInfo);
        } catch (error) {
            if (error?.message !== 'User did not share') {
                Alert.alert('Error', 'Something went wrong while sharing contact.');
                console.error('Share error:', error);
            }
        }
    };

    const MenuItems = [
        {
            label: 'Account Settings',
            icon: <Feather name="user" size={20} color={commonStyles.mainColor} />,
            onPress: () => navigation.navigate('AccountSettingsScreen'),
        },
        {
            label: 'Share Contact',
            icon: <Feather name="share-2" size={20} color={commonStyles.mainColor} />,
            onPress: () => handleShare(),
        },
        {
            label: 'My Meetings',
            icon: <MaterialCommunityIcons name="account-group-outline" size={20} color={commonStyles.mainColor} />,
            onPress: () => navigation.navigate('MyMeetings'),
        },
        {
            label: 'My Links',
            icon: <Feather name="link" size={20} color={commonStyles.mainColor} />,
            onPress: () => navigation.navigate('MyLinksScreen'),
        },
        // {
        //     label: 'Update Username & password',
        //     icon: <Feather name="lock" size={20} color={commonStyles.mainColor} />,
        //     onPress: () => navigation.navigate('UsernamePasswordScreen'),
        // },
        // {
        //     label: 'Language',
        //     icon: <MaterialCommunityIcons name="translate" size={20} color={commonStyles.mainColor} />,
        //     onPress: () => navigation.navigate('LanguageSelection'),
        // },
    ];


    const handlePhonePress = () => {
        Linking.openURL('tel:+91').catch(err =>
            Alert.alert('Error', 'Unable to open dialer.')
        );
    };

    const handleEmailPress = () => {
        Linking.openURL('mailto:ceo@godavariwave.com').catch(err =>
            Alert.alert('Error', 'Unable to open email client.')
        );
    };

    const handleInstagramPress = () => {
        const url = 'https://www.instagram.com/rajivnani?igsh=MWV0a2lzODNiNm0xOA=='; // replace with actual
        Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'Unable to open Instagram.')
        );
    };

    const handleFacebookPress = () => {
        const url = 'https://www.facebook.com/share/16zJVFCz1U/'; // replace with actual
        Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'Unable to open Facebook.')
        );
    };

    const handleLinkedInPress = () => {
        const url = 'https://www.linkedin.com/in/rajivnani/'; // replace with actual
        Linking.openURL(url).catch(() =>
            Alert.alert('Error', 'Unable to open LinkedIn.')
        );
    };
    // useEffect(()=>{
    //     FetchedData()
    // },[]);
    useFocusEffect(useCallback(() => {
        FetchedData();
    }, []));

    const FetchedData = async () => {
            try {
                setLoading(true)
                const resp = await api.post('getrnb_customer', { "rnb_customer_id": userId});
                console.log(resp.data.data[0], 'resssssssssssss');
                const data = await resp.data.data[0];
                console.log(data, 'data')
                if (resp.data.status === 200) {
                    setUserName(data?.rnb_customer_name);
                    setUserImage(data?.rnb_customer_photo);
                    setUserCategorey(data?.business_category);
                    // setUserDob(data?.rnb_customer_dob)
                    setUserPhone(data?.rnb_customer_phone_number);
                    setDesignation(data?.designation);
                    // setCompanyName(data?.company_name)
                }
    
            } catch (error) {
                console.log('Error', error)
            } finally {
                setLoading(false)
            }
        }


    return (
        <View  style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Feather name='arrow-left' size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Member Profile</Text>
            </View>
            <View style={styles.hr} />
            {/* <Text style={styles.header}>Member Profile</Text> */}

            <ScrollView style={{ padding: 16, flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 35 }}>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <Image source={userImage ? {uri:userImage } : require('../../assets/personPlaceholder.jpg')} // replace with actual image
                        style={styles.profileImage}
                    />
                    <Text style={commonStyles.heading}>{userName? userName : 'N/A'}</Text>
                    <Text style={[commonStyles.text3, commonStyles.mb8, commonStyles.mt8]}>{designation ? designation :'N/A'}</Text>
                    <Text style={[commonStyles.text3, commonStyles.mb24]}>{userCategory ? userCategory :'N/A'}</Text>

                    {/* Social Icons */}
                    {/* <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.iconWrapper} onPress={handlePhonePress}>
                            <Feather name="phone" size={22} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconWrapper, { backgroundColor: '#ff2147' }]} onPress={handleEmailPress}>
                            <MaterialCommunityIcons name="email-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleInstagramPress}>
                            <Image source={require('../../assets/instagramLogo.png')} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconWrapper, { backgroundColor: '#3b5998' }]} onPress={handleFacebookPress}>
                            <FontAwesome6 name="facebook-f" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconWrapper, { backgroundColor: '#0B69C7' }]} onPress={handleLinkedInPress}>
                            <FontAwesome6 name="linkedin-in" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View> */}
                </View>

                {/* Address */}
                <View style={styles.addressWrapper}>
                    <Text style={[commonStyles.text3, { textAlign: 'center' }]}>
                        3rd Floor, BVR Enclave, Morampudi Rd, VL Puram, Rehmath Nagar Colony,{"\n"}
                        Rajamahendravaram, Andhra Pradesh 533103
                    </Text>
                </View>

                {/* <TouchableOpacity onPress={() => navigation.navigate('AccountSettingsScreen')}>
                    <Text style={commonStyles.mb12}>Account Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyLinksScreen')}>
                    <Text style={commonStyles.mb12}> My Links</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('UsernamePasswordScreen')}>
                    <Text style={commonStyles.mb12}>Username and Pasdsword</Text>
                </TouchableOpacity>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.outlinedBtn, selectedButton === 'give' && styles.selectedBtn]} onPress={() => setSelectedButton('give')}>
                        <Text style={[styles.btnText, selectedButton === 'give' && styles.selectedBtnText]}>Give a Testimonial</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.outlinedBtn, selectedButton === 'ask' && styles.selectedBtn]} onPress={() => setSelectedButton('ask')}>
                        <Text style={[styles.btnText, selectedButton === 'ask' && styles.selectedBtnText]}>Ask for Testimonial</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Menu Items */}
                <View style={{ marginTop: 10 }}>
                    {MenuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                            <View style={styles.menuIcon}>{item.icon}</View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Entypo name="chevron-thin-right" size={22} color={commonStyles.mainColor} />
                        </TouchableOpacity>
                    ))}

                    {/* Logout (Red colored) */}
                    <TouchableOpacity style={[styles.menuItem, { marginTop: 12 }]} onPress={() => console.log('Logging out')}>
                        <View style={styles.menuIcon}>
                            <Feather name="power" size={20} color="red" />
                        </View>
                        <Text style={[styles.menuLabel, { color: 'red' }]}>Logout</Text>
                        <Entypo name="chevron-thin-right" size={22} color={'red'} />
                    </TouchableOpacity>
                </View>
                <Text style={[{fontsize:14,fontWeight:'500',color:commonStyles.mainColor},commonStyles.mt12]}>Version 1.0.0</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        backgroundColor: '#fff',
        // alignItems: 'center',
        flex: 1
    },

    profileCard: {
        backgroundColor: '#E8EDF4',
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 24,
        alignItems: 'center',
        width: '100%',
    },
    profileImage: {
        width: 109,
        height: 109,
        borderRadius: 100,
        borderColor: commonStyles.mainColor,
        borderWidth: 1,
        marginBottom: 12,
    },
    subText: {
        fontSize: 13,
        color: '#777',
        marginBottom: 16,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 14,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    iconWrapper: {
        backgroundColor: '#2196F3',
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressWrapper: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    outlinedBtn: {
        borderWidth: 1,
        borderColor: '#003B73',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 10,
    },
    btnText: {
        color: commonStyles.mainColor,
        fontSize: 14,
        fontWeight: '700',
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
    selectedBtn: {
        backgroundColor: '#17498F',
        borderColor: '#17498F',
    },
    selectedBtnText: {
        color: '#fff',
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    menuIcon: {
        width: 30,
        alignItems: 'center',
        marginRight: 10,
    },
    menuLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: commonStyles.mainColor,
    },

});

export default MemberProfile;
