import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import CustomText from '../components/customText';
const Toast = () => {
  const [visible, setVisible] = React.useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={1500000}
        style={{backgroundColor:"white", borderWidth:2, borderColor:"green"}}
        >
        <Pressable style={{flexDirection:"row", justifyContent:"space-between"}}>
        <CustomText fontFamily='Poppins_400Regular'>
             Sua sugestão enviada com sucesso.
        </CustomText>
        <MaterialIcons name="verified" size={24} color="green" />
        </Pressable>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Toast;