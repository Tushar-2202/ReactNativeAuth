import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthenticatedNavigatorType } from '../../navigation/Authenticated'
import { RootNavigatorType } from '../../navigation/Navigate'
import { String } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../redux-toolkit/userSlice'
import { CommonActions } from '@react-navigation/native'
import Routes from '../../navigation/Routes'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Toast from 'react-native-toast-message'
import auth from '@react-native-firebase/auth'

interface Props {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType & RootNavigatorType>
}

const Home = ({ navigation }: Props) => {

  const dispatch = useDispatch()
  const userInfo = useSelector((state: any) => state.userReducer.userInfo)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '543357081350-bd3hh0o3t0sof26juhhj5k44ubpfr1c6.apps.googleusercontent.com',
    });
  }, [])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home