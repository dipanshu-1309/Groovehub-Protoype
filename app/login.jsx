import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import Home from '../assets/icons/Home'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'




const Login=()=> {
  const router = useRouter();
  return (
    <ScreenWrapper>
    <StatusBar style="dark" />
    <View style={styles.container}>
      <BackButton router={router}/> 

      {/* welcome text */}
      <Text style={styles.welcomeText}>Hey,</Text>
      <Text style={styles.welcomeText}>Welcome Back</Text>
    </View>
    </ScreenWrapper>
  )
}

export default Login;

const styles = StyleSheet.create({
container: {
    flex:1,
    gap:45,
    paddingHorizontal: wp(5)
},
welcomeText:{
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color:theme.colors.text,
},
form: {
    gap: 25,
},
forgotPassword:{
    textAlign:'right',
    fontWeight: theme.fonts.semibold,
    color: theme.fonts.semibold,
    color: theme.colors.text
},
footer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:5
},
footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6)
}
})
