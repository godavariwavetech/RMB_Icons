import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import commonStyles from '../../commonstyles/CommonStyles';
import Feather from 'react-native-vector-icons/Feather';

const {width, height} = Dimensions.get('window');

const CustomModal = ({
  visible,
  onClose,
  title,
  content,
  onConfirm,
  confirmText,
  cancelText,
  showCancelButton = true,
  customButtonStyles = {},
}) => {
  const {width, height} = Dimensions.get('window');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Handles back button press on Android
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={commonStyles.row}>
            {title && (
              <Text style={[commonStyles.header, {lineHeight: 21}]}>
                {title}
              </Text>
            )}
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 24}}>
            <Text style={[commonStyles.text3, {fontWeight: '400',textAlign:"center"}]}>
              {content}
            </Text>
          </View>

          <View
            style={[
              commonStyles.row,
              {
                marginTop: 24,
                justifyContent: 'center',
                display: 'flex',
                gap: 8,
              },
            ]}>
            {showCancelButton && cancelText && (
              <TouchableOpacity
                style={[commonStyles.smallbutton]}
                onPress={onClose}>
                <Text style={[commonStyles.text5]}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[commonStyles.smallgreenbutton, customButtonStyles]}
              onPress={onConfirm}>
              <Text style={[commonStyles.smallgreenbuttontext]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Keep this line
    zIndex: 999,
    height: height,
    width: width,
  },
  modalContainer: {
    // width: width * 0.5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomModal;
