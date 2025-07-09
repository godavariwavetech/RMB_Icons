

import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, ScrollView, StatusBar,
    Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import Loader from '../../components/loader';
import Toast from 'react-native-toast-message';

const ThankYouNoteScreen = () => {
    const [amount, setAmount] = useState('');
    const [comments, setComments] = useState('');

    const [businessType, setBusinessType] = useState('New');
    const [referralType, setReferralType] = useState('Inside');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userId } = useSelector(state => state.Auth);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const navigation = useNavigation();
    const [members] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        { id: 4, name: 'Bob Williams' },
        { id: 5, name: 'Rajiv' },
        { id: 6, name: 'Sai Kumar' },
        { id: 7, name: 'Rajive Chand' },
        { id: 8, name: 'Rajeev' },
        { id: 9, name: 'Rajiv Kakara' },
        { id: 10, name: 'Rajivchand Kakara' },
        // { id: 11, name: 'Mahesh3' },
        // { id: 12, name: 'Maneesh' },
        // { id: 13, name: 'MaheshBabu' },
        // { id: 14, name: 'Mahesh gunana' },
        // { id: 15, name: 'Mahesh5' },
        // { id: 16, name: 'Mahesh7' },
    ]);

    // const filteredMembers = members.filter(member =>
    //     member.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    useEffect(() => {
        getAllMembers()
    }, []);
    const getAllMembers = async () => {
        try {
            const resp = await api.get('gettotalregisterd');
            const data = await resp.data.data || [];
            console.log(data[0], 'data')
            if (resp.data.status == 200) {
                const filteredMembers = data?.filter(member =>
                    member.rnb_customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
                );
                // console.log(filteredMembers, 'Members');
                setFilteredMembers(filteredMembers);
            }
        } catch (error) {
            console.log('Error', error);
            Alert.alert(error)
        }
    }


    const handleSubmit = async () => {
        // const formData = {
        //     thankYouTo: selectedUser ? selectedUser.name : '',
        //     amount,
        //     businessType,
        //     referralType,
        //     comments,
        // };
        const payload = {
            to_id: selectedUser?.id,
            to_name: selectedUser?.rnb_customer_name,
            amount: amount,
            business_type: businessType,
            referral_type: referralType,
            comments: comments,
            user_id: userId

        }
        console.log('Submitted Thank You Note:', payload);
        try {
            setLoading(true)
            const resp = await api.post('thankyounote', payload);
            console.log(resp.data, 'data');
            if (resp.data.status == 200) {
                // Alert.alert('Submitted Successfully')
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
    };


    return (
        <View style={styles.container} >
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Feather name='arrow-left' size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>ThankYou Note</Text>
            </View>
            <View style={styles.hr} />
            <ScrollView style={{ paddingHorizontal: 16, flex: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    {/* Thank You To Search Input */}
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Thank You to:"
                            value={selectedUser ? selectedUser.rnb_customer_name : searchQuery}
                            // onChangeText={(text) => {
                            //     setSearchQuery(text);
                            //     setSelectedUser(null);
                            // }}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                if (text === '') {
                                    setSelectedUser(null); // Clear selected user when search query is cleared
                                }
                            }}
                            style={styles.input}
                            placeholderTextColor="#7D7D7D"
                        />
                        <Feather name="search" size={18} color={commonStyles.mainColor} style={styles.rightIcon} />
                    </View>

                    {searchQuery && !selectedUser && (
                        <View style={styles.dropdown}>
                            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                                {filteredMembers?.length > 0 ? (
                                    filteredMembers.map((member) => (
                                        <TouchableOpacity
                                            key={member.id}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setSelectedUser(member);
                                                setSearchQuery('');
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

                    {/* Amount Field */}
                    <View style={styles.inputWrapper}>
                        <FontAwesome6 name="indian-rupee-sign" size={18} color={commonStyles.mainColor} style={styles.leftIcon} />
                        <View style={{ height: 20, backgroundColor: '#7D7D7D', width: 1, position: 'absolute', left: 27, top: 14 }} />
                        <TextInput
                            placeholder="Amount"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            style={[styles.input, { paddingLeft: 35 }]}
                            placeholderTextColor="#7D7D7D"
                        />
                    </View>

                    {/* Business Type */}
                    <Text style={styles.label}>Business Type</Text>
                    <View style={[styles.radioGroup, { justifyContent: 'space-between' }]}>
                        {['New', 'Repeat'].map((item) => {
                            const isSelected = businessType === item;
                            return (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => setBusinessType(item)}
                                    style={[styles.radioPill, { width: '48%' }, isSelected && styles.radioPillSelected]}
                                >
                                    <View style={[styles.radioIcon, isSelected ? styles.radioIconSelected : styles.radioIconUnselected]}>
                                        {isSelected && <View style={styles.radioDot} />}
                                    </View>
                                    <Text style={[styles.radioLabel, isSelected && styles.radioLabelSelected]}>{item}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Referral Type */}
                    <Text style={styles.label}>Referral Type</Text>
                    <View style={styles.radioGroup}>
                        {['Inside', 'Outside', 'Tier3+'].map((item) => {
                            const isSelected = referralType === item;
                            return (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => setReferralType(item)}
                                    style={[styles.radioPill, isSelected && styles.radioPillSelected]}
                                >
                                    <View style={[styles.radioIcon, isSelected ? styles.radioIconSelected : styles.radioIconUnselected]}>
                                        {isSelected && <View style={styles.radioDot} />}
                                    </View>
                                    <Text style={[styles.radioLabel, isSelected && styles.radioLabelSelected]}>{item}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Comments Box */}
                    <View style={styles.commentBox}>
                        <MaterialIcons name="comment" size={18} color="#888" style={styles.commentIcon} />
                        <TextInput
                            placeholder="Comments"
                            multiline
                            numberOfLines={4}
                            value={comments}
                            onChangeText={setComments}
                            placeholderTextColor="#7D7D7D"
                            style={styles.commentInput}
                        />
                    </View>

                    {/* Confirm Button */}
                    <TouchableOpacity style={commonStyles.blueButton} onPress={handleSubmit}>
                        {
                            loading ? <Loader size='small' color='#fff' /> : (
                                <Text style={commonStyles.blueButtonText}>Confirm</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    header: {
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
        backgroundColor: "#7D7D7D",
    },
    form: {
        marginTop: 20,
        marginBottom: 40,
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#94ABCB',
        borderRadius: 8,
        padding: 12,
        paddingRight: 40,
        fontSize: 16,
        color: '#000',
    },
    leftIcon: {
        position: 'absolute',
        left: 10,
        top: 14,
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
        top: 14,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 10,
        color: '#000',
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    radioPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: commonStyles.mainColor,
        backgroundColor: '#fff',
    },
    radioPillSelected: {
        backgroundColor: commonStyles.mainColor,
        borderColor: commonStyles.mainColor,
    },
    radioIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioIconUnselected: {
        borderColor: '#003380',
        backgroundColor: '#fff',
    },
    radioIconSelected: {
        borderColor: '#fff',
        backgroundColor: '#003380',
    },
    radioDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    radioLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#003380',
    },
    radioLabelSelected: {
        color: '#fff',
    },
    commentBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#c3d1e6',
        borderRadius: 10,
        padding: 10,
        marginBottom: 25,
        maxHeight: 130
    },
    commentIcon: {
        marginTop: 8,
        marginRight: 8,
    },
    commentInput: {
        flex: 1,
        fontSize: 15,
        color: '#000',
        textAlignVertical: 'top',
        minHeight: 80,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
        marginTop: -10,
        maxHeight: 200,
        paddingVertical: 4,
        paddingHorizontal: 10,
        zIndex: 99,
        marginBottom: 8
    },
    dropdownItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    noResultText: {
        padding: 8,
        color: '#999',
    },
});

export default ThankYouNoteScreen;
