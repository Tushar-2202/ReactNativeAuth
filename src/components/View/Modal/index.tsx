import { View, Text, Modal, Button } from 'react-native'
import React from 'react'
import styles from './style' 

const AlertModal = (
  {
    visible,
    setVisible,
  }: {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  }
) => {
  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text>Modal</Text>

          <Button
            title="Close"
            onPress={() => setVisible(!visible)}
          />
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal