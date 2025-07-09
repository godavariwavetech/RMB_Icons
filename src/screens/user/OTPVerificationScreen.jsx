// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import commonStyles from '../../commonstyles/CommonStyles';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Loader from '../../components/loader';
// import { useDispatch, useSelector } from 'react-redux';
// import { actionLogin, loginAction, verifyMobile } from '../../redux/reducers/auth';
// // import AppLogo2 from './svgs/AppLogo2';
// // import LoginAccountImg from './svgs/LoginAccountImg';
// import Icon from 'react-native-vector-icons/AntDesign'
// import { responsiveHeight } from 'react-native-responsive-dimensions';

// const OTPVerificationScreen = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(60);
//   const inputRefs = useRef([]);
//   const [error, setError] = useState('');
//   const [loader, setLoader] = useState(false);
//   const { mobileNumber, loading } = useSelector((state) => state.Auth)

//   const navigation = useNavigation();
//   const route = useRoute();
//   // const {userOtp, phoneNumber} = route.params;
//   const phone = route.params;
//   const dispatch = useDispatch();

// useEffect(() => {
//   const countdown = setInterval(() => {
//     if (timer > 0) {
//       setTimer(timer - 1);
//     } else {
//       clearInterval(countdown);
//     }
//   }, 1000);
//   return () => clearInterval(countdown);
// }, [timer]);

//   // const handleVerifyOtp = async () => {
//   //   if (otp.includes('')) {
//   //     setError('Please enter all 4 digits of the OTP');
//   //     return;
//   //   }
//   //   try {
//   //     const enteredOtp = otp.join('');
//   //     setLoader(true);
//   //     // const response = await dispatch(loginAction({enteredOtp:enteredOtp}))
//   //     dispatch(actionLogin())
//   //     // console.log("?RESPONESE",response.payload)
//   //     // if(response.payload.data.length===0){
//   //     //   setError('Please enter valid OTP');
//   //     // }
//   //   } catch (err) {
//   //     console.log('error', err);
//   //   } finally {
//   //     setLoader(true);
//   //   }
//   // };

//   const handleVerifyOtp = async () => {
//     if (otp.includes("")) {
//       setError("Please enter all 4 digits of the OTP");
//       return;
//     }
//     try {
//       const enteredOtp = otp.join('');
//       setLoader(true);
//       if (enteredOtp == '1234') {
//         // Alert.alert('OTP verified successfully!')
//         console.log('OTP verified successfully!');
//         // dispatch(actionLogin());


