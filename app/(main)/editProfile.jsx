import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { wp } from '../../helpers/common'
import { getUserImageSrc } from '../../services/imageService'
import { useAuth } from '../context/AuthContext'
import { Image } from 'expo-image'


const EditProfile = () => {

  const {user} = useAuth();
  let imageSource = getUserImageSrc(user.image);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <Header title="Edit Profile" />

          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
            </View>
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
  }
})
