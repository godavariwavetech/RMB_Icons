import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../components/loader';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import Toast from 'react-native-toast-message';

const LeadsGivenScreen = () => {
    const [referralType, setReferralType] = useState('Inside');
    const [status, setStatus] = useState({
        call: false,
        card: false,
    });
    const [strength, setStrength] = useState(5);
    const [referralName, setReferralName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);
    const { userId } = useSelector(state => state.Auth);
    const [filteredMembers, setFilteredMembers] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [allMembers, setAllMembers] = useState([]);

    const [errors, setErrors] = useState({
        to: '',
        name: '',
        phone: '',
        address: '',
    });


    // const [userData,setUserData] = useState({id: 1, name: 'Rajiv Chand', phone: '8688883323', email: 'rajivchand@gmail.com', address: 'Rajamahendravarm'});

    const navigation = useNavigation();
    // const filteredMembers = members.filter(member =>
    //     member.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // console.log(userId,'userId')

    const handleStatusToggle = (key) => {
        setStatus({ ...status, [key]: !status[key] });
    };

    useEffect(() => {
        getAllMembers()
    }, []);
    const getAllMembers = async () => {
        try {
            const resp = await api.get('gettotalregisterd');
            const data = await resp.data.data || [];
            console.log(data, 'data')
            if (resp.data.status == 200) {
                setAllMembers(data); // store all
                setFilteredMembers(data); // initially same
                // const filteredMembers = data?.filter(member =>
                //     member.rnb_customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
                // );
                // console.log(filteredMembers, 'Members');
                // setFilteredMembers(filteredMembers);
            }
        } catch (error) {
            console.log('Error', error);
            Alert.alert(error)
        }
    }

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredMembers([]); // show nothing
        } else {
            const filtered = allMembers.filter(member =>
                member.rnb_customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMembers(filtered);
        }
    }, [searchQuery, allMembers]);


    // useEffect(() => {
    //     if (referralType === 'Inside' && selectedUser) {
    //         setReferralName(userData.name);
    //         setTelephone(userData.phone);
    //         setEmail(userData.email);
    //         setAddress(userData.address);
    //     } else if (referralType === 'Outside') {
    //         setReferralName('');
    //         setTelephone('');
    //         setEmail('');
    //         setAddress('');
    //     }
    // }, [referralType, selectedUser]);

    const handleSubmit = async () => {
        // if (!selectedUser) {
        //     Alert.alert('Please select a user from the dropdown.');
        //     return;
        // }

        let valid = true;
        let newErrors = { to: '', name: '', phone: '', address: '' };

        if (!selectedUser) {
            newErrors.to = 'Please select a user.';
            valid = false;
        }
        if (!referralName.trim()) {
            newErrors.name = 'Please enter referral name.';
            valid = false;
        }
        if (!telephone || !/^\d{10}$/.test(telephone)) {
            newErrors.phone = 'Enter a valid 10-digit phone number.';
            valid = false;
        }
        if (!address.trim()) {
            newErrors.address = 'Please enter address.';
            valid = false;
        }
        setErrors(newErrors);
        if (!valid) return;

        const payload = {
            user_id: userId,
            customer_id: selectedUser.id,
            customer_name: selectedUser?.rnb_customer_name,
            // referral_type: referralType,
            // status_call: status.call,
            // status_card: status.card,
            referral_name: referralName,
            referal_number: telephone,
            referal_email: email,
            referal_address: address,
            referal_comments: comments,
            referal_strength: strength,
        };

        console.log('Submitting:', payload);
        // return
        try {
            setLoading(true)
            const resp = await api.post('rmb_referal', payload);
            console.log(resp.data, 'data');
            if (resp.data.status == 200) {
                // Alert.alert('Submitted Successfully');
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'submitted Successfully.',
                    position: 'top',
                    visibilityTime: 3000,
                });
                navigation.goBack();
            }
        } catch (error) {
            console.log('Error', error)
        } finally {
            setLoading(false)
        }

        // You can send this payload to backend using fetch/axios
        // Example:
        // axios.post('https://your-api.com/submit-referral', payload)
        //   .then(res => alert("Submitted successfully!"))
        //   .catch(err => alert("Failed to submit"));
    };



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#0A1F3C" />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Leads Given</Text>
                <View style={{ width: 24 }} />
            </View>
            <View style={styles.hr} />

            <ScrollView contentContainerStyle={{ paddingBottom: 8 }} showsVerticalScrollIndicator={false}>

                <View style={{ padding: 16, paddingTop: 24 }}>

                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="To :"
                            value={selectedUser?.rnb_customer_name ? selectedUser?.rnb_customer_name : searchQuery}
                            // onChangeText={(text) => {
                            //     setSearchQuery(text);
                            //     setSelectedUser(text);
                            // }}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                // if (text === '') {
                                setSelectedUser(null); // Clear selected user when search query is cleared
                                // }
                            }}
                            style={styles.input}
                            placeholderTextColor={commonStyles.mainColor}
                        />
                        <Feather name="search" size={20} color="#17498F" style={styles.searchIcon} />
                    </View>

                    {searchQuery && !selectedUser && (
                        <View style={styles.dropdown}>
                            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                {filteredMembers?.length > 0 ? (
                                    filteredMembers?.map((member) => (
                                        <TouchableOpacity
                                            key={member.id}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setSelectedUser(member);
                                                // setSearchQuery('');
                                                setSearchQuery(member.rnb_customer_name);
                                                if (errors.to) {
                                                    setErrors(prev => ({ ...prev, to: '' }));
                                                }
                                            }}
                                        >
                                            <Text>{member.rnb_customer_name}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.noResultText}>No matches found</Text>
                                )}
                            </ScrollView>
                        </View>
                    )}
                    {errors.to ? <Text style={styles.errorText}>{errors.to}</Text> : null}


                    {/* Referral Type */}
                    {/* <Text style={styles.sectionLabel}>Referral Type</Text>
                    <View style={styles.toggleRow}>
                        <TouchableOpacity
                            style={[styles.toggleButton, referralType === 'Inside' && styles.toggleButtonSelected]}
                            onPress={() => setReferralType('Inside')}
                        >
                            <View style={styles.radioWrapper}>
                                <View style={[styles.radioOuter, referralType === 'Inside' && { borderColor: "#fff" }]}>
                                    {referralType === 'Inside' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={[styles.toggleText, referralType === 'Inside' && styles.toggleTextSelected]}>Inside</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.toggleButton, referralType === 'Outside' && styles.toggleButtonSelected]}
                            onPress={() => setReferralType('Outside')}
                        >
                            <View style={styles.radioWrapper}>
                                <View style={[styles.radioOuter, referralType === 'Outside' && { borderColor: "#fff" }]}>
                                    {referralType === 'Outside' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={[styles.toggleText, referralType === 'Outside' && styles.toggleTextSelected]}>Outside</Text>
                            </View>

                        </TouchableOpacity>
                    </View> */}

                    {/* Referral Status */}
                    {/* <Text style={styles.sectionLabel}>Referral Status</Text>
                    <View style={styles.statusRow}>
                        <TouchableOpacity
                            style={[styles.statusBox, status.call && styles.statusBoxSelected]}
                            onPress={() => handleStatusToggle('call')}
                        >
                            <Feather
                                name="phone"
                                size={16}
                                style={status.call ? styles.iconStyleSelected : styles.iconStyle}
                            />
                            <Text style={[styles.statusText, status.call && styles.statusTextSelected,]}>
                                Told Them You Would Call
                            </Text>
                            <Feather
                                name={status.call ? "check-square" : "square"}
                                size={16}
                                style={status.call ? styles.iconStyleSelected : styles.iconStyle}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.statusBox, status.card && styles.statusBoxSelected]}
                            onPress={() => handleStatusToggle('card')}
                        >
                            <MaterialIcons
                                name="credit-card"
                                size={16}
                                style={status.card ? styles.iconStyleSelected : styles.iconStyle}
                            />
                            <Text style={[styles.statusText, status.card && styles.statusTextSelected,]}>
                                Given Your Card
                            </Text>
                            <Feather
                                name={status.card ? "check-square" : "square"}
                                size={16}
                                style={status.card ? styles.iconStyleSelected : styles.iconStyle}
                            />
                        </TouchableOpacity>
                    </View> */}


                    {/* Inputs */}
                    <View style={[commonStyles.mt20, commonStyles.mb12]}>
                        <View style={[styles.inputIconWrapper]}>
                            <Feather name="user" size={16} color={commonStyles.mainColor} />
                            <TextInput
                                placeholder="Referral Name"
                                value={referralName}
                                // onChangeText={setReferralName}
                                onChangeText={(text) => {
                                    setReferralName(text);
                                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                                }}
                                style={styles.textField}
                                placeholderTextColor={commonStyles.lightColor}
                            />
                        </View>
                        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                    </View>

                    <View style={commonStyles.mb12}>
                        <View style={styles.inputIconWrapper}>
                            <Feather name="phone" size={16} color={commonStyles.mainColor} />
                            <TextInput
                                placeholder="Mobile Number"
                                value={telephone}
                                // onChangeText={setTelephone}
                                onChangeText={(text) => {
                                    setTelephone(text);
                                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                                }}
                                style={styles.textField}
                                keyboardType='numeric'
                                maxLength={10}
                                placeholderTextColor={commonStyles.lightColor}
                            />
                        </View>
                        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
                    </View>

                    <View style={commonStyles.mb12}>
                        <View style={styles.inputIconWrapper}>
                            <MaterialIcons name="email" size={16} color={commonStyles.mainColor} />
                            <TextInput
                                placeholder="E-Mail"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.textField}
                                placeholderTextColor={commonStyles.lightColor}
                            />
                        </View>
                    </View>

                    <View style={commonStyles.mb12}>
                        <View style={styles.inputIconWrapper}>
                            <Feather name="map-pin" size={16} color={commonStyles.mainColor} />
                            <TextInput
                                placeholder="Address"
                                value={address}
                                // onChangeText={setAddress}
                                onChangeText={(text) => {
                                    setAddress(text);
                                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                                }}
                                style={styles.textField}
                                placeholderTextColor={commonStyles.lightColor}
                            />
                        </View>
                        {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
                    </View>

                    <View style={[styles.inputIconWrapper, { height: 80, alignItems: 'flex-start' }]}>
                        <Feather name="message-square" size={16} color={commonStyles.mainColor} style={{ marginTop: 12 }} />
                        <TextInput
                            placeholder="Comments"
                            value={comments}
                            onChangeText={setComments}
                            multiline
                            style={[styles.textField, { height: '100%', textAlignVertical: 'top' }]}
                            placeholderTextColor={commonStyles.mainColor}
                        />
                    </View>



                    <View style={styles.graphContainer}>
                        <Text style={styles.title}>Rate the Referral Strength</Text>
                        <View style={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((val) => (
                                <View key={val} style={styles.ratingItem}>
                                    <View
                                        style={[
                                            styles.squareBar,
                                            {
                                                width: 20 + val * 6, // gradually increasing width
                                                height: 20 + val * 6, // gradually increasing height
                                                backgroundColor: `rgba(23, 73, 143, ${val * 0.2})`,
                                            },
                                        ]}
                                    />
                                    <TouchableOpacity onPress={() => setStrength(val)} style={styles.radioOuter}>
                                        {strength === val && <View style={styles.radioInner2} />}
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Confirm Button */}
                    <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
                        {
                            loading ? <Loader size='small' color='#fff' /> : (
                                <Text style={styles.confirmText}>Confirm</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0A1F3C',
    },
    hr: { height: 1, backgroundColor: '#ccc', },
    inputWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#456DA5',
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 40,
        height: 45,
        fontSize: 14,
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    toggleRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 10,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#17498F',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    toggleButtonSelected: {
        backgroundColor: '#17498F',
    },
    toggleText: {
        color: '#17498F',
        fontWeight: '500',
    },
    toggleTextSelected: {
        color: '#fff',
    },

    inputIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#94ABCB',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        // marginBottom: 12,
        height: 45,
    },
    textField: {
        marginLeft: 10,
        flex: 1,
        fontSize: 14,
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    ratingBox: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginBottom: 6,
    },

    radioSelected: {
        backgroundColor: '#17498F',
        borderColor: '#17498F',
    },
    confirmBtn: {
        backgroundColor: '#17498F',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    radioOuter: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#17498F',
        borderColor: "#17498F"
    },

    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        borderColor: '#fff'
        // padding:2
    },

    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#17498F',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#fff',
    },

    statusRow: {
        gap: 10,
        marginBottom: 16,
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#17498F',
        backgroundColor: '#fff',
    },
    statusBoxSelected: {
        backgroundColor: commonStyles.mainColor,
    },
    statusText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#17498F',
    },
    statusTextSelected: {
        color: '#fff',
    },
    iconStyle: {
        color: '#17498F',
    },
    iconStyleSelected: {
        color: '#fff',
    },

    //3rd
    graphContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    ratingItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    squareBar: {
        marginBottom: 8,
        borderRadius: 4,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#17498F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner2: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#17498F',
    },

    //for search field
    // dropdown: {
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 6,
    //     backgroundColor: '#fff',
    //     marginTop: 2,
    //     maxHeight: 150,
    //     paddingVertical: 4,
    //     paddingHorizontal: 10,
    // },
    dropdownItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    noResultText: {
        padding: 8,
        color: '#999',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
        marginTop: 2,
        maxHeight: 200, // limit height to 200px
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        marginBottom: 8,
    },

});

export default LeadsGivenScreen;
