import { SafeAreaView,StyleSheet, Text, View,Image, TouchableOpacity,StatusBar,Platform } from 'react-native'
import React from 'react'
import commonStyles from '../../commonstyles/CommonStyles'
// import AppLogo1 from './svgs/AppLogo1'

const GetStartedScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:commonStyles.bgColor,padding:16}}>
      
        <StatusBar backgroundColor={commonStyles.bgColor} barStyle={"dark-content"} translucent={false} hidden={false} />
      <View style={commonStyles.column}>
        {/* <Image source={require('../../assets/title2.png')} /> */}
        {/* <AppLogo1 /> */}
        <Image source={require('../../assets/getStartedImg.png')} style={{width:'100%', resizeMode:'contain',height:'290'}} />
        <View style={{gap:12}}>
            <Text style={[commonStyles.label,{lineHeight:20}]}>Welcome to Escapeye</Text>
            <Text style={[commonStyles.text1,{lineHeight:23}]}>Your gateway to unforgettable experiences. Discover,plan,and escape like never before.</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('LoginSignUpPage')}} style={commonStyles.blueButton}>
            <Text style={commonStyles.blueButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default GetStartedScreen
