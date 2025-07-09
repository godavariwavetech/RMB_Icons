import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import Loader from '../../components/loader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { requestLoginOtp } from '../../redux/reducers/auth';

const LoginScreen = () => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);


  const handleRequestOTP =async () => {
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit number');
    } else {
      setError('');
      try {
        setLoading(true)
        const resp = await dispatch(requestLoginOtp(phone))

        // console.log(resp,'>>>>>>>>>>>>>>>>>>>>>>>Response')
        // return
        // const resp = await api.post('getappotp',{number:phone});
        console.log(resp,'RES>>>>');
        // return
        if(resp.payload.status==200){
          navigation.navigate('OTPVerificationScreen',phone);
        } else if (resp.payload.status==201){
          navigation.navigate('RegistrationSubmittedScreen',phone);
        }
        else if(resp.payload.status==202){
          navigation.navigate('RegistrationForm',{afterLogin:true,mobileNUmber:phone});
        }
      } catch (error) {
        console.log('Error',error)
      } finally{
        setLoading(false)
      }
      // Alert.alert('OTP Requested for:', {phone,otp:'1234'});
      // navigation.navigate('OTPVerificationScreen',{phone:phone});
    }
  };

//   const handleRequestOTP = async () => {
//   if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
//     setError('Please enter a valid 10-digit number');
//   } else {
//     setError('');
//     try {
//       setLoading(true);

//       const response = await fetch('https://rmbicons.com:1814/public_app/getappotp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ number: phone }),
//       });

//       const respData = await response.json();
//       console.log(respData, 'RES>>>>');

//       if (respData.status === 200) {
//         navigation.navigate('OTPVerificationScreen', phone);
//       } else if (respData.status === 202) {
//         navigation.navigate('RegistrationForm');
//       }
//     } catch (error) {
//       console.log('Error', error);
//     } finally {
//       setLoading(false);
//     }
//   }
// };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={commonStyles.mainColor} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust offset if needed
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" 
        >
          {/* Fixed Header */}
          <View style={{ padding: 16, alignItems: 'center'}}>
            <Image
              source={require('../../assets/rmbLogo2.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Log In</Text>
          </View>

          {/* Card Section */}
          <View style={styles.card}>
            <Text style={[commonStyles.text1, commonStyles.mb24, { color: '#3D3D3D' }]}>
              Please enter your phone number to continue
            </Text>

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              maxLength={10}
              // onChangeText={text => setPhone(text)}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '')
                setPhone(numericText)
                setError('')
              }}
              value={phone}
              placeholderTextColor={commonStyles.lightColor}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
              style={[commonStyles.blueButton, commonStyles.mt16]}
              onPress={handleRequestOTP}
            >
              {
                loading ? <Loader size='small' color='#fff' /> : (
                  <Text style={commonStyles.blueButtonText}>Request OTP</Text>
                )
              }
            </TouchableOpacity>
        <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('RegistrationForm')}>Sign Up</Text>
      </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.mainColor,
  },
  logo: {
    width: 140,
    height: 136,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft:12
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexGrow: 1, // Ensure card takes available space
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: '#949494',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
   signUpText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    // marginBottom: 16,
    marginTop:'auto'
  },
  signUpLink: {
    color: commonStyles.mainColor,
    // textDecorationLine: 'underline',
  },
});

