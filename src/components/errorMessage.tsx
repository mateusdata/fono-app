import React from 'react'
import { Text } from 'react-native'

const ErrorMessage = ({name, errors}) => {
  return (
   <Text style={{color:"red", fontSize:14}}>{errors?.[name]?.message}</Text>
  )
}

export default ErrorMessage
