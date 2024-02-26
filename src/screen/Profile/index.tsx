import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UnAuthenticatedNavigatorType } from '../../navigation/UnAuthenticated'
import Routes from '../../navigation/Routes'
import { RootNavigatorType } from '../../navigation/Navigate'
import styles from './style'
import { Colors, String } from '../../utils'
import { useForm, Controller } from "react-hook-form";
import InputText from '../../components/UI/InputText'
import { REGEX } from '../../utils/Constant'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { editUser, logOut } from '../../redux-toolkit/userSlice'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

interface Props {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
  name: string
  email: string
  password: string
}

const Profile = ({ navigation }: Props) => {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>()
  const dispatch = useDispatch()
  const userData = useSelector((state: any) => state.userReducer.userInfo)
  const [profileImage, setProfileImage] = useState<string | undefined>(userData?.profileImage)

  useEffect(() => {
    setValue(String.name, userData.name)
    setValue(String.email, userData.email)
    setValue(String.password, userData.password)
    setProfileImage(userData?.profileImage)
  }, [])

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (response.assets && response.assets[0].uri) {
        const ref = storage().ref(`profileImages/${userData.uuid}`);
        ref.putFile(response.assets[0].uri).then(() => {
          ref.getDownloadURL().then((url) => {
            setProfileImage(url);
          });
        });
      }
    });
  }

  const onSubmit = async (data: any) => {
    const user = auth().currentUser;
    if (userData.name !== data.name || userData.email !== data.email || userData.password !== data.password || profileImage !== userData.profileImage) {
      database().ref(`users/${user?.uid}`).update({
        name: data.name,
        email: data.email,
        password: data.password,
        profileImage
      });
      dispatch(editUser({...data, profileImage}))
      Toast.show({
        type: 'success',
        text1: 'Profile updated',
      });
      navigation.dispatch(CommonActions.navigate(Routes.Home));
    } else {
      Toast.show({
        type: 'error',
        text1: 'No changes',
      });
    }
  }

  const handleLogout = async () => {
    try {
      await auth().signOut()
      await GoogleSignin.signOut()
      dispatch(logOut())
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: Routes.UnAuthenticated }
          ]
        })
      )
      Toast.show({
        type: 'success',
        text1: String.logOutySuccess
      })
    } catch (error: any) {
      console.log('error', error)
    }
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileCenter}>
            {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImage} /> : <Image source={require('../../assets/Images/user.png')} style={styles.profileImage} />}
            <Icon
              name='camera'
              size={25}
              color={Colors.PRIMARY}
              style={styles.cameraIcon}
              onPress={openGallery}
            />
          </View>
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label={String.nameLable}
              placeholder={String.namePlaceholder}
              keyboardType='default'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.name?.message}
            />
          )}
          name={String.name}
          rules={{
            required: { value: true, message: String.nameRequired }
          }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label={String.emailLable}
              placeholder={String.emailPlaceholder}
              keyboardType='email-address'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
            />
          )}
          name={String.email}
          rules={{
            required: { value: true, message: String.emailRequired },
            pattern: { value: REGEX.email, message: String.invalidEmail }
          }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label={String.passwordLable}
              placeholder={String.passwordPlaceholder}
              keyboardType='visible-password'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.password?.message}
              secureTextEntry={true}
            />
          )}
          name={String.password}
          rules={{
            required: { value: true, message: String.passwordRequired },
            minLength: { value: 4, message: String.invalidPassword }
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>{String.editProfile}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>{String.logOut}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default Profile
