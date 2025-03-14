import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable} from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/common'
import { getUserImageSrc } from '../../services/imageService'
import { useAuth } from '../context/AuthContext'

import { theme } from '../../constants/theme'
import Icon from '../../assets/icons'
import { Image } from 'expo-image'
import Input from '../../components/input'


const EditProfile = () => {

  const {user} = useAuth();

  const OnPickImage = async ()=>{

  }


  let imageSource = getUserImageSrc(user.image);

  return (
    <ScreenWrapper bg="white" >
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <Header title="Edit Profile" showBackButton={true}/>

          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon} onPress={OnPickImage}>
                <Icon name="camera" size={20} strokeWidth={2.5} />
              </Pressable>
            </View> 
             <Text style={{fontsize: hp(1.5), color: theme.colors.text}}> Please fill your profile details  </Text>
             <Input
                  icon={<Icon name="user" />}
                  placeholder='Enter your name'
                  value={null}
                  onChangeText={value=> {}}
                  />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4)
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColpr: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffest: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7 
  },
  avatarContainer:{
    height: hp(14),
    width: hp(14),
    alignSelf: 'center'
  } ,
  avatar: {
    width:'100%',
    height: '100%',
    borderRadius: theme.radius.xxl*1.8,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.darkLight
  },
  form: {
    gap:18,
    marginTop: 20,
  }

})
