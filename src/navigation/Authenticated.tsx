import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from './Routes';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

export type AuthenticatedNavigatorType = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AuthenticatedNavigatorType>();

const Authenticated = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
    >
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Authenticated