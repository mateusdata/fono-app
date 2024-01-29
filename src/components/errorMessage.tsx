import React from 'react'
import { Text } from 'react-native'

const ErrorMessage = ({name, errors}) => {
  return (
   <Text style={{color:"red"}}>{errors?.[name]?.message}</Text>
  )
}

export default ErrorMessage
