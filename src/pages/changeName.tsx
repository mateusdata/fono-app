import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Button } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { Context } from '../context/AuthProvider';

export default function ChangeName() {
  const [text, setText] = React.useState('');
  const { logOut, user } = React.useContext(Context);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Aterar nome"
        placeholder="nome"
        style={{ height: 52, width: "100%", marginBottom: 10 }}
        activeOutlineColor='#376fe8'
        defaultValue={user?.name.trim()}
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
