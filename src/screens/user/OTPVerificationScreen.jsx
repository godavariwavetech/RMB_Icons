import React, {useEffect, useRef, useState} from 'react';
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
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import api from '../../utils/api';
import Loader from '../../components/loader';
import {useDispatch} from 'react-redux';
import {requestLoginOtp, setUserId} from '../../redux/reducers/auth';
import CustomModal from '../../components/common/CustomModal';


const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const phone = route.params;
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

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
    if (otp.includes('')) {
      // setError("Please enter all 4 digits of the OTP");
      setModalContent({
        title: 'Missing OTP',
        content: 'Please enter all 4 digits of the OTP to proceed.',
        confirmText: 'Ok',
        onConfirm: onConfirmModal,
      });
      setModalVisible(true);
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
      const resp = await api.post('checkotp', {number: phone, otp: enteredOtp});
      console.log(resp.data, 'RES>>>>');
      if (resp.data.status == 200) {
        dispatch(setUserId(resp.data?.data[0].id));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {name: 'ProfileCard'},
            ],
          }),
        );
        // navigation.replace('ProfileCard');
      } else {
        // setError('Invalid OTP. Please try again.');
        setModalContent({
          title: 'Invalid OTP',
          content: 'The OTP you entered is incorrect. Please try again.',
          confirmText: 'Ok',
          onConfirm: onConfirmModal,
        });
        setModalVisible(true);
      }
    } catch (err) {
      console.log('error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRessendOtp = async () => {
    dispatch(requestLoginOtp(phone));
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const onConfirmModal = () => {
    setModalVisible(false);
    setError('');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={commonStyles.mainColor}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust offset if needed
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Fixed Header */}
          <View style={{padding: 16, alignItems: 'center'}}>
            <Image
              source={require('../../assets/rmbLogo2.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Verificartion</Text>
          </View>

          {/* Card Section */}
          <View style={styles.card}>
            <Text
              style={[
                commonStyles.text1,
                commonStyles.mb24,
                {color: '#3D3D3D'},
              ]}>
              Enter the verification code we just sent on the mobile number{' '}
              {maskPhoneNumber(phone)}
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
                renderItem={({item, index}) => {
                  return (
                    <TextInput
                      key={index}
                      ref={el => (inputRefs.current[index] = el)}
                      style={styles.otpBox}
                      keyboardType="numeric"
                      maxLength={1}
                      value={item}
                      onChangeText={value => handleOTPChange(value, index)}
                      onKeyPress={({nativeEvent}) => {
                        if (
                          nativeEvent.key === 'Backspace' &&
                          !item &&
                          index > 0
                        ) {
                          inputRefs.current[index - 1]?.focus(); // Move back on backspace
                        }
                      }}
                    />
                  );
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

            {timer !== 0 ? (
              <Text style={[styles.timer]}>
                Resend OTP in {`${timer < 10 ? '0' : ''}${timer} s`}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleRessendOtp}>
                <Text style={[styles.timer, {color: commonStyles.mainColor}]}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[commonStyles.blueButton, commonStyles.mt16]}
              onPress={handleVerifyOtp}>
              {loading ? (
                <Loader size="small" color="#fff" />
              ) : (
                <Text style={commonStyles.blueButtonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title={modalContent.title}
        content={modalContent.content}
        confirmText={modalContent.confirmText}
        onConfirm={modalContent.onConfirm}
        showCancelButton={false}
      />
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
    marginLeft: 12,
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
    textAlign: 'center',
  },

  otpContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    width: '100%',
    // marginVertical: 16,
    marginTop: 16,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 20,
  },
});
