import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, Button, Pressable, FlatList } from 'react-native'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import { useRouter } from 'expo-router';
import Avatar from '../../components/Avatar';
import { fetchPosts } from '../../services/PostService';
import PostCard from '../../components/PostCard';

var limit = 0;
const  Home = () => {

  const {user, setAuth} = useAuth();
  const router = useRouter();

  const[posts, setPosts] = useState([]);
  
  useEffect(()=>{
    getPosts();
  },[])

  const getPosts = async()=>{
    //call tha api here
    limit = limit + 10;
    let res = await fetchPosts(limit);
    if(res.success){
      setPosts(res.data);
    }
  }
 // console.log('user: ', user);
  

  // const onLogout = async ()=>{
  //   setAuth(null);
  //   const {error} = await supabase.auth.signOut();
  //   if(error){
  //     Alert.alert('Sign out', "Error signing out!")
  //   }
  // }
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/*header */}
        <View style={styles.header}>
          <Text style={styles.title}>GrooveHub</Text>
          <View style={styles.icons}>
            <Pressable onPress={()=>router.push('notifications')}>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={()=>router.push('newPost')}>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={()=>router.push('profile')}>
              <Avatar 
                  uri={user?.image}
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{borderWidth: 2}}
              />

            
            </Pressable>
          </View>
        </View>

        {/* posts */}
        <FlatList
        data={posts}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={item=> item.id.toString()}
        renderItem={({item}) => <PostCard
            item={item}
            currentUser={user}
            router={router}
            />
      } 
      />
      </View> 
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
      flex: 1,
      //paddingHorizontal: wp(4)
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginHorizontal: wp(4)
  },
  title: {
      color: theme.colors.text,
      fontSize: hp(3.2),
      fontWeight: theme.fonts.bold
  },
  avatarImage: {
      height: hp(4.3),
      width: hp(4.3),
      borderRadius: theme.radius.sm,
      borderColor: theme.colors.gray,
      borderWidth: 3,
      borderCurve: 'continuous'
  },
  icons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap:18  
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4)
},
noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text
},
pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight
},
pillText: {
    color: 'white',
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold
},
listStyle:{
  paddingTop:20,
  paddingHorizontal: wp(4)
}
});
