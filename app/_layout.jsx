import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { supabase } from '../lib/supabase'
import { getUserdata } from '../services/userService'
import { LogBox } from 'react-native'



LogBox.ignoreLogs(['Warning: TNodeChildrenRenderer', 'Warning: MemoizedTNodeRenderer','Warning: TRenderEngineProvider'])
const _layout = ()=> {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {
  const {setAuth, setUserData} = useAuth();
  const router = useRouter();

useEffect(()=>{
  supabase.auth.onAuthStateChange((_event, session) => {
    console.log('session user ',session?.user?.id);

    if (session){
      setAuth(session?.user);
      updateUserData(session?.user, session?.user?.email);
      router.replace('/home');
    }else{
      setAuth(null);
      router.replace('/welcome');
    }
    

  })
},[])

  const updateUserData = async (user, email) => {
    let res = await getUserdata(user?.id);
    if(res.success) setUserData(...res.data,email);
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }

      }
    />
  )
}

export default _layout
