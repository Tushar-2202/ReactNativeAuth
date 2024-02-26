import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
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
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin'

interface Props {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>
}

interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = ({ navigation }: Props) => {

  const { control, handleSubmit, reset, formState: { errors }, watch, setError } = useForm<FormValues>()
  const passwordMatch = watch(String.password)
  const dispatch = useDispatch()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '543357081350-bd3hh0o3t0sof26juhhj5k44ubpfr1c6.apps.googleusercontent.com',
    });
  }, [])

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;
      const userInfo: UserInfo = {
        uuid: user?.uid,
        name: data.name,
        email: data.email,
        profileImage: null,
        password: data.password,
      };
      database().ref(`users/${user?.uid}`).set(userInfo).then(() => {
        dispatch(addUser(userInfo));
        reset();
        Toast.show({
          type: 'success',
          text1: String.signUpSuccess,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Routes.Authenticated }],
          }),
        );
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError(String.email, { type: 'manual', message: String.emailExitLogin });
      } else if (error.code === 'auth/weak-password') {
        setError(String.password, { type: 'manual', message: String.weakPassword });
      } else {
        Toast.show({
          type: 'error',
          text1: String.signUpError,
          text2: error.message,
        });
      }
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;
      
      const userInfoData: UserInfo = {
        uuid: user?.uid,
        name: userInfo.user.name,
        email: userInfo.user.email,
        profileImage: userInfo.user.photo,
      };

      database().ref(`users/${user?.uid}`).set(userInfoData).then(() => {
        dispatch(addUser(userInfoData));
        reset();
        Toast.show({
          type: 'success',
          text1: String.signUpSuccess,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Routes.Authenticated }],
          }),
        );
      });

    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show({
          type: 'error',
          // text1: String.signInCancelled,
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show({
          type: 'error',
          // text1: String.signInInProgress,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show({
          type: 'error',
          // text1: String.playServiceNotAvailable,
        });
      } else {
        Toast.show({
          type: 'error',
          // text1: String.signInError,
          text2: error.message,
        });
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <Text style={styles.headerText}>{String.createAccount}</Text>
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

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label={String.confirmPasswordLable}
              placeholder={String.confirmPasswordPlaceholder}
              keyboardType='visible-password'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.confirmPassword?.message}
              secureTextEntry={true}
            />
          )}
          name={String.confirmPassword}
          rules={{
            required: { value: true, message: String.confirmPasswordRequired },
            minLength: { value: 4, message: String.invalidConfirmPassword },
            validate: value => value === passwordMatch || String.passwordNotMatch
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>{String.signUp}</Text>
        </TouchableOpacity>

        <View style={styles.alredyAccountContainer}>
          <Text style={styles.alreadyAccount}>{String.alreadyAccount}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.Login)}
          >
            <Text style={styles.alredySignupText}>
              {String.login}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>{String.orSignUp}</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}
            onPress={handleGoogleSignUp}
          >
            <Image source={require('../../assets/Icons/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}

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

export default Signup
