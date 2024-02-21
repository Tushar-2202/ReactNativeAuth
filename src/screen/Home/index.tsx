import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthenticatedNavigatorType } from '../../navigation/Authenticated'
import { RootNavigatorType } from '../../navigation/Navigate'
import { String } from '../../utils'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux-toolkit/userSlice'
import { CommonActions } from '@react-navigation/native'
import Routes from '../../navigation/Routes'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Toast from 'react-native-toast-message'

interface Props {
  navigation: NativeStackNavigationProp<AuthenticatedNavigatorType & RootNavigatorType>
}

const Home = ({ navigation }: Props) => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '543357081350-bd3hh0o3t0sof26juhhj5k44ubpfr1c6.apps.googleusercontent.com',
    });
  }, [])
  
  const handleLogout = async() => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
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
    <View>
      <Text>Home</Text>

      <Button
        title={String.logOut}
        onPress={handleLogout}
      />
    </View>
  )
}

export default Home