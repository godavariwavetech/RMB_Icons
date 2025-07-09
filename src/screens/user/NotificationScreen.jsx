import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../../commonstyles/CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  {
    id: '1',
    title: 'Upcoming Tour Reminder',
    description: 'Your tour is scheduled for tomorrow. Get ready for an amazing experience!',
    icon: 'map-marker',
    time:'9.20 am',
    read:false,
    // backgroundColor: '#D6E6FF',
  },
  {
    id: '2',
    title: 'Tour Plan Completed',
    description: 'Your tour has successfully concluded. We hope you had a fantastic time!',
    icon: 'check-circle',
    time:'9.20 am',
    read:true,
    // backgroundColor: '#FFF7E6',
  },
  {
    id: '3',
    title: 'Share Your Experience',
    description: 'Your feedback matters! Rate your recent tour now and help others.',
    icon: 'star',
    time:'9.20 am',
    read:true,
    // backgroundColor: '#FFF5E6',
  },
  {
    id: '4',
    title: 'Payment Reminder',
    description: 'Alex has requested ₹2000 for the completed tour plan. Please clear the dues.',
    icon: 'credit-card',
    time:'9.20 am',
    read:true,
    // backgroundColor: '#E6FFE6',
  },
];

const NotificationItem = ({ item }) => (
  <View style={[styles.notificationContainer, { backgroundColor: item.read ? '#FFF' : '#CFE2F3' }]}> 
    <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
    <View style={styles.textContainer}>
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:6}}>
            <Text style={[commonStyles.text6,{fontSize:14,flex:1,}]}>{item.title}</Text>
            <Text style={[commonStyles.text4,{color:commonStyles.lightColor,flex:0,letterSpacing:0.4}]}>{item.time}</Text>
        </View>
      <Text style={[commonStyles.text3,{color:commonStyles.lightColor}]}>{item.description}</Text>
    </View>
  </View>
);

const NotificationScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <AntDesign name='arrowleft' size={26} color={'#18202E'} />
            </TouchableOpacity>
            <Text style={[commonStyles.heading2,styles.notificationText]}>Notifications</Text>
        </View>
        <View style={styles.notificationHeader}>
            <Text style={[commonStyles.heading2]}>Today</Text>
            <TouchableOpacity onPress={()=>{}}>
                <Text style={[commonStyles.text3,{color:commonStyles.lightColor}]}>Clear Notifications</Text>
            </TouchableOpacity>
        </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:commonStyles.bgColor,
    paddingHorizontal: 16,
  
  },
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:12},
  notificationText:{color:'#18202E',textAlign:'center',position:'absolute',left:0,right:0},
  notificationHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:24,
    marginBottom:16
  },
  notificationContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal:12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth:1,
    borderColor:commonStyles.strokeLines,
    borderRadius:8,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 5,
    flexDirection:'row'
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationScreen;