//         // navigation.navigate('TabNavigator');
//         navigation.replace('DriverRegistrationScreen');
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     } catch (err) {
//       console.log("error", err)
//     }
//     finally {
//       setLoader(true)
//     }
//   };

//   const handleOTPChange = (value, index) => {
//     let newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     setError('');

//     // Move to the next input field
//     if (value && index < otp.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     // If the input is empty, move back to the previous field
//     if (!value && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const maskPhoneNumber = phone => {
//     if (!phone) return '';
//     return phone.replace(/(\d{2})\d{5}(\d{3})/, '$1*****$2');
//   };

//   // const maskPhoneNumber = number => {
//   //   if (!number) return '';
//   //   return number.replace(/(\d{2})\d{5}(\d{3})/, '$1*****$2');
//   // };

//   const resendOtpHandler = () => {
//     setTimer(60)
//     setOtp(['', '', '', ''])
//     // dispatch(verifyMobile({mobileNumber:mobileNumber}))
//   }

//   return (
//     <SafeAreaView style={{ backgroundColor: commonStyles.bgColor, flex: 1 }}>
//       {/* {loading && <View style={{zIndex:1,position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:"#8080804D"}}>
//       <Loader size='large'  />
//       </View>} */}
//       <StatusBar
//         backgroundColor={commonStyles.bgColor}
//         barStyle={'dark-content'}
//       />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <TouchableOpacity onPress={() => navigation.goBack()} >
//           <Icon name='arrowleft' size={24} color={'#fff'} style={styles.backIcon} />
//         </TouchableOpacity>
//         <View style={styles.container}>
//           {/* Logo */}
//           {/* <Image
//             source={require('../../assets/title2.png')}
//             style={styles.logo}
//           /> */}
//           {/* <View style={{marginVertical:24}}><AppLogo2 /></View> */}

//           {/* Title */}
//           <Text style={[commonStyles.label, { fontWeight: '500', color: '#000',marginBottom:4}]}>Enter Verification code</Text>
//           <View style={{ flexDirection: 'row', gap: 4 ,marginBottom:10}}>
//             <Text style={[commonStyles.text2, { fontWeight: '400', color: '#8f8f8f' },]}> A code has been sent to</Text>
//             {/* <Text style={[commonStyles.text2,]}>{maskPhoneNumber(mobileNumber)}</Text> */}
//                         <Text style={[commonStyles.text2,]}>{maskPhoneNumber(phone)}</Text>
//           </View>

//           {/* Illustration */}
//           {/* <Image source={require('../../assets/loginImg.png')} style={styles.illustration} /> */}
//           {/* <View style={{marginBottom:20}}>
//             <LoginAccountImg />
//           </View> */}

// <View style={styles.otpContainer}>
//   {otp.map((digit, index) => (
//     <TextInput
//       key={index}
//       ref={el => (inputRefs.current[index] = el)}
//       style={styles.otpBox}
//       keyboardType="numeric"
//       maxLength={1}
//       value={digit}
//       onChangeText={value => handleOTPChange(value, index)}
//       onKeyPress={({ nativeEvent }) => {
//         if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
//           inputRefs.current[index - 1]?.focus(); // Move back on backspace
//         }
//       }}
//     />
//   ))}
// </View>
//           {error ? <Text style={styles.errorText}>{error}</Text> : null}

//           <View style={{flexDirection:'row',marginTop:10}}>
//             <Text style={[commonStyles.text2,{fontWeight:'400',color:'#000'}]}>Don't recieve a code? </Text>
//           <TouchableOpacity onPress={resendOtpHandler}>
//             <Text style={styles.resendText}>Resend</Text>
//           </TouchableOpacity>
//           </View>
//           {/* <Text
//             style={[
//               commonStyles.text3,
//               commonStyles.mt16,
//               { lineHeight: 18, alignSelf: 'flex-start' },
//             ]}>{`00:${timer < 10 ? '0' : ''}${timer}(s)`}</Text> */}

//           <TouchableOpacity
//             onPress={handleVerifyOtp}
//             style={[commonStyles.blueButton, { marginTop: responsiveHeight(12) }]}>
//             <Text style={commonStyles.blueButtonText}>Verify</Text>
//           </TouchableOpacity>
//           {/* {timer == 0 && <TouchableOpacity onPress={resendOtpHandler}>
//             <Text style={styles.resendText}>Resend OTP</Text>
//           </TouchableOpacity>} */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     flex: 1,
//     marginTop: responsiveHeight(10)
//   },
//   logo: {
//     width: 123,
//     height: 73,
//     resizeMode: 'cover',
//     marginVertical: 24,
//   },
//   illustration: {
//     width: 238,
//     height: 210,
//     resizeMode: 'cover',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     fontSize: 16,
//     // marginBottom: 16,
//   },

//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     // alignSelf: 'flex-start',
//     marginTop: 8,
//     // marginVertical: 10,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     // justifyContent: "space-between",
//     width: '100%',
//     // marginVertical: 16,
//     marginTop: 16,
//     gap: 16,
//     alignItems:'center',
//     justifyContent:'center'
//   },
//   otpBox: {
//     width: 48,
//     height: 63,
//     borderWidth: 1,
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: 18,
//     backgroundColor: '#F5F9FF',
//     borderColor: commonStyles.mainColor,
//   },
//   timer: {
//     color: 'gray',
//     marginBottom: 20,
//     alignSelf: 'start',
//   },
//   resendText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: commonStyles.mainColor,
//     textAlign: 'center',
//   },
//   backIcon: {
//     backgroundColor: commonStyles.mainColor,
//     width: '32',
//     borderRadius: 5,
//     textAlign: 'center',
//     margin: 16
//     // paddingHorizontal:6
//   }
// });

// export default OTPVerificationScreen;







import React, { useEffect, useRef, useState } from 'react';
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
  FlatList,
} from 'react-native';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../utils/api';
import Loader from '../../components/loader';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/reducers/auth';


