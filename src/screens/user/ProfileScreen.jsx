// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons

// const ProfileScreen = () => {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header with Linear Gradient */}
//       <LinearGradient
//         colors={['#5D4FE6', '#342C80']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 1 }}
//         style={styles.header}
//       >
//         <View style={styles.headerContent}>
//           <Image
//             source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for profile image
//             style={styles.profileImage}
//           />
//           <Text style={styles.name}>Sachin</Text>
//           <Text style={styles.phone}>+91 9965841257</Text>
//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.editText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>

//       {/* Driver Performance Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>DRIVER PERFORMANCE</Text>
//         <Text style={styles.performanceText}>Excellent Driving! ⭐⭐⭐⭐⭐</Text>
//         <View style={styles.statsContainer}>
//           <View style={styles.stat}>
//             <Text style={styles.statValue}>258</Text>
//             <Text style={styles.statLabel}>Total Rides</Text>
//           </View>
//           <View style={styles.stat}>
//             <Text style={styles.statValue}>4.9★</Text>
//             <Text style={styles.statLabel}>Average Rating</Text>
//           </View>
//         </View>
//         <View style={styles.statsContainer}>
//           <View style={styles.stat}>
//             <Text style={styles.statValue}>96%</Text>
//             <Text style={styles.statLabel}>On-Time Arrivals</Text>
//           </View>
//           <View style={styles.stat}>
//             <Text style={styles.statValue}>132</Text>
//             <Text style={styles.statLabel}>Active Days</Text>
//           </View>
//         </View>
//       </View>

//       {/* General Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>GENERAL</Text>
//         {['Saved Places', 'My Earnings', 'Documents', 'Vehicle Details'].map((item, index) => (
//           <TouchableOpacity key={index} style={styles.menuItem}>
//             <Icon name={getIconName(item)} size={24} color="#5D4FE6" />
//             <Text style={styles.menuText}>{item}</Text>
//             <Icon name="chevron-right" size={24} color="#5D4FE6" />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Earnings Section */}
//       <View style={styles.section}>
//         <TouchableOpacity style={styles.menuItem}>
//           <Icon name="share" size={24} color="#5D4FE6" />
//           <Text style={styles.menuText}>Refer & Earn</Text>
//           <Icon name="chevron-right" size={24} color="#5D4FE6" />
//         </TouchableOpacity>
//       </View>

//       {/* Help & Support Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>HELP & SUPPORT</Text>
//         {['Help & Support', 'About Us', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy'].map((item, index) => (
//           <TouchableOpacity key={index} style={styles.menuItem}>
//             <Icon name={getIconName(item)} size={24} color="#5D4FE6" />
//             <Text style={styles.menuText}>{item}</Text>
//             <Icon name="chevron-right" size={24} color="#5D4FE6" />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// // Helper function to map menu items to icons
// const getIconName = (item) => {
//   switch (item) {
//     case 'Saved Places': return 'place';
//     case 'My Earnings': return 'account-balance-wallet';
//     case 'Documents': return 'description';
//     case 'Vehicle Details': return 'directions-car';
//     case 'Help & Support': return 'help';
//     case 'About Us': return 'info';
//     case 'Terms & Conditions': return 'gavel';
//     case 'Privacy Policy': return 'lock';
//     case 'Refund Policy': return 'money-off';
//     default: return 'info';
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 40,
//     alignItems: 'center',
//   },
//   headerContent: {
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginTop: 10,
//   },
//   phone: {
//     fontSize: 16,
//     color: '#FFF',
//     marginTop: 5,
//   },
//   editButton: {
//     marginTop: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#FFF',
//   },
//   editText: {
//     color: '#FFF',
//     fontSize: 14,
//   },
//   section: {
//     backgroundColor: '#FFF',
//     marginVertical: 10,
//     padding: 15,
//     borderRadius: 10,
//     marginHorizontal: 10,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#888',
//     marginBottom: 10,
//   },
//   performanceText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   stat: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     marginHorizontal: 5,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#888',
//     textAlign: 'center',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEE',
//   },
//   menuText: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//     marginLeft: 10,
//   },
// });

// export default ProfileScreen;






