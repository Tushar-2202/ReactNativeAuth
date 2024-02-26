import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './Routes';
import Signup from '../screen/Signup';
import Login from '../screen/Login';
import { Colors } from '../utils';
import ForgotPassword from '../screen/ForgotPassword';

export type UnAuthenticatedNavigatorType = {
  Signup: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<UnAuthenticatedNavigatorType>();

const UnAuthenticated = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.PRIMARY
        }
      }}
      initialRouteName={Routes.Signup}
    >
      <Stack.Screen name={Routes.Signup} component={Signup} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword}/>
    </Stack.Navigator>
  )
}

export default UnAuthenticated