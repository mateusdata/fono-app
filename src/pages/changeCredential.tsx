import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Button } from 'react-native';
import PrimaryButton from '../components/primaryButton';

export default function ChangeCredential() {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Aterar senha"
        placeholder="Senha"
        secureTextEntry
        style={{ height: 52, width: "100%", marginBottom: 10 }}
        activeOutlineColor='#376fe8'
      />
       <TextInput
        mode="outlined"
        label="Confirmar senha"
        placeholder="Senha"
        secureTextEntry
        style={{ height: 52, width: "100%", marginBottom: 10 }}
        activeOutlineColor='#376fe8'
      />
      
      <PrimaryButton handleButton={()=>{}}  name="Alterar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
  },
  input: {
    marginBottom: 10,
  },
});
