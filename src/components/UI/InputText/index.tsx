import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { Colors, String } from '../../../utils'

interface Props {
  label: string,
  placeholder: string,
  keyboardType: 'email-address' | 'default' | 'numeric' | 'phone-pad' | 'visible-password',
  onChangeText: () => void,
  onBlur: () => void,
  value: string,
  error: any,
  secureTextEntry?: boolean
}

const InputText = (
  {
    label,
    placeholder,
    keyboardType = 'default',
    onChangeText,
    onBlur,
    value,
    error,
    secureTextEntry = false
  }: Props
) => {
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input,{borderColor: error ? Colors.ERROR : Colors.INPUT_FIELD, borderWidth: error ? 1 : 0}]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Colors.TEXT}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default InputText