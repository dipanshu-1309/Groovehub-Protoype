import React from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';

const  Home = () => {

  const {setAuth} = useAuth();

  const onLogout = async ()=>{
    setAuth(null);
    const {error} = await supabase.auth.signOut();
    if(error){
      Alert.alert('Sign out', "Error signing out!")
    }
  }
  return (
    <ScreenWrapper>
<Text>hello</Text>
<Button title="logout" onPress={onLogout} />
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})