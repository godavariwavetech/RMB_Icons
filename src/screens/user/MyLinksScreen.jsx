
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Loader from '../../components/loader';
import commonStyles from '../../commonstyles/CommonStyles';
import { responsiveHeight } from 'react-native-responsive-dimensions';

// Extract domain name from URL as fallback label
const getLabelFromUrl = (url) => {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    const name = hostname.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Custom Link';
  }
};

const MyLinksScreen = ({ navigation }) => {
  const [links, setLinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', or 'delete'
  const [modalLink, setModalLink] = useState({ label: '', url: '', platform_id: null, index: null });
  const [modalErrors, setModalErrors] = useState({});
  const { userId } = useSelector(state => state.Auth);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {

      getALLLinks();
    }, [userId])
  );

        const getALLLinks = async () => {
        try {
          setLoading(true);
          const resp = await api.post('getsocialmedialinks', { user_id: userId });
          const data = resp.data.data || [];
          console.log(data, 'Fetched links data');
          const formattedLinks = data.map(link => ({
            id: link.id,
            platform_id: link.id,
            label: link.platform_name,
            url: link.platform_url,
            type: 'custom', // Treat all fetched links as custom for simplicity
          }));
          setLinks(formattedLinks);
        } catch (error) {
          console.log('Error fetching links:', error);
          Alert.alert('Error', 'Failed to fetch links');
        }finally{
          setLoading(false);
        }
      };

  const handleAddCustomLink = () => {
    setModalLink({ label: '', url: '', platform_id: null, index: null });
    setModalMode('add');
    setModalErrors({});
    setModalVisible(true);
  };

  const handleEditLink = (index,item) => {
    const link = links[index];
    setModalLink(item);
    setModalMode('edit');
    setModalErrors({});
    setModalVisible(true);
  };

  const handleDeleteLink = (index) => {
    const link = links[index];
    setModalLink({ ...link, index });
    setModalMode('delete');
    setModalErrors({});
    setModalVisible(true);
  };

  const handleModalChange = (field, value) => {
    setModalLink({ ...modalLink, [field]: value });
    if (modalErrors[field]) {
      setModalErrors({ ...modalErrors, [field]: null });
    }
  };

  const validateModal = () => {
    const newErrors = {};
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

    if (!modalLink.label.trim()) {
      newErrors.label = 'Platform name is required';
    }
    if (!modalLink.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!urlRegex.test(modalLink.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    setModalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleModalSubmit = async () => {
//     if (modalMode === 'delete') return;
//     if (!validateModal()) return;

//     try {
//       const submissionData = {
//         platform_name: modalLink.label || getLabelFromUrl(modalLink.url) || 'Custom Link',
//         platform_url: modalLink.url,
//         rmb_user_id: userId,
//         ...(modalMode === 'edit' && modalLink.platform_id ? { platform_id: modalLink.platform_id } : {}),
//       };

//       const apiEndpoint = modalMode === 'edit' ? 'update_rmb_customer_social_media' : 'post_rmb_customer_social_media';
//       const resp = await api.post(apiEndpoint, submissionData);
//       console.log(submissionData, 'Link submission data');
// console.log(resp.data,'Response from API');
//       const { index } = modalLink;
//       const newLink = {
//         id: resp.data.id || Date.now(),
//         platform_id: resp.data.platform_id || modalLink.platform_id || Date.now(),
//         label: modalLink.label || getLabelFromUrl(modalLink.url) || 'Custom Link',
//         url: modalLink.url,
//         type: 'custom',
//       };

//       if (index !== null) {
//         const updatedLinks = [...links];
//         updatedLinks[index] = newLink;
//         setLinks(updatedLinks);
//       } else {
//         setLinks([...links, newLink]);
//       }

//       setModalVisible(false);
//       Toast.show({
//         type: 'success',
//         text1: 'Success',
//         text2: modalMode === 'edit' ? 'Link updated successfully' : 'Link added successfully',
//         position: 'top',
//         visibilityTime: 3000,
//       });
//       //Alert.alert('Success', modalMode === 'edit' ? 'Link updated successfully' : 'Link added successfully');
//     } catch (error) {
//       console.log(`Error ${modalMode === 'edit' ? 'updating' : 'adding'} link:`, error);
//       Alert.alert('Error', `Failed to ${modalMode === 'edit' ? 'update' : 'add'} link`);
//     }
//   };


const handleModalSubmit = async () => {
  if (modalMode === 'delete') return;
  if (!validateModal()) return;

  try {
    const newData = {
      platform_name: modalLink.label || getLabelFromUrl(modalLink.url) || 'Custom Link',
      platform_url: modalLink.url,
      rmb_user_id: userId,
      ...(modalMode === 'edit' && modalLink.platform_id ? { platform_id: modalLink.platform_id } : {}),
    };
  
    console.log(modalLink, 'Modal link data');
        const { index } = modalLink;
    const newLink = {
      rmb_user_id:userId , // Use API-provided id if available
      platform_id: modalLink.platform_id , // Use API-provided platform_id
      platform_name: modalLink.label,
      platform_url: modalLink.url,
    };

    
    
    const submissionData =  modalMode === 'edit' ? newLink:newData
    console.log(submissionData," New link data");

    const apiEndpoint = modalMode === 'edit' ? 'update_rmb_customer_social_media' : 'post_rmb_customer_social_media';
    const resp = await api.post(apiEndpoint, submissionData);
    console.log(submissionData, 'Link submission data');
    console.log(resp.data, 'Response from API');



    // if (index !== null) {
    //   const updatedLinks = [...links];
    //   updatedLinks[index] = newLink;
    //   setLinks(updatedLinks);
    // } else {
    //   setLinks([...links, newLink]);
    // }

    setModalVisible(false);
    getALLLinks()
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: modalMode === 'edit' ? 'Link updated successfully' : 'Link added successfully',
      position: 'top',
      visibilityTime: 3000,
    });
  } catch (error) {
    console.log(`Error ${modalMode === 'edit' ? 'updating' : 'adding'} link:`, error);
    Alert.alert('Error', `Failed to ${modalMode === 'edit' ? 'update' : 'add'} link`);
  }
};
  const handleModalDelete = async () => {
    if (modalMode !== 'delete') return;

    try {
      if (modalLink.platform_id) {
        const data={
           platform_id: modalLink.platform_id,
          rmb_user_id: userId,
        }
        console.log(data, 'Delete link data');
        // return
        await api.post('delete_rmb_customer_social_media', {
          platform_id: modalLink.platform_id,
          rmb_user_id: userId,
        });
      }

      const updatedLinks = [...links];
      updatedLinks.splice(modalLink.index, 1);

      getALLLinks()

      // setLinks(updatedLinks);

      setModalVisible(false);
      // Alert.alert('Success', 'Link deleted successfully');
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Link deleted successfully',
        position: 'top',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log('Error deleting link:', error);
      Alert.alert('Error', 'Failed to delete link');
    }
  };

  const handleSubmit = async () => {
    try {
      for (const link of links) {
        const submissionData = {
          platform_name: link.label || getLabelFromUrl(link.url) || 'Link',
          platform_url: link.url,
          rmb_user_id: userId,
          ...(link.platform_id ? { platform_id: link.platform_id } : {}),
        };
        await api.post('post_rmb_customer_social_media', submissionData);
      }
      Alert.alert('Success', 'Links updated successfully');
      navigation.goBack();
    } catch (error) {
      console.log('Error submitting links:', error);
      Alert.alert('Error', 'Failed to update links');
    }
  };

  if(loading){
    return(
      <Loader size='large' color={commonStyles.mainColor} style={{ flex: 1 }} />
    )
  }

  const handleLinkNavigation = (itemUrl) => {
    const url = itemUrl?.toString();
    console.log(url, 'Link URL',typeof(url));
    // return
          // const url = 'https://www.linkedin.com/in/rajivnani/'; // replace with actual
          Linking.openURL(url).catch(() =>
              Alert.alert('Error', 'Unable to open this Link.')
          );
      };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrow-left" size={24} color={'#0A1F3C'} />
        </TouchableOpacity>
        <Text style={styles.headerLabel}>My Links</Text>
      </View>
      <View style={styles.hr} />

      <View style={{flex:1,paddingHorizontal:16}}>

        { links.length === 0 && (
          <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(20)}}>
            <Text style={{fontSize:16,color:'#555'}}>No links added yet.</Text>
          </View>
        )}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {links.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.labelRow}>
              <Icon name="link" size={20} color="#555" style={{ marginRight: 8 }} />
              <Text style={styles.labelText}>{item.label || getLabelFromUrl(item.url) || 'Custom Link'}</Text>
              <View style={styles.iconRow}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditLink(index,item)}>
                  <Icon name="edit" size={18} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteLink(index)}>
                  <Icon name="trash-2" size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity  onPress={()=>handleLinkNavigation(item.url)}>
              <Text style={styles.urlText}>{item.url}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* <TouchableOpacity style={styles.addButton} onPress={handleAddCustomLink}>
          <Icon name="plus-circle" size={18} color="#007AFF" />
          <Text style={styles.addText}> Add New</Text>
        </TouchableOpacity> */}

      </ScrollView>
          <TouchableOpacity style={[commonStyles.blueButton,{flexDirection:'row',alignItems:'center',gap:10,marginBottom:16}]} onPress={handleAddCustomLink}>
            <Icon name="plus-circle" size={18} color="#FFF" />
            <Text style={commonStyles.blueButtonText}> Add New</Text>
          </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {modalMode === 'delete' ? (
              <>
                <Text style={styles.modalTitle}>Delete Link</Text>
                <Text style={styles.modalMessage}>
                  Are you sure you want to delete the link "{modalLink.label || getLabelFromUrl(modalLink.url) || 'Custom Link'}"?
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText,{color:'red'}]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.deleteButtonModal]} onPress={handleModalDelete}>
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>{modalMode === 'edit' ? 'Edit Link' : 'Add New Link'}</Text>
                <View style={styles.modalInputContainer}>
                  <Text style={styles.label}>Platform Name</Text>
                  <TextInput
                    style={[styles.input, modalErrors.label && styles.inputError]}
                    placeholder="Enter platform name"
                    value={modalLink.label}
                    onChangeText={(text) => handleModalChange('label', text)}
                    placeholderTextColor='#999'
                  />
                  {modalErrors.label && <Text style={styles.errorText}>{modalErrors.label}</Text>}
                </View>
                <View style={styles.modalInputContainer}>
                  <Text style={styles.label}>Link URL</Text>
                  <TextInput
                    style={[styles.input, modalErrors.url && styles.inputError]}
                    placeholder="Enter URL"
                    value={modalLink.url}
                    onChangeText={(text) => handleModalChange('url', text)}
                    placeholderTextColor='#999'
                  />
                  {modalErrors.url && <Text style={styles.errorText}>{modalErrors.url}</Text>}
                </View>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText,{color:'red'}]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyLinksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  scroll: {
    // padding: 16,
    paddingBottom: 10,
    paddingTop:12
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0A1F3C',
  },
  urlText: {
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F0F2F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DADDE1',
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
  },
  deleteButtonModal: {
    backgroundColor: '#FF3B30',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 4,
  },
  addText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
    marginLeft: 6,
  },
  updateButton: {
    backgroundColor: '#003D91',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  updateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DADADA',
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A1F3C',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  hr: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A1F3C',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DADDE1',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#003D91',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    // backgroundColor: '#FF3B30',
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:'red'
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});