import { SafeAreaView,StyleSheet, Text, View,Image, TouchableOpacity,StatusBar } from 'react-native'
import React from 'react'
import commonStyles from '../../commonstyles/CommonStyles'
import AppLogo1 from './svgs/AppLogo1'
// import GetStartedImg from './svgs/GetStartedImg'

const LoginSignUpPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:commonStyles.bgColor,padding:16}}>
        <StatusBar backgroundColor={commonStyles.bgColor} barStyle={"dark-content"} />
      <View style={commonStyles.column}>
        {/* <Image source={require('../../assets/title2.png')} /> */}
        {/* <AppLogo1 /> */}
        {/* <View style={{paddingHorizontal:16,marginHorizontal:16,resizeMode:'contain'}}><GetStartedImg /></View> */}
        
        <Image source={require('../../assets/loginSignupImg.png')} style={{width:'100%', resizeMode:'contain',height:'290'}} />
        <View style={{gap:12}}>
            <Text style={[commonStyles.label,{lineHeight:20}]}>Log in to continue your journey.</Text>
            <Text style={[commonStyles.text1,{lineHeight:23}]}>Unlock your next adventure--log in to explore!</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('LoginPage')}} style={[commonStyles.blueButton]}>
            <Text style={commonStyles.blueButtonText}>GetStarted</Text>
        </TouchableOpacity>
        {/* <View style={{flexDirection:'row',gap:19}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('LoginPage')}} style={[commonStyles.blueButton,{flex:6/12}]}>
            <Text style={commonStyles.blueButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('OTPVerificationScreen')}} style={[commonStyles.blueButton,{flex:6/12,backgroundColor:'#fff',borderWidth:1,borderColor:commonStyles.blueColor}]}>
            <Text style={[commonStyles.blueButtonText,{color:commonStyles.blueColor}]}>Register</Text>
        </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  )
}

export default LoginSignUpPage

const styles = StyleSheet.create({

})