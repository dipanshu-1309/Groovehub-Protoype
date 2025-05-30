import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { hp, wp } from '../../helpers/common';
import { getUserImageSrc, uploadFile } from '../../services/imageService';
import { useAuth } from '../context/AuthContext';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import { Image } from 'expo-image';
import Input from '../../components/input';
import Button from '../../components/Button';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase'; // Make sure this is correct

const EditProfile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    phoneNumber: '',
    image: null,
    bio: '',
    address: ''
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.user_metadata?.name || '',
        phoneNumber: currentUser.user_metadata?.phoneNumber || '',
        image: currentUser.user_metadata?.image || null,
        address: currentUser.user_metadata?.address || '',
        bio: currentUser.user_metadata?.bio || '',
      });
    }
  }, [currentUser]);

  const OnPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0] });
    }
  };

  const updateUser = async (id, data) => {
    const { error } = await supabase
      .from('users')
      .update(data)
      .eq('id', id);

    if (error) {
      console.error("Error updating user:", error);
      return { success: false, error };
    }

    return { success: true };
  };

  const onSubmit = async () => {
    let userData = { ...user };
    const { name, phoneNumber, address, image, bio } = userData;

    if (
      !name.trim() ||
      !phoneNumber.trim() ||
      !address.trim() ||
      !bio.trim() ||
      !image ||
      (typeof image === 'object' && !image.uri)
    ) {
      Alert.alert('Profile', "Please fill all the fields");
      return;
    }

    setLoading(true);

    if (typeof image === 'object') {
      let imageRes = await uploadFile('profiles', image?.uri, true);
      if (imageRes.success) userData.image = imageRes.data;
      else userData.image = null;
    }

    const res = await updateUser(currentUser?.id, userData);
    setLoading(false);

    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    } else {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  let imageSource =
    user.image && typeof user.image === 'object'
      ? user.image.uri
      : getUserImageSrc(user.image);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" showBackButton={true} />

          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon} onPress={OnPickImage}>
                <Icon name="camera" size={20} strokeWidth={2.5} />
              </Pressable>
            </View>

            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>

            <Input
              icon={<Icon name="user" />}
              placeholder="Enter your name"
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />

            <Input
              icon={<Icon name="call" />}
              placeholder="Enter your phone number"
              value={user.phoneNumber}
              onChangeText={(value) =>
                setUser({ ...user, phoneNumber: value })
              }
            />

            <Input
              icon={<Icon name="location" />}
              placeholder="Enter your Address"
              value={user.address}
              onChangeText={(value) => setUser({ ...user, address: value })}
            />

            <Input
              placeholder="Enter your Bio"
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value) => setUser({ ...user, bio: value })}
            />

            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  form: {
    gap: 18,
    marginTop: 20,
  },
  bio: {
    flexDirection: 'row',
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
});
