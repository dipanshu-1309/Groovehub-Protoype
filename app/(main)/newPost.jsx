import React, { useRef, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import { useAuth } from '../context/AuthContext'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import RichTextEditor from '../../components/RichTextEditor'


const NewPost = () => {

  const {user} = useAuth();
  const bodyRef = useRef("")
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] =  useState(file);
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Create Post" showBackButton={true}/>
          <ScrollView contentContainerStyle={{gap: 20}}>
            {/*avatar */}
            <View style={styles.header}>
              <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}/> 
              <View style={{gap:2}}>
                <Text style={styles.username}>
                  {
                    user && user.name
                  }

                </Text>
                <Text style={styles.publicText}>
                  
                    Text
                  

                </Text>
              </View>
                  
            </View>
            <View style={styles.textEditor}>
                <RichTextEditor editorRef={editorRef} onChange={body=> bodyRef.current = body}/>
            </View>
          </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  username:{
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  container: {
    flex:1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  }
})