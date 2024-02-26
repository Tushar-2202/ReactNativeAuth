import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native';
import styles from './style';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigatorType } from '../../navigation/Navigate';
import { CommonActions } from '@react-navigation/native';
import Routes from '../../navigation/Routes';

interface Props {
  navigation: NativeStackNavigationProp<RootNavigatorType>
}

const Splace = ({ navigation }: Props) => {

  const user = useSelector((state: any) => state.userReducer.userInfo)

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/loading.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
        onAnimationFinish={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: user ? Routes.Authenticated : Routes.UnAuthenticated }
              ]
            })
          )
        }
        }
      />
    </View>
  )
}

export default Splace