const OTPVerificationScreen = () => {

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const  phone  = route.params;
  const dispatch = useDispatch();

  // console.log(comingOtp,'comingOtp')

  const handleRequestOTP = () => {
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit number');
    } else {
      setError('');
      Alert.alert('OTP Requested for:', phone);
      navigation.navigate('OTPVerificationScreen');
    }
  };

  const maskPhoneNumber = phone => {
    if (!phone) return '';
    return phone.replace(/(\d{2})\d{5}(\d{3})/, '$1*****$2');
  };

  const handleOTPChange = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Move to the next input field
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If the input is empty, move back to the previous field
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerifyOtp = async () => {
    if (otp.includes("")) {
      setError("Please enter all 4 digits of the OTP");
      return;
    }
    try {
      const enteredOtp = otp.join('');
      setLoading(true);
      // if (enteredOtp == '1234') {
      //   // Alert.alert('OTP verified successfully!')
      //   console.log('OTP verified successfully!');
      //   // dispatch(actionLogin());
      //   // navigation.navigate('TabNavigator');
      //   navigation.replace('RegistrationForm');
      // } else {
      //   setError('Invalid OTP. Please try again.');
      // }
      const resp = await api.post('checkotp', {number:phone,otp: enteredOtp });
      console.log(resp.data, 'RES>>>>');
      if (resp.data.status == 200) {
        dispatch(setUserId(resp.data?.data[0].id))
        navigation.replace('ProfileCard');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.log("error", err)
    }
    finally {
      setLoading(false)
    }
  };

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
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Image
              source={require('../../assets/rmbLogo2.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Verificartion</Text>
          </View>

          {/* Card Section */}
          <View style={styles.card}>
            <Text style={[commonStyles.text1, commonStyles.mb24, { color: '#3D3D3D' }]}>
              Enter the verification code we just sent on the mobile number {maskPhoneNumber(phone)}
            </Text>

            {/* <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              maxLength={10}
              // onChangeText={text => setPhone(text)}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '')
                setPhone(numericText),
                  setError('')
              }}
              value={phone}
              placeholderTextColor={commonStyles.lightColor}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null} */}

            <View style={styles.otpContainer}>
              <FlatList
                data={otp}
                horizontal
                contentContainerStyle={styles.otpContainer}
                // style={styles.otpContainer}
                renderItem={({ item, index }) => {
                  return <TextInput
                    key={index}
                    ref={el => (inputRefs.current[index] = el)}
                    style={styles.otpBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={item}
                    onChangeText={value => handleOTPChange(value, index)}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && !item && index > 0) {
                        inputRefs.current[index - 1]?.focus(); // Move back on backspace
                      }
                    }}
                  />
                }}
              />
              {/* {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  style={styles.otpBox}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={value => handleOTPChange(value, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                      inputRefs.current[index - 1]?.focus(); // Move back on backspace
                    }
                  }}
                />
              ))} */}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {
              timer !== 0 ? (
                <Text style={[styles.timer]}>
                  Resend OTP in {`${timer < 10 ? '0' : ''}${timer} s`}
                </Text>
              ) : (
                <TouchableOpacity onPress={() => { }}>
                  <Text style={[styles.timer, { color: commonStyles.mainColor }]}>Resend OTP</Text>
                </TouchableOpacity>
              )
            }

            <TouchableOpacity
              style={[commonStyles.blueButton, commonStyles.mt16]}
              onPress={handleVerifyOtp}
            >
              {
                loading ? <Loader size='small' color='#fff' /> : (
                  <Text style={commonStyles.blueButtonText}>Verify OTP</Text>
                )
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OTPVerificationScreen;

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
    marginLeft: 12
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexGrow: 1, // Ensure card takes available space
  },

  error: {
    color: '#949494',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '400',
    // alignSelf: 'flex-start',
    marginTop: 16,
    textAlign: 'center'
  },



  otpContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    width: '100%',
    // marginVertical: 16,
    marginTop: 16,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  otpBox: {
    width: 50,
    height: 62,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#F5F9FF',
    borderColor: commonStyles.mainColor,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    // marginBottom: 16,
  },
  timer: {
    // alignSelf: 'flex-start',
    fontWeight: '700',
    marginBottom: 12,
    fontSize: 16,
    color: '#3D3D3D',
    textAlign: 'center',
    marginTop: 20
  },
});
