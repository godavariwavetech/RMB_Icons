import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actionLogin } from '../redux/reducers/auth';

export default function Login() {
const dispatch = useDispatch();

const login = async() =>{
    await dispatch(actionLogin())
}


  return (
    <View>
      <Text>Login</Text>

      <TouchableOpacity onPress={login} style={{width:"100%",height:50,backgroundColor:"#000",alignItems:"center",justifyContent:"center"}} >
        <Text style={{color:"#fff"}}>Press</Text>
      </TouchableOpacity>
    </View>
  )
}