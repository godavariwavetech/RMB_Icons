import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const UpdateModal = ({ visible, onUpdatePress }) => {
  const handleUpdate = async () => {
    try {
      console.log("Open playstore")
      Linking.openURL("https://play.google.com/store/apps/details?id=com.rmbicons&pcampaignid=web_share") // Open Play Store / App Store
    } catch (error) {
      console.log("Play Store link error:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Update Required</Text>
          <Text style={styles.modalText}>
            A new version of the app is available. Please update to continue using the app.
          </Text>
          <TouchableOpacity
            onPress={onUpdatePress || handleUpdate}
            style={styles.updateButton}
          >
            <Text style={styles.buttonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UpdateModal; 