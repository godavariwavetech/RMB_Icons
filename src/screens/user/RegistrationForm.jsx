

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import commonStyles from '../../commonstyles/CommonStyles';
import axios from 'axios';
import Loader from '../../components/loader';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { pushFcmToken, setUserId } from '../../redux/reducers/auth';
import api from '../../utils/api';

// 📌 Reusable Custom Input with Label
const CustomInput = ({ label, required, placeholder, value, onChangeText, keyboardType = 'default', error, maxLength }) => {
  return (
    <View style={customStyles.inputContainer}>
      <Text style={customStyles.label}>
        {label} {required && <Text style={customStyles.required}>*</Text>}
      </Text>
      {/* <TextInput
        style={[customStyles.input, error && { borderColor: 'red' }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
      /> */}
      {/* <TextInput
        style={[customStyles.input, error && { borderColor: 'red' }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        editable={onChangeText !== undefined} // Make it non-editable for D.O.B
        pointerEvents={onChangeText !== undefined ? 'auto' : 'none'}
      /> */}
      <TextInput
        style={[
          customStyles.input,
          !onChangeText && { color: '#000' }, // make text darker if not editable
          error && { borderColor: 'red' },
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        editable={!!onChangeText}
        pointerEvents={!!onChangeText ? 'auto' : 'none'}
        maxLength={maxLength}
      />

      {error && <Text style={customStyles.error}>{error}</Text>}
    </View>
  );
};

// 📌 Upload Input
// const CustomUploadInput = ({ label, required, value, onPress, error }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={customStyles.inputContainer}>
//       <Text style={customStyles.label}>
//         {label} {required && <Text style={customStyles.required}>*</Text>}
//       </Text>
//       <View style={[customStyles.input, error && { borderColor: 'red' }]}>
//         <Text style={{ color: value ? '#000' : '#999' }}>
//           {value ? 'Photo Selected' : 'Upload Photo'}
//         </Text>
//       </View>
//       {error && <Text style={customStyles.error}>{error}</Text>}
//     </TouchableOpacity>
//   );
// };

// const CustomUploadInput = ({ label, required, value, onPress, error }) => {
//   return (
//     <View style={customStyles.inputContainer}>
//       <Text style={customStyles.label}>
//         {label} {required && <Text style={customStyles.required}>*</Text>}
//       </Text>
//       <TouchableOpacity
//         onPress={onPress}
//         activeOpacity={0.8}
//         style={[
//           customStyles.input,
//           { justifyContent: 'center' },
//           error && { borderColor: 'red' },
//         ]}
//       >
//         <Text style={{ color: value ? '#000' : '#999', fontSize: 15 }}>
//           {value ? 'Photo Selected' : 'Upload Photo'}
//         </Text>
//       </TouchableOpacity>
//       {error && <Text style={customStyles.error}>{error}</Text>}
//     </View>
//   );
// };

const CustomUploadInput = ({ label, required, value, onPress, error }) => {
  return (
    <View style={customStyles.inputContainer}>
      <Text style={customStyles.label}>
        {label} {required && <Text style={customStyles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          customStyles.input, // Reuse exact input styles
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: Platform.OS === 'ios' ? 14 : 0, // Match input padding
          },
          error && { borderColor: 'red' },
        ]}
      >
        <Text style={{ color: value ? '#000' : '#999', fontSize: 15 }}>
          {value ? 'Photo Selected' : 'Upload Photo'}
        </Text>
      </TouchableOpacity>
      {error && <Text style={customStyles.error}>{error}</Text>}
    </View>
  );
};


// 📌 Custom Input Styles
const customStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: 18,
    width: '100%',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontWeight: '600',
    color: '#333',
    fontSize: 13,
    zIndex: 1,
  },
  required: {
    color: 'red',
  },
  // input: {
  //   height: 50,
  //   borderWidth: 1,
  //   borderColor: '#aaa',
  //   borderRadius: 10,
  //   paddingHorizontal: 15,
  //   fontSize: 15,
  //   justifyContent: 'center',
  //   paddingTop: Platform.OS === 'ios' ? 14 : 0,
  // },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    justifyContent: 'center',
    paddingTop: 14, // add vertical space for text consistency
    textAlignVertical: 'center', // ensure vertical alignment
    // backgroundColor:'#fff'
  },

});


