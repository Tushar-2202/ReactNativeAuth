import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UnAuthenticatedNavigatorType } from '../../navigation/UnAuthenticated'
import Routes from '../../navigation/Routes'
import { RootNavigatorType } from '../../navigation/Navigate'
import styles from './style'
import { String } from '../../utils'
import { useForm, Controller } from "react-hook-form";
import InputText from '../../components/UI/InputText'
import { REGEX } from '../../utils/Constant'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { UserInfo, addUser } from '../../redux-toolkit/userSlice'
import { CommonActions } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import AlertModal from '../../components/View/Modal'

interface Props {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
  email: string
  password: string
}

const Login = ({ navigation }: Props) => {

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()
  const [checked, setChecked] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '543357081350-bd3hh0o3t0sof26juhhj5k44ubpfr1c6.apps.googleusercontent.com',
    });
  }, [])

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(data.email, data.password);
      const user: FirebaseAuthTypes.User = userCredential.user!;

      const userInfo: UserInfo = {
        uuid: user.uid,
        email: data.email,
        password: data.password
      }

      dispatch(addUser(userInfo))
      reset()
      Toast.show({
        type: 'success',
        text1: String.loginSuccess
      })
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: Routes.Authenticated }
          ]
        })
      )
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        Toast.show({
          type: 'error',
          text1: String.invalidCredential
        })
      } else {
        Toast.show({
          type: 'error',
          text1: String.loginError,
          text2: error
        })
      }
    }
  }

  const handleModel = () => {
    setVisible(true)
  }

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
      const userInfoDetailed = await GoogleSignin.signIn();

      const userInfo: UserInfo = {
        uuid: userInfoDetailed.user.id,
        name: userInfoDetailed.user.name,
        email: userInfoDetailed.user.email,
        profileImage:userInfoDetailed.user.photo
      }
      dispatch(addUser(userInfo))
      reset()
        
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: Routes.Authenticated }
          ]
        })
      )
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: String.signUpError,
        text2: error
      })
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <Text style={styles.headerText}>{String.welcomeBack}</Text>
        </View>

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

        <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberMe}>
            {/* <Icon
              name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
              color={checked ? Colors.SECONDARY : Colors.DARK}
              onPress={() => setChecked(!checked)}
            />
            <Text style={styles.rememberLabel}>{String.rememberMe}</Text> */}
          </View>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotLabel}>{String.forgotPassword}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>{String.login}</Text>
        </TouchableOpacity>

        <View style={styles.alredyAccountContainer}>
          <Text style={styles.alreadyAccount}>{String.dontHaveAccount}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.Signup)}
          >
            <Text style={styles.alredySignupText}>
              {String.signUp}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>{String.or}</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}
            onPress={onGoogleButtonPress}
          >
            <Image source={require('../../assets/Icons/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}
            onPress={() => handleModel()}
          >
            <Image source={require('../../assets/Icons/apple.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/Icons/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{String.agreeTerms}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login