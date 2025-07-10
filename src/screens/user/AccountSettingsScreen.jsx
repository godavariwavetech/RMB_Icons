// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { launchImageLibrary } from 'react-native-image-picker';
// import commonStyles from '../../commonstyles/CommonStyles';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import api from '../../utils/api';
// const AccountSettings = () => {
//     const [form, setForm] = useState({
//         fullName: 'Rajiv Chand',
//         designation: 'CEO Godavari Wave',
//         company: 'Godavari Wave',
//         department: 'Digital Marketing',
//         phone: '8688883323',
//         address: 'Yamaha Show room, Ramalaya Street, VL Puram', // Combined address field
//         city: 'Rajahmundry',
//         state: 'Andhra Pradesh',
//         pincode: '533295',
//     });

//     const [imageBase64, setImageBase64] = useState(null);
//     const navigation = useNavigation();
//     const [loading,setLoading] = useState(false);
//     const { userId } = useSelector(state => state.Auth);

//     const handleChoosePhoto = () => {
//         launchImageLibrary(
//             { mediaType: 'photo', includeBase64: true },
//             (response) => {
//                 if (response.didCancel) return;
//                 if (response.assets && response.assets.length > 0) {
//                     const base64 = response.assets[0].base64;
//                     setImageBase64(base64);
//                 }
//             }
//         );
//     };

//     useEffect(()=>{
//         FetchedData()
//     },[])


//      const FetchedData = async () => {
//         try {
//             setLoading(true);
//             const resp = await api.post('getrnb_customer', { "rnb_customer_id": userId });
//             // console.log(resp.data.data[0], 'resssssssssssss');
//             const data = await resp.data.data[0];
//             console.log(data, 'account data')
//             // if (resp.data.status === 200) {
//             //     setUserName(data?.rnb_customer_name);
//             //     setUserImage(data?.rnb_customer_photo);
//             //     setUserCategorey(data?.business_category);
//             //     setUserDob(data?.rnb_customer_dob)
//             //     setUserPhone(data?.rnb_customer_phone_number);
//             //     setDesignation(data?.designation);
//             //     setCompanyName(data?.company_name)
//             // }

