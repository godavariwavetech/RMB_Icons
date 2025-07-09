import { StyleSheet, Text, View ,SafeAreaView,TouchableOpacity,} from 'react-native'
import React from 'react';
import commonStyles from '../../commonstyles/CommonStyles'

const ButtonsComponent = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:commonStyles.bgColor}}>
        <View style={styles.cardbutton}>
          {/* Accept Booking Button */}
          <TouchableOpacity onPress={()=>{}} style={commonStyles.blueButton}>
            <Text style={commonStyles.blueButtonText}>Accept Booking</Text>
          </TouchableOpacity>
          {/* Message Traveler Button */}
          <TouchableOpacity onPress={()=>{}} style={[commonStyles.blueButton,styles.button,{borderColor:commonStyles.strokeLines}]}>
            <Text style={[commonStyles.blueButtonText,{color:'#4B5563'}]}>Message Traveller</Text>
          </TouchableOpacity>
          {/* Decline Booking Button */}
          <TouchableOpacity onPress={()=>{}} style={[commonStyles.blueButton,styles.button,{borderColor:'#FF0000'}]}>
            <Text style={[commonStyles.blueButtonText,{color:'#FF0000'}]}>Decline Booking</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ButtonsComponent

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#fff',
        borderWidth:1,
      },
      card: {
        backgroundColor: '#fff',
        padding:14,
        borderRadius:8,
        borderWidth:1,
        borderColor:commonStyles.strokeLines,
      },
      cardbutton: {
        gap:16,
        marginBottom:16,paddingHorizontal:16
      },
})