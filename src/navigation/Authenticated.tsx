import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './Routes';
import Home from '../screen/Home';

export type AuthenticatedNavigatorType = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthenticatedNavigatorType>();

const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
    >
      <Stack.Screen name={Routes.Home} component={Home} />
    </Stack.Navigator>
  )
}

export default Authenticated