import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,StyleSheet, StatusBar,ScrollView,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonstyles/CommonStyles';
import { useNavigation,useRoute } from '@react-navigation/native';


const roles = [
  { id: 1, label: 'Freelancer' },
  { id: 2, label: 'Rental Host' },
  { id: 3, label: 'Freelancer / Rental' },
];
const SelectCategory = () => {
  const [selectedRole, setSelectedRole] = useState();  //roles[0].label
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor:commonStyles.bgColor,flex:1}}>
      <StatusBar backgroundColor={commonStyles.bgColor} barStyle={'dark-content'} />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.container}>
          {/* Logo */}
          <Image source={require('../../assets/title2.png')} style={styles.logo} />

          {/* Title */}
          {/* <Text style={[commonStyles.heading,{alignSelf:'flex-start'}]}>Login Account</Text>
          <Text style={[commonStyles.text2, {lineHeight: 24,alignSelf:'flex-start'}]}>
            Hello, welcome back to our account
          </Text> */}

          {/* Illustration */}
          <Image
            source={require('../../assets/loginImg.png')}
            style={styles.illustration}
          />
        </View>  
   <View style={styles.subContainer}>
      <Text style={styles.title}>Select Your Role</Text>

      {roles.map((role) => (
        <TouchableOpacity
          key={role.id}
          style={[
            styles.option,
            selectedRole === role.label ? (styles.selectedOption) : {},
          ]}
          onPress={() => {setSelectedRole(role.label),console.log(role.label)}}
        >

              {/* Custom Radio Button */}
          <View style={styles.radioContainer}>
            <View style={[styles.radioOuter, selectedRole === role.label ? styles.selectedRadioOuter : {}]}>
              {selectedRole === role.label && <View style={styles.radioInner} />}
            </View>
          </View>

          <Text style={[styles.optionText, selectedRole === role.label ? styles.selectedText : {}]}>
            {role.label}
          </Text>
          {/* <View style={selectedRole == role.label ? styles.radioSelected : styles.radio} />
          <Text style={[commonStyles.heading2,{color:commonStyles.lightColor,lineHeight:18}]}>{role.label}</Text> */}
        </TouchableOpacity>
      ))}

          <TouchableOpacity style={[commonStyles.blueButton,commonStyles.mt16]} onPress={()=>{console.log(selectedRole)}}>
            <Text style={commonStyles.blueButtonText}>Lets Go!</Text>
          </TouchableOpacity>

    {/* </View> */}
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 170,
    height: 101,
    resizeMode: 'contain',
    // marginVertical: 24,
    marginTop: 36,marginBottom:24
  },
  illustration: {
    width: 238,
    height: 210,
    resizeMode: 'cover',
    marginBottom: 20,
  },
 
 
  subContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F8FAFC',
    // alignItems:'flex-start'
    padding:16
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,alignSelf:'flex-start'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: commonStyles.strokeLines,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: commonStyles.mainColor,
    // backgroundColor: '#EFF6FF',
  },
//   radio: {
//     width: 20,
//     height: 20,
//     borderRadius: 9,
//     borderWidth: 2,
//     borderColor: '#D1D5DB',
//     marginRight: 10,
//   },
//   radioSelected: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 5,
//     borderColor: '#2563EB',
//     marginRight: 10,
//   },
  optionText: {
    fontSize: 16,
    fontWeight:'700',
    color:commonStyles.lightColor,
    lineHeight:18
  },
 selectedText:{
    color:commonStyles.mainColor,
 },
  radioContainer: {
    marginRight: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  selectedRadioOuter:{
    borderColor:'#2563EB'
  }

});

export default SelectCategory;



// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const roles = [
//   { id: 1, label: 'Freelancer' },
//   { id: 2, label: 'Rental Host' },
//   { id: 3, label: 'Freelancer / Rental' },
// ];

// const SelectCategory = () => {
//   const [selectedRole, setSelectedRole] = useState(roles[0].label);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Your Role</Text>

//       {roles.map((role) => (
//         <TouchableOpacity
//           key={role.id}
//           style={[
//             styles.option,
//             selectedRole === role.label ? styles.selectedOption : {},
//           ]}
//           onPress={() => setSelectedRole(role.label)}
//         >
//           <View style={selectedRole === role.label ? styles.radioSelected : styles.radio} />
//           <Text style={styles.optionText}>{role.label}</Text>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Lets Go!</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     width: 250,
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 8,
//     marginBottom: 10,
//     backgroundColor: 'white',
//   },
//   selectedOption: {
//     borderColor: '#2563EB',
//     backgroundColor: '#EFF6FF',
//   },
//   radio: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 2,
//     borderColor: '#D1D5DB',
//     marginRight: 10,
//   },
//   radioSelected: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 5,
//     borderColor: '#2563EB',
//     marginRight: 10,
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#2563EB',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default SelectCategory;
