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
  const [allMembers, setAllMembers] = useState([]);
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
  const [errors, setErrors] = useState({});


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
        // const filteredMembers = data?.filter(member =>
        //   member.rnb_customer_name?.toLowerCase().includes(searchText.toLowerCase())
        // );
        // console.log(filteredMembers, 'Members');
        // setFilteredMembers(filteredMembers);

        setAllMembers(data); // store all
        setFilteredMembers(data); // initially same
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert(error)
    }
  }
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredMembers([]); // show nothing
    } else {
      const filtered = allMembers.filter(member =>
        member.rnb_customer_name?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  }, [searchText, allMembers]);

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setSearchText('');
    Keyboard.dismiss();
  };
  // [data.to_rmb_name,data.to_details,data.meet_place,data.meet_date,
  //   data.meet_conservation,current_date_time,data.to_id]

  const handleConfirm = async () => {

    const newErrors = {};

    if (!selectedMember && !searchText.trim()) {
      newErrors.to = 'Please select a member';
    }

    if (!to) {
      newErrors.toDetails = 'Please select who the meeting is for';
    }

    if (!where.trim()) {
      newErrors.where = 'Please enter meeting location';
    }

    if (!date) {
      newErrors.date = 'Please select meeting date';
    }

    // if (!topics.trim()) {
    //   newErrors.topics = 'Please enter topics of conversation';
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear previous errors
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
          text2: '1:1 Meeting submitted successfully',
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
        <View style={commonStyles.mb16}>
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
              // if (text === '') {
              setSelectedMember(null); // Clear selected user when search query is cleared
              // }
              if (errors.to) setErrors(prev => ({ ...prev, to: '' }));
            }}
          />
          <Icon name="search" size={22} color={commonStyles.mainColor} style={{ paddingRight: 10 }} />
        </View>
        {errors.to && <Text style={styles.errorText}>{errors.to}</Text>}
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
        {errors.toDetails && <Text style={styles.errorText}>{errors.toDetails}</Text>}

    <View style={{marginBottom:15}}>
        <TextInput
          style={styles.input}
          value={where}
          // onChangeText={setWhere}
          onChangeText={(text) => {
            setWhere(text);
            if (errors.where) setErrors(prev => ({ ...prev, where: '' }));
          }}
          placeholder="Where did you meet?"
          placeholderTextColor="#7D7D7D"
        />
        {errors.where && <Text style={styles.errorText}>{errors.where}</Text>}
    </View>

        <View style={{marginBottom:15}}>
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
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

        </View>

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
           maximumDate={new Date()}
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

      </ScrollView>
      <View style={{margin:16}}>
        <TouchableOpacity style={commonStyles.blueButton} onPress={handleConfirm}>
          {
            loading ? <Loader size='small' color='#fff' /> : (
              <Text style={commonStyles.blueButtonText}>Confirm</Text>
            )
          }
        </TouchableOpacity>
      </View>
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
    // marginBottom: 16,
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
    // marginBottom: 15,
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
  errorText: {
  color: 'red',
  fontSize: 12,
  marginTop: 4,
  marginLeft: 4,
},
});

export default MeetingScreen;
