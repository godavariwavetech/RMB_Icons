import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Text, StatusBar, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import commonStyles from '../../commonstyles/CommonStyles';
import Loader from '../../components/loader';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import Toast from 'react-native-toast-message';

const SupportScreen = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ subject: '', description: '' });
    const [loading, setLoading] = useState(false);
    const { userId, userName, userPhone } = useSelector(state => state.Auth);

    const navigation = useNavigation();

    // console.log(userId, userName, userPhone, 'userdetails');

    const validateForm = () => {
        let valid = true;
        const newErrors = { subject: '', description: '' };

        if (!subject.trim()) {
            newErrors.subject = 'Subject is required';
            valid = false;
        } else if (subject.trim().length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters long';
            valid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (validateForm()) {
            const payload = {
                rmb_userId: userId,
                rmb_userName: userName,
                rmb_user_Phone: userPhone,
                subject: subject,
                description: description,
            };
            console.log(payload, 'payload');
            submitQuery(payload);
            // Reset form after successful validation
            // setSubject('');
            // setDescription('');
            setErrors({ subject: '', description: '' });
        }
    };

    const submitQuery = async (payload) => {
        try {
            setLoading(true);
            const resp = await api.post('postthesupport', payload);
            console.log(resp.data,'support response');
            if (resp.data?.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Your Query submitted Successfully.',
                    position: 'top',
                    visibilityTime: 3000,
                });
                navigation.goBack();
                setSubject('');
                setDescription('');
                // Alert.alert('Your Query Submitted Successfully');
            }
        } catch (error) {
            console.log('Error', error);
            Alert.alert('Error', error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={'#0A1F3C'} />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>Support</Text>
            </View>
            <View style={styles.hr} />

            {/* <View style={{ flex: 1, paddingHorizontal: 16 }}></View> */}
            <View style={{ flex: 1, padding: 16,marginTop:24 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                    value={subject}
                    onChangeText={setSubject}
                />
                {errors.subject ? <Text style={styles.errorText}>{errors.subject}</Text> : null}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={5}
                />
                {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
                {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity> */}
            </View>
            <View style={{ margin: 16 }}>
                <TouchableOpacity style={commonStyles.blueButton} onPress={handleSubmit}>
                    {
                        loading ? <Loader size='small' color='#fff' /> : (
                            <Text style={commonStyles.blueButtonText}>Submit</Text>
                        )
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // padding: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff'
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
    errorText: {
        color: '#FF0000',
        fontSize: 12,
        marginBottom: 15,
        marginLeft: 10,
    },
});