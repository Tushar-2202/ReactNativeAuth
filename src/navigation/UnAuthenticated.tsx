import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './Routes';
import Signup from '../screen/Signup';
import Login from '../screen/Login';
import { Colors } from '../utils';

export type UnAuthenticatedNavigatorType = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
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
    </Stack.Navigator>
  )
}

export default UnAuthenticated