//         } catch (error) {
//             console.log('Error', error);
//             Alert.alert(error, 'Error')
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleChange = (key, value) => {
//         setForm({ ...form, [key]: value });
//     };

//     const handleSubmit = () => {
//         const submissionData = {
//             ...form,
//             profileImage: imageBase64,
//         };

//         console.log('Submitted Data:', submissionData);
//         Alert.alert('Updated Successfully');
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#fff" barStyle="dark-content" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Icon name="arrow-left" size={24} color="#0A1F3C" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Account Settings</Text>
//                 <View style={{ width: 24 }} />
//             </View>
//             <View style={styles.hr} />

//             {/* Profile Image */}
//             <View style={styles.avatarContainer}>
//                 <View style={styles.avatarWrapper}>
//                     <Image
//                         source={
//                             imageBase64
//                                 ? { uri: `data:image/jpeg;base64,${imageBase64}` }
//                                 : require('../../assets/personPlaceholder.jpg')
//                         }
//                         style={styles.avatar}
//                     />
//                     <TouchableOpacity style={styles.cameraOverlay} onPress={handleChoosePhoto}>
//                         <Icon name="camera" size={20} color="#fff" />
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={styles.changePhotoText}>Change Photo</Text>
//             </View>

//             {/* Form */}
//             <ScrollView style={{ paddingHorizontal: 16, flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
//                 <View style={styles.formContainer}>
//                     {[
//                         { label: 'Full Name', key: 'fullName' },
//                         { label: 'Designation/Title', key: 'designation' },
//                         { label: 'Company Name', key: 'company' },
//                         { label: 'Department', key: 'department' },
//                         { label: 'Phone Number', key: 'phone', keyboardType: 'numeric' },
//                         { section: 'Address' },
//                         { label: 'Address', key: 'address', multiline: true, numberOfLines: 4 }, // Combined address field
//                         { label: 'City', key: 'city' },
//                         { label: 'State', key: 'state' },
//                         { label: 'Pincode', key: 'pincode', keyboardType: 'numeric' },
//                     ].map((field, index) =>
//                         field.section ? (
//                             <Text key={index} style={styles.sectionTitle}>{field.section}</Text>
//                         ) : (
//                             <View key={index}>
//                                 <Text style={styles.label}>{field.label}</Text>
//                                 <TextInput
//                                     style={[styles.input, field.multiline && styles.textArea]} // Apply textArea style for multiline
//                                     value={form[field.key]}
//                                     onChangeText={(text) => handleChange(field.key, text)}
//                                     keyboardType={field.keyboardType || 'default'}
//                                     multiline={field.multiline || false}
//                                     numberOfLines={field.numberOfLines || 1}
//                                     textAlignVertical={field.multiline ? 'top' : 'center'} // Align text to top for TextArea
//                                 />
//                             </View>
//                         )
//                     )}
//                 </View>

//                 {/* Submit Button */}
//                 <TouchableOpacity style={commonStyles.blueButton} onPress={handleSubmit}>
//                     <Text style={commonStyles.blueButtonText}>Submit</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 16,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#0A1F3C',
//     },
//     hr: {
//         height: 0.5,
//         backgroundColor: '#ccc',
//     },
//     avatarContainer: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     avatarWrapper: {
//         position: 'relative',
//         width: 110,
//         height: 110,
//         borderRadius: 55,
//         borderWidth: 2,
//         borderColor: '#003399',
//         overflow: 'hidden',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 55,
//     },
//     cameraOverlay: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         height: 30,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     changePhotoText: {
//         marginTop: 10,
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#000',
//     },
//     formContainer: {
//         marginBottom: 30,
//     },
//     label: {
//         marginBottom: 4,
//         color: '#333',
//         fontWeight: '500',
//         fontSize: 14,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#c3d1e6',
//         borderRadius: 10,
//         padding: 12,
//         marginBottom: 15,
//         fontSize: 15,
//         color: '#000',
//     },
//     textArea: {
//         height: 100, // Height for TextArea
//         paddingTop: 12,
//     },
//     sectionTitle: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginTop: 20,
//         marginBottom: 10,
//         color: '#1c1c1c',
//     },
// });

// export default AccountSettings;



// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { launchImageLibrary } from 'react-native-image-picker';
// import commonStyles from '../../commonstyles/CommonStyles';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import api from '../../utils/api';
// import Loader from '../../components/loader';

// const AccountSettings = () => {
//     const [form, setForm] = useState({
//         fullName: '',
//         designation: '',
//         company: '',
//         department: '',
//         phone: '',
//         address: '',
//         city: '',
//         state: '',
//         pincode: '',
//     });

//     const [imageBase64, setImageBase64] = useState(null);
//     const [imageUrl, setImageUrl] = useState(null); // Store API-provided image URL
//     const navigation = useNavigation();
//     const [loading, setLoading] = useState(false);
//     const [loading1, setLoading1] = useState(false);
//     const { userId } = useSelector(state => state.Auth);

//     const FetchedData = async () => {
//         try {
//             setLoading(true);
//             const resp = await api.post('getrnb_customer', { rnb_customer_id: userId });
//             const data = resp.data.data[0];
//             console.log(data, 'account data');

//             // Map API data to form fields
//             setForm({
//                 fullName: data?.rnb_customer_name || '',
//                 designation: data?.designation || '',
//                 company: data?.company_name || '',
//                 department: data?.business_category || '', // Not provided in API, so empty
//                 phone: data?.rnb_customer_phone_number || '',
//                 address: data?.address_area || '',
//                 city: data?.location_name || '', // Not provided in API, so empty
//                 state: data?.state_name || '',
//                 pincode: data?.pin_code || '',
//             });

//             // Set profile image from API
//             if (data?.rnb_customer_photo) {
//                 setImageUrl(data.rnb_customer_photo);
//             }
//         } catch (error) {
//             console.log('Error fetching data:', error);
//             Alert.alert('Error', 'Failed to fetch user data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         FetchedData();
//     }, []);

//     const handleChoosePhoto = () => {
//         launchImageLibrary(
//             { mediaType: 'photo', includeBase64: true },
//             (response) => {
//                 if (response.didCancel) return;
//                 if (response.assets && response.assets.length > 0) {
//                     const base64 = response.assets[0].base64;
//                     setImageBase64(base64);
//                     setImageUrl(null); // Clear URL if new image is selected
//                 }
//             }
//         );
//     };

//     const handleChange = (key, value) => {
//         setForm({ ...form, [key]: value });
//     };

//     const handleSubmit = async () => {
//         try {
//             setLoading1(true);
//             const submissionData = {
//                 // rnb_customer_id: userId,
//                 // rnb_customer_name: form.fullName,
//                 // designation: form.designation,
//                 // company_name: form.company,
//                 // department: form.department,
//                 // rnb_customer_phone_number: form.phone,
//                 // address_area: form.address,
//                 // city: form.city,
//                 // state_name: form.state,
//                 // pin_code: form.pincode,
//                 // profileImage: imageBase64?.base64 ? `data:image/jpeg;base64,${imageBase64.base64}` : '',

//                 "rnb_customer_name": form.fullName,
//                 "rnb_customer_phone_number": form.phone,
//                 "business_category": form.department,
//                 "address_area": form.address,
//                 "location_name": form.city,
//                 // "location_id": 5,
//                 "state_name": form.state,
//                 "pin_code": form.pincode,
//                 //   "rnb_customer_dob": "1990-01-01",
//                 "rnb_customer_photo": imageBase64?.base64 ? `data:image/jpeg;base64,${imageBase64.base64}` : '',
//                 "designation": form.designation,
//                 "company_name": form.company,
//                 "rmb_user_id": userId
//                 //imageBase64 || undefined, // Include base64 image if available
//             };
//             console.log('Submission Data:', submissionData);
//             return;
//             const resp = await api.post('rmb_user_profile_update', submissionData);
//             console.log('Update Response:', resp.data);
//             Alert.alert('Success', 'Profile updated successfully');
//         } catch (error) {
//             console.log('Error updating profile:', error);
//             Alert.alert('Error', 'Failed to update profile');
//         } finally {
//             setLoading1(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#fff" barStyle="dark-content" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Icon name="arrow-left" size={24} color="#0A1F3C" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Account Settings</Text>
//                 <View style={{ width: 24 }} />
//             </View>
//             <View style={styles.hr} />

//             {/* Profile Image */}
//             <View style={styles.avatarContainer}>
//                 <View style={styles.avatarWrapper}>
//                     <Image
//                         source={
//                             imageBase64
//                                 ? { uri: `data:image/jpeg;base64,${imageBase64}` }
//                                 : imageUrl
//                                     ? { uri: imageUrl }
//                                     : require('../../assets/personPlaceholder.jpg')
//                         }
//                         style={styles.avatar}
//                     />
//                     <TouchableOpacity style={styles.cameraOverlay} onPress={handleChoosePhoto}>
//                         <Icon name="camera" size={20} color="#fff" />
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={styles.changePhotoText}>Change Photo</Text>
//             </View>

//             {/* Form */}
//             <ScrollView
//                 style={{ paddingHorizontal: 16, flex: 1 }}
//                 contentContainerStyle={{ paddingBottom: 16 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.formContainer}>
//                     {[
//                         { label: 'Full Name', key: 'fullName', placeholder: 'Enter your full name' },
//                         { label: 'Designation/Title', key: 'designation', placeholder: 'Enter your designation' },
//                         { label: 'Company Name', key: 'company', placeholder: 'Enter your company name' },
//                         { label: 'Business Category', key: 'department', placeholder: 'Enter your department' },
//                         { label: 'Phone Number', key: 'phone', keyboardType: 'numeric', placeholder: 'Enter your phone number', edit: 'false' },
//                         { section: 'Address', placeholder: 'Enter your address' },
//                         { label: 'Address', key: 'address', multiline: true, numberOfLines: 4, placeholder: 'Enter your address' }, // Combined address field
//                         { label: 'City', key: 'city', placeholder: 'Enter your city' },
//                         { label: 'State', key: 'state', placeholder: 'Enter your state' },
//                         { label: 'Pincode', key: 'pincode', keyboardType: 'numeric', placeholder: 'Enter your pincode' },
//                     ].map((field, index) =>
//                         field.section ? (
//                             <Text key={index} style={styles.sectionTitle}>{field.section}</Text>
//                         ) : (
//                             <View key={index}>
//                                 <Text style={styles.label}>{field.label}</Text>
//                                 <TextInput
//                                     style={[styles.input, field.multiline && styles.textArea]}
//                                     value={form[field.key]}
//                                     onChangeText={(text) => handleChange(field.key, text)}
//                                     keyboardType={field.keyboardType || 'default'}
//                                     multiline={field.multiline || false}
//                                     numberOfLines={field.numberOfLines || 1}
//                                     textAlignVertical={field.multiline ? 'top' : 'center'}
//                                     placeholder={field.placeholder}
//                                     placeholderTextColor="#999"
//                                     editable={!field.edit} // Disable editing if 'edit' is false
//                                 />
//                             </View>
//                         )
//                     )}
//                 </View>

//                 {/* Submit Button */}
//                 <TouchableOpacity
//                     style={[commonStyles.blueButton, loading && { opacity: 0.6 }]}
//                     onPress={handleSubmit}
//                     disabled={loading}
//                 >
//                     {
//                         loading1 ? <Loader size='small' color='#fff' /> : (
//                             <Text style={commonStyles.blueButtonText}>{loading ? 'Updating...' : 'Submit'}</Text>
//                         )
//                     }
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 16,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#0A1F3C',
//     },
//     hr: {
//         height: 0.5,
//         backgroundColor: '#ccc',
//     },
//     avatarContainer: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     avatarWrapper: {
//         position: 'relative',
//         width: 110,
//         height: 110,
//         borderRadius: 55,
//         borderWidth: 2,
//         borderColor: '#003399',
//         overflow: 'hidden',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 55,
//     },
//     cameraOverlay: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         height: 30,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     changePhotoText: {
//         marginTop: 10,
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#000',
//     },
//     formContainer: {
//         marginBottom: 30,
//     },
//     label: {
//         marginBottom: 4,
//         color: '#333',
//         fontWeight: '500',
//         fontSize: 14,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#c3d1e6',
//         borderRadius: 10,
//         padding: 12,
//         marginBottom: 15,
//         fontSize: 15,
//         color: '#000',
//     },
//     textArea: {
//         height: 100,
//         paddingTop: 12,
//     },
//     sectionTitle: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginTop: 20,
//         marginBottom: 10,
//         color: '#1c1c1c',
//     },
// });

// export default AccountSettings;



// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { launchImageLibrary } from 'react-native-image-picker';
// import commonStyles from '../../commonstyles/CommonStyles';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import api from '../../utils/api';
// import Loader from '../../components/loader';

// const AccountSettings = () => {
//     const [form, setForm] = useState({
//         fullName: '',
//         designation: '',
//         company: '',
//         department: '',
//         phone: '',
//         address: '',
//         city: '',
//         state: '',
//         pincode: '',
//     });

//     const [errors, setErrors] = useState({});
//     const [imageBase64, setImageBase64] = useState(null);
//     const [imageUrl, setImageUrl] = useState(null);
//     const navigation = useNavigation();
//     const [loading, setLoading] = useState(false);
//     const [loading1, setLoading1] = useState(false);
//     const { userId } = useSelector(state => state.Auth);

//     const FetchedData = async () => {
//         try {
//             setLoading(true);
//             const resp = await api.post('getrnb_customer', { rnb_customer_id: userId });
//             const data = resp.data.data[0];
//             console.log(data, 'account data');

//             setForm({
//                 fullName: data?.rnb_customer_name || '',
//                 designation: data?.designation || '',
//                 company: data?.company_name || '',
//                 department: data?.business_category || '',
//                 phone: data?.rnb_customer_phone_number || '',
//                 address: data?.address_area || '',
//                 city: data?.location_name || '',
//                 state: data?.state_name || '',
//                 pincode: data?.pin_code || '',
//             });

//             if (data?.rnb_customer_photo) {
//                 setImageUrl(data.rnb_customer_photo);
//             }
//         } catch (error) {
//             console.log('Error fetching data:', error);
//             Alert.alert('Error', 'Failed to fetch user data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         FetchedData();
//     }, []);

//     const handleChoosePhoto = () => {
//         launchImageLibrary(
//             {
//                 mediaType: 'photo',
//                 includeBase64: true,
//                 maxWidth: 500,
//                 maxHeight: 500,
//                 quality: 0.7,
//             },
//             (response) => {
//                 if (response.didCancel) return;
//                 if (response.errorCode) {
//                     Alert.alert('Error', 'Failed to pick image: ' + response.errorMessage);
//                     return;
//                 }
//                 if (response.assets && response.assets.length > 0) {
//                     const base64 = response.assets[0].base64;
//                     setImageBase64(base64);
//                     setImageUrl(null);
//                 }
//             }
//         );
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
//         if (!form.phone.trim()) {
//             newErrors.phone = 'Phone Number is required';
//         } else if (!/^\d{10}$/.test(form.phone)) {
//             newErrors.phone = 'Phone Number must be 10 digits';
//         }
//         if (!form.address.trim()) newErrors.address = 'Address is required';
//         if (!form.city.trim()) newErrors.city = 'City is required';
//         if (!form.state.trim()) newErrors.state = 'State is required';
//         if (!form.pincode.trim()) {
//             newErrors.pincode = 'Pincode is required';
//         } else if (!/^\d{6}$/.test(form.pincode)) {
//             newErrors.pincode = 'Pincode must be 6 digits';
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleChange = (key, value) => {
//         setForm({ ...form, [key]: value });
//         if (errors[key]) {
//             setErrors({ ...errors, [key]: null });
//         }
//     };

//     const handleSubmit = async () => {
//         if (!validateForm()) {
//             // Alert.alert('Error', 'Please fix the form errors before submitting');
//             return;
//         }

//         try {
//             setLoading1(true);
//             const submissionData = {
//                 rnb_customer_name: form.fullName,
//                 rnb_customer_phone_number: form.phone,
//                 business_category: form.department,
//                 address_area: form.address,
//                 location_name: form.city,
//                 state_name: form.state,
//                 pin_code: form.pincode,
//                 rnb_customer_photo: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : imageUrl || '',
//                 designation: form.designation,
//                 company_name: form.company,
//                 rmb_user_id: userId,
//                 image_change_ind: imageBase64 ? 1 : 0, // Indicate if the image has changed
//                 rnb_customer_dob:"2000-01-01"

//             };
//             console.log('Submission Data:', submissionData);
//             // return
//             const resp = await api.post('rmb_user_profile_update', submissionData);
//             console.log('Update Response:', resp.data);
//             Alert.alert('Success', 'Profile updated successfully');
//             if(resp.data.status === 200) {
//                 Alert.alert('Success', 'Profile updated successfully');
//             navigation.goBack();
//             await FetchedData();
//             }

//         } catch (error) {
//             console.log('Error updating profile:', error);
//             Alert.alert('Error', 'Failed to update profile');
//         } finally {
//             setLoading1(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="#fff" barStyle="dark-content" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Icon name="arrow-left" size={24} color="#0A1F3C" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Account Settings</Text>
//                 <View style={{ width: 24 }} />
//             </View>
//             <View style={styles.hr} />

//             {/* Profile Image */}
//             <View style={styles.avatarContainer}>
//                 <View style={styles.avatarWrapper}>
//                     <Image
//                         source={
//                             imageBase64
//                                 ? { uri: `data:image/jpeg;base64,${imageBase64}` }
//                                 : imageUrl
//                                     ? { uri: imageUrl }
//                                     : require('../../assets/personPlaceholder.jpg')
//                         }
//                         style={styles.avatar}
//                     />
//                     <TouchableOpacity style={styles.cameraOverlay} onPress={handleChoosePhoto}>
//                         <Icon name="camera" size={20} color="#fff" />
//                     </TouchableOpacity>
//                 </View>
//                 <Text style={styles.changePhotoText}>Change Photo</Text>
//             </View>

//             {/* Form */}
//             <ScrollView
//                 style={{ paddingHorizontal: 16, flex: 1 }}
//                 contentContainerStyle={{ paddingBottom: 16 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.formContainer}>
//                     {[
//                         { label: 'Full Name', key: 'fullName', placeholder: 'Enter your full name' },
//                         { label: 'Designation/Title', key: 'designation', placeholder: 'Enter your designation' },
//                         { label: 'Company Name', key: 'company', placeholder: 'Enter your company name' },
//                         { label: 'Business Category', key: 'department', placeholder: 'Enter your department' },
//                         { label: 'Phone Number', key: 'phone', keyboardType: 'numeric', placeholder: 'Enter your phone number', edit: 'false' },
//                         { section: 'Address', placeholder: 'Enter your address' },
//                         { label: 'Address', key: 'address', multiline: true, numberOfLines: 4, placeholder: 'Enter your address' },
//                         { label: 'City', key: 'city', placeholder: 'Enter your city' },
//                         { label: 'State', key: 'state', placeholder: 'Enter your state' },
//                         { label: 'Pincode', key: 'pincode', keyboardType: 'numeric', placeholder: 'Enter your pincode' },
//                     ].map((field, index) =>
//                         field.section ? (
//                             <Text key={index} style={styles.sectionTitle}>{field.section}</Text>
//                         ) : (
//                             <View key={index} style={styles.inputContainer}>
//                                 <Text style={styles.label}>{field.label}</Text>
//                                 <TextInput
//                                     style={[styles.input, field.multiline && styles.textArea, errors[field.key] && styles.inputError]}
//                                     value={form[field.key]}
//                                     onChangeText={(text) => handleChange(field.key, text)}
//                                     keyboardType={field.keyboardType || 'default'}
//                                     multiline={field.multiline || false}
//                                     numberOfLines={field.numberOfLines || 1}
//                                     textAlignVertical={field.multiline ? 'top' : 'center'}
//                                     placeholder={field.placeholder}
//                                     placeholderTextColor="#999"
//                                     editable={field.edit !== 'false'}
//                                 />
//                                 {errors[field.key] && (
//                                     <Text style={styles.errorText}>{errors[field.key]}</Text>
//                                 )}
//                             </View>
//                         )
//                     )}
//                 </View>

//                 {/* Submit Button */}
//                 <TouchableOpacity
//                     style={[commonStyles.blueButton, loading1 && { opacity: 0.6 }]}
//                     onPress={handleSubmit}
//                     disabled={loading1}
//                 >
//                     {loading1 ? (
//                         <Loader size="small" color="#fff" />
//                     ) : (
//                         <Text style={commonStyles.blueButtonText}>Submit</Text>
//                     )}
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 16,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#0A1F3C',
//     },
//     hr: {
//         height: 0.5,
//         backgroundColor: '#ccc',
//     },
//     avatarContainer: {
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     avatarWrapper: {
//         position: 'relative',
//         width: 110,
//         height: 110,
//         borderRadius: 55,
//         borderWidth: 2,
//         borderColor: '#003399',
//         overflow: 'hidden',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 55,
//     },
//     cameraOverlay: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         height: 30,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     changePhotoText: {
//         marginTop: 10,
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#000',
//     },
//     formContainer: {
//         marginBottom: 30,
//     },
//     inputContainer: {
//         marginBottom: 15,
//     },
//     label: {
//         marginBottom: 4,
//         color: '#333',
//         fontWeight: '500',
//         fontSize: 14,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#c3d1e6',
//         borderRadius: 10,
//         padding: 12,
//         fontSize: 15,
//         color: '#000',
//     },
//     inputError: {
//         borderColor: '#ff0000',
//     },
//     textArea: {
//         height: 100,
//         paddingTop: 12,
//     },
//     sectionTitle: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginTop: 20,
//         marginBottom: 10,
//         color: '#1c1c1c',
//     },
//     errorText: {
//         color: '#ff0000',
//         fontSize: 12,
//         marginTop: 4,
//     },
// });

// export default AccountSettings;


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import Loader from '../../components/loader';
import Toast from 'react-native-toast-message';

const AccountSettings = () => {
    const [form, setForm] = useState({
        fullName: '',
        designation: '',
        company: '',
        department: '',
        phone: '',
        dob: null, // Store DOB as Date object
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [errors, setErrors] = useState({});
    const [imageBase64, setImageBase64] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const { userId } = useSelector(state => state.Auth);

    const FetchedData = async () => {
        try {
            setLoading(true);
            const resp = await api.post('getrnb_customer', { rnb_customer_id: userId });
            const data = resp.data.data[0];
            console.log(data, 'account data');

            setForm({
                fullName: data?.rnb_customer_name || '',
                designation: data?.designation || '',
                company: data?.company_name || '',
                department: data?.business_category || '',
                phone: data?.rnb_customer_phone_number || '',
                dob: data?.rnb_customer_dob ? new Date(data.rnb_customer_dob) : null,
                address: data?.address_area || '',
                city: data?.location_name || '',
                state: data?.state_name || '',
                pincode: data?.pin_code || '',
            });

            if (data?.rnb_customer_photo) {
                setImageUrl(data.rnb_customer_photo);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchedData();
    }, []);

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxWidth: 500,
                maxHeight: 500,
                quality: 0.7,
            },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    Alert.alert('Error', 'Failed to pick image: ' + response.errorMessage);
                    return;
                }
                if (response.assets && response.assets.length > 0) {
                    const base64 = response.assets[0].base64;
                    setImageBase64(base64);
                    setImageUrl(null);
                }
            }
        );
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!form.phone.trim()) {
            newErrors.phone = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = 'Phone Number must be 10 digits';
        }
        if (!form.dob) {
            newErrors.dob = 'Date of Birth is required';
        } else {
            const today = new Date();
            const age = today.getFullYear() - form.dob.getFullYear();
            const monthDiff = today.getMonth() - form.dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < form.dob.getDate())) {
                age--;
            }
            if (age < 18) {
                newErrors.dob = 'You must be at least 18 years old';
            }
        }
        if (!form.address.trim()) newErrors.address = 'Address is required';
        if (!form.city.trim()) newErrors.city = 'City is required';
        if (!form.state.trim()) newErrors.state = 'State is required';
        if (!form.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(form.pincode)) {
            newErrors.pincode = 'Pincode must be 6 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
        if (errors[key]) {
            setErrors({ ...errors, [key]: null });
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('Error', 'Please fix the form errors before submitting');
            return;
        }

        try {
            setLoading1(true);
            const submissionData = {
                rnb_customer_name: form.fullName,
                rnb_customer_phone_number: form.phone,
                business_category: form.department,
                address_area: form.address,
                location_name: form.city,
                state_name: form.state,
                pin_code: form.pincode,
               rnb_customer_photo: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : imageUrl || '',
                designation: form.designation,
                company_name: form.company,
                rmb_user_id: userId,
                image_change_ind: imageBase64 ? 1 : 0,
                rnb_customer_dob: form.dob ? form.dob.toISOString().split('T')[0] : '2000-01-01',
            };
            console.log('Submission Data:', submissionData);
            // return
            const resp = await api.post('rmb_user_profile_update', submissionData);
            console.log('Update Response:', resp.data);
            if (resp.data.status === 200) {
                // Alert.alert('Success', 'Profile updated successfully');
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Profile updated successfully',
                    position: 'top',
                    visibilityTime: 3000,
                });
                navigation.goBack();
                // await FetchedData();
            }
        } catch (error) {
            console.log('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setLoading1(false);
        }
    };


    // Calculate the date 18 years ago from today
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#0A1F3C" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Settings</Text>
                <View style={{ width: 24 }} />
            </View>
            <View style={styles.hr} />

            {/* Profile Image */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={
                            imageBase64
                                ? { uri: `data:image/jpeg;base64,${imageBase64}` }
                                : imageUrl
                                    ? { uri: imageUrl }
                                    : require('../../assets/personPlaceholder.jpg')
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
            <ScrollView
                style={{ paddingHorizontal: 16, flex: 1 }}
                contentContainerStyle={{ paddingBottom: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    {[
                        { label: 'Full Name', key: 'fullName', placeholder: 'Enter your full name' },
                        { label: 'Designation/Title', key: 'designation', placeholder: 'Enter your designation' },
                        { label: 'Company Name', key: 'company', placeholder: 'Enter your company name' },
                        { label: 'Business Category', key: 'department', placeholder: 'Enter your department' },
                        { label: 'Phone Number', key: 'phone', keyboardType: 'numeric', placeholder: 'Enter your phone number', edit: 'false' },
                        { label: 'Date of Birth', key: 'dob', isDate: true, placeholder: 'Select your date of birth' },
                        { section: 'Address', placeholder: 'Enter your address' },
                        { label: 'Address', key: 'address', multiline: true, numberOfLines: 4, placeholder: 'Enter your address' },
                        { label: 'City', key: 'city', placeholder: 'Enter your city' },
                        { label: 'State', key: 'state', placeholder: 'Enter your state' },
                        { label: 'Pincode', key: 'pincode', keyboardType: 'numeric', placeholder: 'Enter your pincode' },
                    ].map((field, index) =>
                        field.section ? (
                            <Text key={index} style={styles.sectionTitle}>{field.section}</Text>
                        ) : field.isDate ? (
                            <View key={index} style={styles.inputContainer}>
                                <Text style={styles.label}>{field.label}</Text>
                                <TouchableOpacity
                                    style={[styles.input, errors[field.key] && styles.inputError]}
                                    onPress={() => setDatePickerVisible(true)}
                                >
                                    <Text style={[styles.inputText, !form.dob && { color: '#999' }]}>
                                        {form.dob ? formatDate(form.dob) : field.placeholder}
                                    </Text>
                                </TouchableOpacity>
                                {errors[field.key] && (
                                    <Text style={styles.errorText}>{errors[field.key]}</Text>
                                )}
                            </View>
                        ) : (
                            <View key={index} style={styles.inputContainer}>
                                <Text style={styles.label}>{field.label}</Text>
                                <TextInput
                                    style={[styles.input, field.multiline && styles.textArea, errors[field.key] && styles.inputError]}
                                    value={form[field.key]}
                                    onChangeText={(text) => handleChange(field.key, text)}
                                    keyboardType={field.keyboardType || 'default'}
                                    multiline={field.multiline || false}
                                    numberOfLines={field.numberOfLines || 1}
                                    textAlignVertical={field.multiline ? 'top' : 'center'}
                                    placeholder={field.placeholder}
                                    placeholderTextColor="#999"
                                    editable={field.edit !== 'false'}
                                />
                                {errors[field.key] && (
                                    <Text style={styles.errorText}>{errors[field.key]}</Text>
                                )}
                            </View>
                        )
                    )}
                </View>

                {/* Date Picker Modal */}
                <DatePicker
                    modal
                    open={datePickerVisible}
                    date={form.dob || new Date()}
                    mode="date"
                    maximumDate={maxDate}
                    onConfirm={(date) => {
                        setDatePickerVisible(false);
                        handleChange('dob', date);
                    }}
                    onCancel={() => setDatePickerVisible(false)}
                />

                {/* Submit Button */}
                <TouchableOpacity
                    style={[commonStyles.blueButton, loading1 && { opacity: 0.6 }]}
                    onPress={handleSubmit}
                    disabled={loading1}
                >
                    {loading1 ? (
                        <Loader size="small" color="#fff" />
                    ) : (
                        <Text style={commonStyles.blueButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0A1F3C',
    },
    hr: {
        height: 0.5,
        backgroundColor: '#ccc',
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
        borderColor: '#003399',
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
    formContainer: {
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 4,
        color: '#333',
        fontWeight: '500',
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#c3d1e6',
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        color: '#000',
    },
    inputText: {
        fontSize: 15,
        color: '#000',
    },
    inputError: {
        borderColor: '#ff0000',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        color: '#1c1c1c',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 12,
        marginTop: 4,
    },
});

export default AccountSettings;