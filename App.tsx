import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux-toolkit/store';
import Toast from 'react-native-toast-message';
import Navigate from './src/navigation/Navigate';
import { Colors } from './src/utils';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={Colors.PRIMARY}
          barStyle='dark-content'
        />
        <NavigationContainer>
          <Navigate />
          <Toast
            position='bottom'
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App