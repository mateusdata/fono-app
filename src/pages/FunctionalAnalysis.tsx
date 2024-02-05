import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const FunctionalAnalysis = ({navigation}) => {
  return (
    <View>
      <Text>FunctionalAnalysis</Text>
      <Button onPress={()=>navigation.navigate("Root")} mode='contained'>Alalise funcional</Button>
    </View>
  )
}

export default FunctionalAnalysis
