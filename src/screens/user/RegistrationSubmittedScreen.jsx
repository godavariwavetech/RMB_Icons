import React ,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Alert,Modal } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import commonStyles from '../../commonstyles/CommonStyles';

const RegistrationSubmittedScreen = ({ navigation, route }) => {
  const name = route?.params; // Default fallback

  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
    // navigation.navigate('Home'); // Uncomment if needed
  };

  const handleDonePress = () => {
    // navigation.goBack(); // or navigation.navigate('Home');
    // Alert.alert(
    //   "Registration Submitted",
    //   "Your registration has been submitted successfully. Please wait for the confirmation from our team."
    // )
    setModalVisible(true);
  };
  const handleNavigation=()=>{
                navigation.replace('LoginPage');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor='#fff' />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.headerText}>Thank you, {name}</Text>

        {/* Replace with your own local or remote image */}
        <Image
          source={require('../../assets/greetImg2.png')} // <- Replace with your image path
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Your registration request has been{'\n'}
          submitted to the Admin for approval. You’ll{'\n'}
          be notified once it has been reviewed.
        </Text>
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={handleDonePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={commonStyles.blueButton} onPress={handleNavigation}>
        <Text style={commonStyles.blueButtonText}>Done</Text>
      </TouchableOpacity>

      {/* Custom Modal Alert */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registration Submitted</Text>
            <Text style={styles.modalMessage}>
              Your registration has been submitted successfully. Please wait for the confirmation from our team.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegistrationSubmittedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 30,
    color: '#000',
    marginTop: responsiveHeight(5)
  },
  image: {
    width: responsiveWidth(99), // Adjust width as needed
    height: 262,
    marginBottom: 30,
    marginTop: responsiveHeight(8),
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    // marginBottom: 40,
    lineHeight: 24,
    fontWeight: '400',
  },
  button: {
    backgroundColor: commonStyles.mainColor, // navy blue
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: commonStyles.mainColor || '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

});