export default function RegistrationForm({ route }) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [area, setArea] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');


  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const handleChoosePhoto = () => {
  //   ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
  //     if (response.assets && response.assets.length > 0) {
  //       setPhoto(response.assets[0]);
  //     }
  //   });
  // };

  // const handleChoosePhoto = () => {
  //   ImagePicker.launchImageLibrary(
  //     { mediaType: 'photo', includeBase64: true },
  //     response => {
  //       if (response.assets && response.assets.length > 0) {
  //         setPhoto(response.assets[0]); // contains .uri, .base64, etc.
  //       }
  //     }
  //   );
  // };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (response.assets && response.assets.length > 0) {
          setPhoto(response.assets[0]); // base64 will be included here
        }
      }
    );
  };



  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString('en-GB');
      setDob(formatted);
    }
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date();
    const dobDate = new Date(selectedDate);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (phone.trim().length < 10) newErrors.phone = 'Phone number must be at least 10 digits';
    if (!business.trim()) newErrors.business = 'Business category is required';
    if (!area.trim()) newErrors.area = 'Area is required';
    if (!company.trim()) newErrors.company = 'Company name is required';
    if (!designation.trim()) newErrors.designation = 'Designation is required';

    // if (!dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    } else if (dobDate > eighteenYearsAgo) {
      newErrors.dob = 'Age must be at least 18 years';
    }
    if (!photo) newErrors.photo = 'Photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const formatDateToYYYYMMDD = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  const handleRegister = () => {
    if (validate()) {
      SubmitData();
    }
  };

  const SubmitData = async () => {
    try {
      setLoading(true);
      const payload = {
        "rnb_customer_name": name,
        "rnb_customer_phone_number": phone,
        "business_category": business,
        "address_area": area,
        "rnb_customer_dob": dob,
        "rnb_customer_photo": photo?.base64 ? `data:image/jpeg;base64,${photo.base64}` : '',
        "company_name": company,
        "designation": designation,
      }
      console.log(payload, 'payload');
      // return
      // const resp = await axios.post('https://api.rnbicon.com/public_app/rnb_customer_registration', payload);
      const resp = await api.post('rnb_customer_registration', payload)
      // navigation.navigate('RegistrationSubmittedScreen', name);
      // console.log('Data submitted successfully:', resp.data.data);
      const data = await resp.data
      console.log(data, 'data');
      if (data.status === 200) {
        // alert('Registration successful!');
        dispatch(setUserId(data?.data?.insertId));
        dispatch(pushFcmToken(data?.data?.insertId))
        navigation.navigate('RegistrationSubmittedScreen', name);
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error submitting data:', error);
      Alert.alert('Error submitting data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Calculate the date 18 years ago from today
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);


  useEffect(() => {
    route.params?.mobileNUmber && setPhone(route.params?.mobileNUmber)
    setSelectedDate(maxDate); // Initialize selectedDate to maxDate
  }, [route.params?.afterLogin])

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image source={require('../../assets/rmbLogo3.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Registration Form</Text>
      <Text style={styles.subtitle}>Please Fill In Your Details to Proceed</Text>

      <CustomInput
        label="Your Name"
        required
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
        error={errors.name}
      />
      <CustomInput
        label="Phone Number"
        required
        placeholder="Enter Your Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        error={errors.phone}
        maxLength={10}
      />
      <CustomInput
        label="Business Category"
        required
        placeholder="Enter Your Business Category"
        value={business}
        onChangeText={setBusiness}
        error={errors.business}
      />
      <CustomInput
        label="Company Name"
        required
        placeholder="Enter Your Company Name"
        value={company}
        onChangeText={setCompany}
        error={errors.company}
      />

      <CustomInput
        label="Designation"
        required
        placeholder="Enter Your Designation"
        value={designation}
        onChangeText={setDesignation}
        error={errors.designation}
      />

      <CustomInput
        label="Area"
        required
        placeholder="Enter Your Area"
        value={area}
        onChangeText={setArea}
        error={errors.area}
      />

      {/* D.O.B Input (opens calendar) */}
      {/* <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.9}>
        <CustomInput
          label="D.O.B"
          required
          placeholder="12-05-1972"
          value={dob}
          onChangeText={() => {}}
          error={errors.dob}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )} */}

      {/* D.O.B Field with Date Picker */}
      {/* <TouchableOpacity onPress={() => setOpenDatePicker(true)} activeOpacity={0.9}>
        <CustomInput
          label="D.O.B"
          required
          placeholder="Select D.O.B"
          value={dob}
          onChangeText={() => { }}
          error={errors.dob}
        />
      </TouchableOpacity> */}


      {/* <TouchableOpacity onPress={() => setOpenDatePicker(true)} activeOpacity={0.9}>
        <CustomInput
          label="D.O.B"
          required
          placeholder="Select D.O.B"
          value={dob}
          error={errors.dob}
        />
      </TouchableOpacity> */}


      {/* <View style={customStyles.inputContainer}>
        <Text style={customStyles.label}>
          D.O.B <Text style={customStyles.required}>*</Text>
        </Text>
        <TouchableOpacity
          onPress={() => setOpenDatePicker(true)}
          style={[
            customStyles.input,
            { justifyContent: 'center' },
            errors.dob && { borderColor: 'red' },
          ]}
          activeOpacity={0.8}
        >
          <Text style={{ color: dob ? '#000' : '#999' }}>
            {dob || 'Select D.O.B'}
          </Text>
        </TouchableOpacity>
        {errors.dob && <Text style={customStyles.error}>{errors.dob}</Text>}
      </View> */}

      <View style={customStyles.inputContainer}>
        <Text style={customStyles.label}>
          D.O.B <Text style={customStyles.required}>*</Text>
        </Text>
        <TouchableOpacity
          onPress={() => setOpenDatePicker(true)}
          activeOpacity={0.8}
          style={[
            customStyles.input,
            { justifyContent: 'center', paddingTop: 0 }, // align text center like other inputs
            errors.dob && { borderColor: 'red' },
          ]}
        >
          <Text style={{ color: dob ? '#000' : '#999', fontSize: 15 }}>
            {dob || 'Select Your Date Of Birth'}
          </Text>
        </TouchableOpacity>
        {errors.dob && <Text style={customStyles.error}>{errors.dob}</Text>}
      </View>


      <DatePicker
        modal
        open={openDatePicker}
        date={selectedDate}
        mode="date"
        maximumDate={maxDate}
        onConfirm={(date) => {
          setOpenDatePicker(false);
          setSelectedDate(date);
          // const formatted = date.toLocaleDateString('en-GB'); // Format as DD-MM-YYYY
          // setDob(formatted);
          const formattedForDisplay = date.toLocaleDateString('en-GB'); // for UI
          const formattedForSubmit = formatDateToYYYYMMDD(date);

          setDob(formattedForSubmit);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />



      {/* Upload */}
      <CustomUploadInput
        label="Upload Photo"
        required
        value={photo}
        onPress={handleChoosePhoto}
        error={errors.photo}
      />



      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        {
          loading ? <Loader size='small' color='#fff' /> : (<>
            <Text style={styles.registerText}>Register</Text>
            <Icon name="arrow-forward" size={24} color="#fff" />
          </>)
        }
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={()=>navigation.navigate('ProfileCard')}>
        <Text style={{fontSize:18,fontWeight:'700',color:commonStyles.mainColor,borderBottomWidth:2,borderBottomColor:commonStyles.mainColor,marginTop:8}}>Skip</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

// 📌 Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    width: 137,
    height: 133,
    marginBottom: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 2,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    color: '#000',
    alignSelf: 'flex-start',
    fontWeight: '400',
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: commonStyles.mainColor,
    // padding: 12,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    alignItems: 'center', gap: 10
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "700"
  },
});


