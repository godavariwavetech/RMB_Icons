import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CustomTitle = ({name}) => {
  return (
    <View style={styles.titleView}>
      <Text style={[styles.title]}>{name}</Text>
    </View>
  );
};

export const CustomBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('it is working');
        if (navigation.canGoBack()) {
          // Add this check
          navigation.goBack();
        } else {
          // If there's nowhere to go back to, you might want to navigate to a default screen
          navigation.navigate('Home'); // Example: Navigate to 'Home'
        }
      }}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={styles.touchable}>
      <View style={styles.backView}>
        <Ionicons name="arrow-back" size={25} />
      </View>
    </TouchableOpacity>
  );
};
export const CustomTabBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('it is working');
        navigation.navigate('TabNavigator');
      }}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={styles.touchable}>
      <View style={styles.backView}>
        <Ionicons name="arrow-back" size={25} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.28,
    textAlign:"center",
  },
  backView: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    alignItems:"center",
    justifyContent:"center",
    flex:1,
    width:250,
  },
  touchable: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