import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import commonStyles from '../../commonstyles/CommonStyles';
import StarRating from '../../components/common/StarRating';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
      {/* Header with Linear Gradient */}
      <LinearGradient
        // colors={['#5D4FE6', '#342C80']}
          colors={['#5D4FE6', '#342C80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?semt=ais_hybrid' }} // Placeholder for profile image
              style={styles.profileImage}
            />
          </View>
          <View style={{ flexDirection: 'column', gap: 8 ,flex:1}}>
            <Text style={styles.name} numberOfLines={1}>Sachin</Text>
            <Text style={styles.phone}>+91 9965841257</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => { }}>
              <Text style={styles.editText}>Edit Profile</Text>
              <Icon name="chevron-right" size={20} color={commonStyles.mainColor} style={styles.chevronIcon} />
            </TouchableOpacity>

          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Driver Performance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Performance</Text>
          <View style={{flexDirection:'row',alignItems:'center',gap:16,marginBottom:16}}>
          <Text style={styles.performanceText}>Excellent Driving!</Text>
          {/* <Text>⭐⭐⭐⭐⭐</Text> */}
          <View>
          <StarRating width={22} gap={6} rating={5} />
          </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Total Rides</Text>
              <Text style={styles.statValue}>258</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Average Rating</Text>
              <Text style={styles.statValue}>4.9★</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>On-Time Arrivals</Text>
              <Text style={styles.statValue}>96%</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Active Days</Text>
              <Text style={styles.statValue}>132</Text>
            </View>
          </View>
        </View>

        {/* General Section */}
          <Text style={[styles.sectionTitle,{marginLeft:16}]}>General</Text>
        <View style={[styles.section,{marginTop:0}]}>
          {['Saved Places','Address', 'My Earnings', 'Documents', 'Vehicle Details'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Icon name={getIconName(item)} size={24} color="#5D4FE6" />
              <Text style={styles.menuText}>{item}</Text>
              <Icon name="chevron-right" size={24} color="#5D4FE6" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Earnings Section */}
                  <Text style={[styles.sectionTitle,{marginLeft:16}]}>Earnings</Text>
        <View style={[styles.section,{marginTop:0}]}>
          <TouchableOpacity style={[styles.menuItem,{borderBottomWidth:0,paddingVertical:0}]}>
            <Icon name="share" size={24} color="#5D4FE6" />
            <Text style={styles.menuText}>Refer & Earn</Text>
            <Icon name="chevron-right" size={24} color="#5D4FE6" />
          </TouchableOpacity>
        </View>

        {/* Help & Support Section */}
          <Text style={[styles.sectionTitle,{marginLeft:16}]}>Help & Support</Text>
        <View style={[styles.section,{marginTop:0}]}>
          {['Help & Support', 'About Us', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Icon name={getIconName(item)} size={24} color="#5D4FE6" />
              <Text style={styles.menuText}>{item}</Text>
              <Icon name="chevron-right" size={24} color="#5D4FE6" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </View>
  );
};

// Helper function to map menu items to icons
const getIconName = (item) => {
  switch (item) {
    case 'Saved Places': return 'bookmark';
    case 'Address': return 'place'
    case 'My Earnings': return 'account-balance-wallet';
    case 'Documents': return 'description';
    case 'Vehicle Details': return 'directions-car';
    case 'Help & Support': return 'help';
    case 'About Us': return 'info';
    case 'Terms & Conditions': return 'gavel';
    case 'Privacy Policy': return 'lock';
    case 'Refund Policy': return 'money-off';
    default: return 'info';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'flex-start', // Align to the left as in the image
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // backgroundColor: '#FFD700', // Yellow background as in the image
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth:1
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    // paddingRight:16,
    // flexWrap:'wrap',
    // marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
    // marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Semi-transparent white background
    padding: 8,
    // paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100'
  },
  editText: {
    color: commonStyles.mainColor,
    fontSize: 12,
    fontWeight: '700',
  },
  chevronIcon: {
    marginLeft: 5,
  },
  section: {
    backgroundColor: '#FFF',
    marginVertical: 24,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 10,
    borderWidth:1,
    borderColor:commonStyles.mainColor
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginBottom: 10,
  },
  performanceText: {
    fontSize: 16,
    fontWeight: '500',
    color: commonStyles.mainColor,
    // marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap:4
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F0EFFF',
    borderRadius: 8,
    // marginHorizontal: 5,
    width:'48%'
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight:'400',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#3D3D3D',
    marginLeft: 10,
    fontWeight:'500'
  },
});

export default ProfileScreen;