import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from '../constants/theme'
import Avatar from './Avatar'
import { hp , wp } from '../helpers/common'
import moment from 'moment'
import Icon from '../assets/icons'
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image'
import { getSupabseFileUrl } from '../services/imageService'

const textStyle = {
  colors: theme.colors.dark,
  fontSize: hp(1.75)
};

const tagStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark
  },
  h4:{
      color: theme.colors.dark

  }
}

const PostCard = ({
  item,
  currentUser,
  router,
  hasShadow = true,
}) => {
    const shadowStyles = {
      shadowOffset: {
        width:0,
        height:2
      },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 1
    }
    


  const createdAt= moment(item?.created_at).format('MMM D');
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        {/*user info and post time */}
        <View style={styles.userInfo}>
        <Avatar
        size={hp(4.5)}
        uri={item?.user?.image}
        rounded={theme.radius.md} />
        <View style={{gap: 2}}>
          <Text style={styles.username}>{item?.user?.name}</Text>
          <Text style={styles.postTime}>{createdAt}</Text>
        </View>
        </View>

        <TouchableOpacity  /*</View>onPress={openPostDetails}*/>
          <Icon name="threeDotsHorizontal" size={hp(3.4)} strokeWidth ={3} colors={theme.colors.text} />
        </TouchableOpacity>
      </View>
      {/*post body & media*/}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {
            item?.body && (
              <RenderHtml
                contentWidth={wp(100)}
                source={{html: item?.body}} 
                tagStyles={tagStyles}
                />
            )
          }
        </View>

        {
          item?.file && item?.file?.includes('postImages') && (
            <Image
              source={getSupabseFileUrl(item?.file)}
              transition={100}
              style={styles.postMedia}
              contentFit='cover'
              />
          )
        }
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl*1.1,
    borderCurve: 'continuous',
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})