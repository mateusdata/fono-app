import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const StructuralAnalysis = ({navigation}) => {
  return (
    <View>
      <Text>StructuralAnalysis</Text>
      <Button onPress={()=>navigation.navigate("FunctionalAnalysis")} mode='contained'>Alalise funcional</Button>
    </View>
  )
}

export default StructuralAnalysis
