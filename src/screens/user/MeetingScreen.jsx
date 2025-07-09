// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-date-picker';
// import Icon from 'react-native-vector-icons/Octicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import commonStyles from '../../commonstyles/CommonStyles';

// const MeetingScreen = () => {
//   const [toSearch, setToSearch] = useState('');
//   const [to, setTo] = useState('Myself');
//   const [where, setWhere] = useState('');
//   const [topics, setTopics] = useState('');
//   const [date, setDate] = useState(new Date('2025-07-04T10:27:00')); // Updated to current date and time
//   const [open, setOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleConfirm = () => {
//     // Handle confirm action
//     console.log('Confirmed:', { toSearch, to, where, date, topics });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>1:1 Meeting</Text>
//       <View style={{ flex: 1 }}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             value={toSearch}
//             onChangeText={setToSearch}
//             placeholder="Search To :"
//             placeholderTextColor='#7D7D7D'
//           />
//           <Icon name="search" size={22} color={commonStyles.mainColor} style={{ paddingRight: 10 }} />
//         </View>
//         <DropDownPicker
//           open={open}
//           value={to}
//           items={[
//             { label: 'Myself', value: 'Myself' },
//             { label: 'Someone Else', value: 'Someone Else' },
//           ]}
//           setOpen={setOpen}
//           setValue={setTo}
//           style={styles.dropdown}
//           dropDownContainerStyle={{ borderColor:commonStyles.mainColor, borderRadius: 8 }}
//         />
//         <TextInput
//           style={styles.input}
//           value={where}
//           onChangeText={setWhere}
//           placeholder="Where did you meet?"
//           placeholderTextColor='#7D7D7D'
//         />
//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <View style={styles.dateContainer}>
//             <Text>{date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
//             {/* <Text style={styles.icon}>📅</Text> */}
//             <Ionicons name='calendar-outline' size={22} color={commonStyles.mainColor} />
//           </View>
//         </TouchableOpacity>
//         <DatePicker
//           modal
//           mode="datetime"
//           open={showDatePicker}
//           date={date}
//           onConfirm={(selectedDate) => {
//             setDate(selectedDate);
//             setShowDatePicker(false);
//           }}
//           onCancel={() => setShowDatePicker(false)}
//         />
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           value={topics}
//           onChangeText={setTopics}
//           placeholder="Topics of Conversation"
//           multiline
//           numberOfLines={4}
//           placeholderTextColor='#7D7D7D'
//         />
//       </View>
//       <TouchableOpacity style={commonStyles.blueButton} onPress={handleConfirm}>
//         <Text style={commonStyles.blueButtonText}>Confirm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     marginBottom: 15,
//     backgroundColor: "#fff"
//     // height: 40, // Matches other fields
//     // paddingVertical:10
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//   },
//   searchIcon: {
//     padding: 10,
//     fontSize: 16,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     // height: 40, // Reduced to match search field
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     // height: 40, // Reduced to match search field
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   icon: {
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#1DA1F2',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default MeetingScreen;





// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-date-picker';
// import Icon from 'react-native-vector-icons/Octicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Picker } from 'react-native-wheel-pick';
// import commonStyles from '../../commonstyles/CommonStyles';

// const MeetingScreen = () => {
//   const [toSearch, setToSearch] = useState('');
//   const [to, setTo] = useState('Myself');
//   const [where, setWhere] = useState('');
//   const [topics, setTopics] = useState('');
//   const [date, setDate] = useState(new Date('2025-07-04T10:27:00'));
//   const [open, setOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showWheelPicker, setShowWheelPicker] = useState(false);

//   // Sample list of members for the wheel picker
//   const members = [
//     { label: 'John Doe', value: 'John Doe' },
//     { label: 'Jane Smith', value: 'Jane Smith' },
//     { label: 'Alice Johnson', value: 'Alice Johnson' },
//     { label: 'Bob Williams', value: 'Bob Williams' },
//     { label: 'Emma Brown', value: 'Emma Brown' },
//   ];

//   // Filter members based on search input
//   const filteredMembers = members.filter(member =>
//     member.label.toLowerCase().includes(toSearch.toLowerCase())
//   );

//   const handleConfirm = () => {
//     console.log('Confirmed:', { toSearch, to, where, date, topics });
//   };

//   const handleMemberSelect = (value) => {
//     setToSearch(value);
//     setShowWheelPicker(false); // Hide picker after selection
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>1:1 Meeting</Text>
//       <View style={{ flex: 1 }}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             value={toSearch}
//             onChangeText={setToSearch}
//             placeholder="Search To :"
//             placeholderTextColor="#7D7D7D"
//             onFocus={() => setShowWheelPicker(true)} // Show wheel picker on focus
//           />
//           <Icon name="search" size={22} color={commonStyles.mainColor} style={{ paddingRight: 10 }} />
//         </View>

//         {/* Wheel Picker for Member Selection */}
//         {showWheelPicker && (
//           <View style={styles.wheelPickerContainer}>
//             <Picker
//               style={styles.wheelPicker}
//               selectedValue={toSearch}
//               pickerData={filteredMembers.map(member => member.label)}
//               onValueChange={handleMemberSelect}
//               itemStyle={{ color: '#000', fontSize: 18 }}
//             />
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setShowWheelPicker(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <DropDownPicker
//           open={open}
//           value={to}
//           items={[
//             { label: 'Myself', value: 'Myself' },
//             { label: 'Someone Else', value: 'Someone Else' },
//           ]}
//           setOpen={setOpen}
//           setValue={setTo}
//           style={styles.dropdown}
//           dropDownContainerStyle={{ borderColor: commonStyles.mainColor, borderRadius: 8 }}
//         />
//         <TextInput
//           style={styles.input}
//           value={where}
//           onChangeText={setWhere}
//           placeholder="Where did you meet?"
//           placeholderTextColor="#7D7D7D"
//         />
//         <TouchableOpacity
//           style={styles.input}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <View style={styles.dateContainer}>
//             <Text>
//               {date.toLocaleString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit',
//               })}
//             </Text>
//             <Ionicons name="calendar-outline" size={22} color={commonStyles.mainColor} />
//           </View>
//         </TouchableOpacity>
//         <DatePicker
//           modal
//           mode="datetime"
//           open={showDatePicker}
//           date={date}
//           onConfirm={(selectedDate) => {
//             setDate(selectedDate);
//             setShowDatePicker(false);
//           }}
//           onCancel={() => setShowDatePicker(false)}
//         />
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           value={topics}
//           onChangeText={setTopics}
//           placeholder="Topics of Conversation"
//           multiline
//           numberOfLines={4}
//           placeholderTextColor="#7D7D7D"
//         />
//       </View>
//       <TouchableOpacity style={commonStyles.blueButton} onPress={handleConfirm}>
//         <Text style={commonStyles.blueButtonText}>Confirm</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   wheelPickerContainer: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     marginBottom: 15,
//     maxHeight: 200, // Limit height for scrollable list
//   },
//   wheelPicker: {
//     height: 150,
//     width: '100%',
//   },
//   cancelButton: {
//     padding: 10,
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   cancelButtonText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
// });

// export default MeetingScreen;




// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-date-picker';
// import Icon from 'react-native-vector-icons/Octicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import Modal from 'react-native-modal';
// import commonStyles from '../../commonstyles/CommonStyles';

// const MeetingScreen = () => {
//   const [toSearch, setToSearch] = useState('');
//   const [to, setTo] = useState('Myself');
//   const [where, setWhere] = useState('');
//   const [topics, setTopics] = useState('');
//   const [date, setDate] = useState(new Date('2025-07-04T10:27:00'));
//   const [open, setOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

//   // Sample list of members
//   const members = [
//     { label: 'John Doe', value: 'John Doe' },
//     { label: 'Jane Smith', value: 'Jane Smith' },
//     { label: 'Alice Johnson', value: 'Alice Johnson' },
//     { label: 'Bob Williams', value: 'Bob Williams' },
//     { label: 'Emma Brown', value: 'Emma Brown' },
//   ];

//   // Filter members based on search input
//   const filteredMembers = members.filter(member =>
//     member.label.toLowerCase().includes(toSearch.toLowerCase())
//   );

//   const handleConfirm = () => {
//     console.log('Confirmed:', { toSearch, to, where, date, topics });
//   };

//   const handleMemberSelect = (value) => {
//     setToSearch(value);
//     setModalVisible(false); // Close modal after selection
//   };

//   const renderMemberItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.memberItem}
//       onPress={() => handleMemberSelect(item.value)}
//     >
//       <Text style={styles.memberText}>{item.label}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => { }}>
//           <Feather name='arrow-left' size={24} color={'#0A1F3C'} />
//         </TouchableOpacity>
//         <Text style={styles.headerLabel}>1:1 Meeting</Text>
//       </View>
//       <View style={styles.hr} />
//       <View style={{ padding: 16, flex: 1 }}>
//         {/* <Text style={styles.header}>1:1 Meeting</Text> */}
//         <View style={{ flex: 1, marginTop: 8 }}>
//           <View style={styles.searchContainer}>
//             <TextInput
//               style={styles.searchInput}
//               value={toSearch}
//               onChangeText={setToSearch}
//               placeholder="Search To :"
//               placeholderTextColor="#7D7D7D"
//               onFocus={() => setModalVisible(true)} // Show modal on focus
//             />
//             <Icon name="search" size={22} color={commonStyles.mainColor} style={{ paddingRight: 10 }} />
//           </View>

//           {/* Modal for Member Selection */}
//           <Modal
//             isVisible={isModalVisible}
//             onBackdropPress={() => setModalVisible(false)}
//             style={styles.modal}
//             animationIn="slideInUp"
//             animationOut="slideOutDown"
//           >
//             <View style={styles.modalContent}>
//               <TextInput
//                 style={styles.modalSearchInput}
//                 value={toSearch}
//                 onChangeText={setToSearch}
//                 placeholder="Search members..."
//                 placeholderTextColor="#7D7D7D"
//                 autoFocus
//               />
//               <FlatList
//                 data={filteredMembers}
//                 renderItem={renderMemberItem}
//                 keyExtractor={(item) => item.value}
//                 style={styles.memberList}
//                 ListEmptyComponent={<Text style={styles.noResultsText}>No members found</Text>}
//                 showsVerticalScrollIndicator={false}
//               />
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </Modal>

//           <DropDownPicker
//             open={open}
//             value={to}
//             items={[
//               { label: 'Myself', value: 'Myself' },
//               { label: 'Someone Else', value: 'Someone Else' },
//             ]}
//             setOpen={setOpen}
//             setValue={setTo}
//             style={styles.dropdown}
//             dropDownContainerStyle={{ borderColor: commonStyles.mainColor, borderRadius: 8 }}
//           />
//           <TextInput
//             style={styles.input}
//             value={where}
//             onChangeText={setWhere}
//             placeholder="Where did you meet?"
//             placeholderTextColor="#7D7D7D"
//           />
//           <TouchableOpacity
//             style={styles.input}
//             onPress={() => setShowDatePicker(true)}
//           >
//             <View style={styles.dateContainer}>
//               <Text>
//                 {date.toLocaleString('en-US', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit',
//                 })}
//               </Text>
//               <Ionicons name="calendar-outline" size={22} color={commonStyles.mainColor} />
//             </View>
//           </TouchableOpacity>
//           <DatePicker
//             modal
//             mode="datetime"
//             open={showDatePicker}
//             date={date}
//             onConfirm={(selectedDate) => {
//               setDate(selectedDate);
//               setShowDatePicker(false);
//             }}
//             onCancel={() => setShowDatePicker(false)}
//           />
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             value={topics}
//             onChangeText={setTopics}
//             placeholder="Topics of Conversation"
//             multiline
//             numberOfLines={4}
//             placeholderTextColor="#7D7D7D"
//           />
//         </View>
//         <TouchableOpacity style={commonStyles.blueButton} onPress={handleConfirm}>
//           <Text style={commonStyles.blueButtonText}>Confirm</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   searchInput: {
//     flex: 1,
//     padding: 10,
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   modal: {
//     justifyContent: 'flex-end',
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   modalSearchInput: {
//     borderWidth: 1,
//     borderColor: '#94ABCB',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//   },
//   memberList: {
//     maxHeight: 300, // Limit list height for scrolling
//   },
//   memberItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#94ABCB',
//   },
//   memberText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   noResultsText: {
//     fontSize: 16,
//     color: '#7D7D7D',
//     textAlign: 'center',
//     padding: 20,
//   },
//   cancelButton: {
//     padding: 10,
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   cancelButtonText: {
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

//   header: {
//     // flex:1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     padding: 16,
//     alignItems: 'center'
//   },
//   headerLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#0A1F3C",
//     flex: 1, textAlign: 'center'
//   },
//   hr: {
//     // height: 0.5,
//     // backgroundColor: "#7D7D7D",
//     borderWidth:0.5,
//     borderColor:'#7D7D7D'
//   }
// });

// export default MeetingScreen


import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, FlatList, Keyboard,
  Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import Loader from '../../components/loader';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const MeetingScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [to, setTo] = useState('Myself');
  const [where, setWhere] = useState('');
  const [topics, setTopics] = useState('');
  const [date, setDate] = useState(new Date('2025-07-04T10:27:00'));
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector(state => state.Auth);
  const navigation = useNavigation();

  const members = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Williams' },
    { id: 5, name: 'Emma Brown' },
    { id: 6, name: 'Rajiv' },
    { id: 7, name: 'Rajiv Chand' },
    { id: 6, name: 'Rajiv Kakara' },
    { id: 7, name: 'Rajiv K' }
  ];

  // const filteredMembers = members.filter(member =>
  //   member.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  // Utility function to format date to YYYY-MM-DD
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getAllMembers()
  }, []);
  const getAllMembers = async () => {
    try {
      const resp = await api.get('gettotalregisterd');
      const data = await resp.data.data || [];
      console.log(data[0], 'data')
      if (resp.data.status == 200) {
        const filteredMembers = data?.filter(member =>
          member.rnb_customer_name?.toLowerCase().includes(searchText.toLowerCase())
        );
        // console.log(filteredMembers, 'Members');
        setFilteredMembers(filteredMembers);
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert(error)
    }
  }

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setSearchText('');
    Keyboard.dismiss();
  };
  // [data.to_rmb_name,data.to_details,data.meet_place,data.meet_date,
  //   data.meet_conservation,current_date_time,data.to_id]

  const handleConfirm = async () => {
    console.log('Confirm:', {
      to: selectedMember ? selectedMember.name : searchText,
      where,
      date,
      topics
    });
    const formattedDate = formatDateToYYYYMMDD(date)
    const payload = {
      to_rmb_name: selectedMember ? selectedMember.rnb_customer_name : searchText,
      to_id: selectedMember?.id,
      meet_conservation: topics,
      to_details: to,
      meet_place: where,
      meet_date: formattedDate,
      // current_date_time:date,
      user_id: userId
    }
    console.log(payload, 'payload');
    // console.log(date)
    // return
    try {
      setLoading(false);
      const resp = await api.post('rmb_onetoone', payload);
      console.log(resp.data, 'Response');
      if (resp.data.status == 200) {
        // Alert.alert('Submitted Successfully')
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'submitted Successfully.',
          position: 'top',
          visibilityTime: 3000,
        });
        navigation.goBack()
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(true)
    }
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Feather name='arrow-left' size={24} color={'#0A1F3C'} />
        </TouchableOpacity>
        <Text style={styles.headerLabel}>1:1 Meeting</Text>
      </View>
      <View style={styles.hr} />

      <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search To:"
            placeholderTextColor="#7D7D7D"
            style={styles.searchInput}
            value={selectedMember ? selectedMember.rnb_customer_name : searchText}
            // onChangeText={(text) => {
            //   setSearchText(text);
            //   setSelectedMember(null);
            // }}
            onChangeText={(text) => {
              setSearchText(text);
              if (text === '') {
                setSelectedMember(null); // Clear selected user when search query is cleared
              }
            }}
          />
          <Icon name="search" size={22} color={commonStyles.mainColor} style={{ paddingRight: 10 }} />
        </View>

        {searchText && !selectedMember && (
          <View style={styles.dropdown}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
              {filteredMembers?.length > 0 ? (
                filteredMembers?.map(member => (
                  <TouchableOpacity
                    key={member.id}
                    style={styles.dropdownItem}
                    onPress={() => handleMemberSelect(member)}
                  >
                    <Text style={styles.memberText}>{member.rnb_customer_name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResultsText}>No members found</Text>
              )}
            </ScrollView>
          </View>
        )}

        <DropDownPicker
          open={open}
          value={to}
          items={[
            { label: 'Myself', value: 'Myself' },
            { label: 'Someone Else', value: 'Someone Else' },
          ]}
          setOpen={setOpen}
          setValue={setTo}
          style={[styles.dropdownPicker]}
          dropDownContainerStyle={{ borderColor: commonStyles.mainColor, borderRadius: 8 }}
        />

        <TextInput
          style={styles.input}
          value={where}
          onChangeText={setWhere}
          placeholder="Where did you meet?"
          placeholderTextColor="#7D7D7D"
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.dateContainer}>
            <Text>
              {date.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Ionicons name="calendar-outline" size={22} color={commonStyles.mainColor} />
          </View>
        </TouchableOpacity>

        <DatePicker
          modal
          mode="datetime"
          open={showDatePicker}
          date={date}
          onConfirm={(selectedDate) => {
            setDate(selectedDate);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          value={topics}
          onChangeText={setTopics}
          placeholder="Topics of Conversation"
          multiline
          numberOfLines={4}
          placeholderTextColor="#7D7D7D"
        />

        <TouchableOpacity style={commonStyles.blueButton} onPress={handleConfirm}>
          {
            loading ? <Loader size='small' color='#fff' /> : (
              <Text style={commonStyles.blueButtonText}>Confirm</Text>
            )
          }
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A1F3C',
    flex: 1,
    textAlign: 'center',
  },
  hr: {
    borderWidth: 0.3,
    borderColor: '#7D7D7D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#94ABCB',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  dropdown: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 6,
    // backgroundColor: '#fff',
    // marginBottom: 12,
    // paddingVertical: 4,
    // paddingHorizontal: 10,
    // maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 2,
    maxHeight: 200, // limit height to 200px
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  dropdownItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  noResultsText: {
    padding: 8,
    color: '#999',
    textAlign: 'center',
  },
  // memberText: {
  //   fontSize: 16,
  //   color: '#000',
  // },
  dropdownPicker: {
    borderWidth: 1,
    borderColor: '#94ABCB',
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#94ABCB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MeetingScreen;
