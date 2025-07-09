import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';

const AccountSettings = () => {
    const [form, setForm] = useState({
        fullName: 'Rajiv Chand',
        designation: 'CEO Godavari Wave',
        company: 'Godavari Wave',
        department: 'Digital Marketing',
        phone: '8688883323',
        building: 'Yamaha Show room',
        street: 'Ramalaya Strret',
        area: 'VL Puram',
        city: 'Rajahmundry',
        state: 'Andhra Pradesh',
        pincode: '533295',
    });

    const [imageBase64, setImageBase64] = useState(null);
    const navigation = useNavigation();

    const handleChoosePhoto = () => {
        launchImageLibrary(
            { mediaType: 'photo', includeBase64: true },
            (response) => {
                if (response.didCancel) return;
                if (response.assets && response.assets.length > 0) {
                    const base64 = response.assets[0].base64;
                    setImageBase64(base64);
                }
            }
        );
    };

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = () => {
        const submissionData = {
            ...form,
            profileImage: imageBase64,
        };

        console.log('Submitted Data:', submissionData);

        // Alert.alert('Form Submitted', 'Check your console log for full data including base64 image.');
        Alert.alert('Updated Successfully');
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#0A1F3C" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Settings</Text>
                <View style={{ width: 24 }} />
            </View>
            <View style={styles.hr} />

            {/* Profile Image */}
            {/* <View style={styles.avatarContainer}>
        <Image
          source={imageBase64 ? { uri: `data:image/jpeg;base64,${imageBase64}` } : require('../../assets/profile.png')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraIcon} onPress={handleChoosePhoto}>
          <Icon name="camera" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </View> */}

            <ScrollView style={{ paddingHorizontal: 16,flex:1 }} contentContainerStyle={{paddingBottom:16}} showsVerticalScrollIndicator={false}>

            <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={
                            imageBase64
                                ? { uri: `data:image/jpeg;base64,${imageBase64}` }
                                : require('../../assets/sirImg.png') // default image
                        }
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.cameraOverlay} onPress={handleChoosePhoto}>
                        <Icon name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.changePhotoText}>Change Photo</Text>
            </View>


            {/* Form */}
            <View style={styles.formContainer}>
                {[
                    { label: 'Full Name', key: 'fullName' },
                    { label: 'Designation/Title', key: 'designation' },
                    { label: 'Company Name', key: 'company' },
                    { label: 'Department', key: 'department' },
                    { label: 'Phone Number', key: 'phone', keyboardType: 'numeric' },
                    { section: 'Address' },
                    { label: 'Building/Apartment', key: 'building' },
                    { label: 'Street Name', key: 'street' },
                    { label: 'Area/Locality', key: 'area' },
                    { label: 'City', key: 'city' },
                    { label: 'State', key: 'state' },
                    { label: 'Pincode', key: 'pincode' , keyboardType: 'numeric' },
                ].map((field, index) =>
                    field.section ? (
                        <Text key={index} style={styles.sectionTitle}>{field.section}</Text>
                    ) : (
                        <View key={index}>
                            <Text style={styles.label}>{field.label}</Text>
                            <TextInput
                                style={styles.input}
                                value={form[field.key]}
                                onChangeText={(text) => handleChange(field.key, text)}
                                keyboardType={field.keyboardType || 'default'}
                            />
                        </View>
                    )
                )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={commonStyles.blueButton} onPress={handleSubmit}>
                <Text style={commonStyles.blueButtonText}>Submit</Text>
            </TouchableOpacity>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // paddingHorizontal: 20,
        flex:1
    },
    header: {
        // marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:16
    },
    headerTitle: {
        // fontSize: 18,
        // fontWeight: 'bold',
        // color: '#1c1c1c',
        fontSize: 18,
        fontWeight: "600",
        color: "#0A1F3C",
        // flex: 1,
        // textAlign: 'center'
    },
    hr:{
        height: 0.5,
        backgroundColor: "#ccc",
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#eee',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 10,
        right: 140,
        backgroundColor: '#4a4a4a',
        borderRadius: 12,
        padding: 4,
    },
    changePhotoText: {
        marginTop: 8,
        color: '#000',
        fontSize: 14,
    },
    formContainer: {
        marginBottom: 30,
    },
    label: {
        marginBottom: 4,
        color: '#333',
        fontWeight: '500',
        fontSize:14
    },
    input: {
        borderWidth: 1,
        borderColor: '#c3d1e6',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 15,
        color: '#000',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        color: '#1c1c1c',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarWrapper: {
        position: 'relative',
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: '#003399', // deep blue
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
    },
    cameraOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },

});

export default AccountSettings;
