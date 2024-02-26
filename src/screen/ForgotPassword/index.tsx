import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UnAuthenticatedNavigatorType } from '../../navigation/UnAuthenticated';
import Routes from '../../navigation/Routes';
import styles from './style';
import { String } from '../../utils';
import { useForm, Controller } from 'react-hook-form';
import InputText from '../../components/UI/InputText';
import { REGEX } from '../../utils/Constant';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { CommonActions } from '@react-navigation/native';

interface Props {
  navigation: NativeStackNavigationProp<UnAuthenticatedNavigatorType>;
}

interface FormValues {
  email: string
}

const ForgotPassword = ({ navigation}: Props) => {
  const { control, handleSubmit, reset, formState: { errors }, setError } = useForm<FormValues>();

  const handleForgotPassword = async (data: any) => {
    try {

      const checkEmail = await database().ref('users').orderByChild('email').equalTo(data.email).once('value');

      if (checkEmail.exists()) {
        const resetPassword = await auth().sendPasswordResetEmail(data.email);
        reset();
        Toast.show({
          type: 'success',
          text1: String.setPasswordtoEmail,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Routes.Login }],
          }),
        );
      } else {
        setError(String.email, {
          type: 'manual',
          message: String.emailNotExist,
        });
      }
    } catch (error: any) {
      console.log('error', error);
      setError(String.email, {
        type: 'manual',
        message: error.message,
      });
    }
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View>
          <Text style={styles.headerText}>{String.forgotPasswordHeader}</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleForgotPassword)}>
          <Text style={styles.buttonText}>{String.forgotPasswordHeader}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default ForgotPassword;