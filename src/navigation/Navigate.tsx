import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';
import Routes from './Routes';
import Splace from '../screen/Splace';

export type RootNavigatorType = {
  Splash: undefined;
  Authenticated: undefined;
  UnAuthenticated: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorType>();

const Navigate = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Splash}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Splash} component={Splace}/>
      <Stack.Screen name={Routes.UnAuthenticated} component={UnAuthenticated} />
      <Stack.Screen name={Routes.Authenticated} component={Authenticated} />
    </Stack.Navigator>
  );
};

export default Navigate;
