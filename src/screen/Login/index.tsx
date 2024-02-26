import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UnAuthenticatedNavigatorType } from '../../navigation/UnAuthenticated';
import Routes from '../../navigation/Routes';
import { RootNavigatorType } from '../../navigation/Navigate';
import styles from './style';
import { String } from '../../utils';
import { useForm, Controller } from 'react-hook-form';
import InputText from '../../components/UI/InputText';
import { REGEX } from '../../utils/Constant';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { UserInfo, addUser } from '../../redux-toolkit/userSlice';
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';

interface Props {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType & RootNavigatorType>;
}

interface FormValues {
  email: string;
  password: string;
}

const Login = ({ navigation }: Props) => {
  const { control, handleSubmit, reset, formState: { errors }, setError } = useForm<FormValues>();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '543357081350-bd3hh0o3t0sof26juhhj5k44ubpfr1c6.apps.googleusercontent.com',
    });
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;

      console.log('user login', user);

      const userRef = database().ref(`users/${user?.uid}`);
      userRef.once('value', (snapshot) => {
        if (snapshot.val()?.password !== data.password) {
          database().ref(`users/${user?.uid}`).update({
            password: data.password,
          });
        }
        if (snapshot.exists()) {
          const userInfo: UserInfo = {
            uuid: user?.uid,
            name: snapshot.val().name,
            email: snapshot.val().email,
            profileImage: snapshot.val()?.profileImage,
            password: data?.password,
          };
          dispatch(addUser(userInfo));
          reset();
          Toast.show({
            type: 'success',
            text1: String.loginSuccess,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Routes.Authenticated }],
            }),
          );
        } else {
          Toast.show({
            type: 'error',
            text1: String.userNotFound,
          });
        }
      });
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        Toast.show({
          type: 'error',
          text1: String.invalidCredential,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: String.loginError,
          text2: error.message,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      const userRef = database().ref(`users/${user?.uid}`);

      userRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
          const userInfoData: UserInfo = {
            uuid: user?.uid,
            name: snapshot.val().name,
            email: snapshot.val().email,
            profileImage: snapshot.val()?.profileImage ? snapshot.val().profileImage : userInfo.user.photo,
            password: snapshot.val()?.password,
          };
          dispatch(addUser(userInfoData));
          reset();
          Toast.show({
            type: 'success',
            text1: String.loginSuccess,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Routes.Authenticated }],
            }),
          );
        } else {
          Toast.show({
            type: 'error',
            text1: String.userNotFound,
          });
        }
      });

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: String.loginError,
        text2: error.message,
      });
      GoogleSignin.revokeAccess();
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
            pattern: { value: REGEX.email, message: String.invalidEmail },
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
            minLength: { value: 4, message: String.invalidPassword },
          }}
        />

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.ForgotPassword)}>
            <Text style={styles.forgotLabel}>{String.forgotPassword}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{String.login}</Text>
        </TouchableOpacity>

        <View style={styles.alredyAccountContainer}>
          <Text style={styles.alreadyAccount}>{String.dontHaveAccount}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Signup)}>
            <Text style={styles.alredySignupText}>{String.signUp}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>{String.orLogin}</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Image source={require('../../assets/Icons/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/Icons/apple.png')} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/Icons/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

