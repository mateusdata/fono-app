import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';

import PrimaryButton from '../components/primaryButton';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { Context } from '../context/AuthProvider';
import axiosInstance from '../config/axiosInstance';

export default function ChangeCredential({navigation}) {
  const [text, setText] = React.useState('');
  const { user } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const schema = yup.object({
    newPassword: yup.string().min(6, "a senha tem que ter pelo menos 6 digitos").required("Senha obrigatoria"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], "AS senhas nao confere").required("AS senhas nao confere"),
    email: yup.mixed(),
  });

  const { control, reset, watch, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      email: user.email,
      newPassword: "",
      confirmPassword: ""
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  })
 const err = (e)=>{
  console.log(e);
  
 }
  const onSubtmit = (data) => {
    setLoading(true);
    axiosInstance.post("/reset-password", {
      newPassword: watch().newPassword,
      email:user.email
    }).then((response) => {
      console.log(response.data);
      alert("senha alterada")
      reset({ email: user.email, newPassword: "", confirmPassword: "" });
     
      setLoading(false);
    }).catch((erro) => {
      setLoading(false);
      console.log("Erro " , erro);
      alert("Senha atualizada");
      setTimeout(() => {
        navigation.navigate("Root")
      }, 2000);
    })
    console.log(data);
  }

  return (
    <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor='white' barStyle='dark-content' />

      <View style={styles.contentContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode="outlined"
              label="Nova senha"
              placeholder="Senha"
              secureTextEntry
              activeOutlineColor='#376fe8'
            />
          )}
          name='newPassword'
        />
        <ErrorMessage name="newPassword" errors={errors} />


        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode="outlined"
              label="Confirmar nova senha"
              placeholder="Senha"
              secureTextEntry
              activeOutlineColor='#376fe8'
            />
          )}
          name="confirmPassword"
        />
        <ErrorMessage name="confirmPassword" errors={errors} />

      </View>

      <Button mode='contained' loading={loading} onPress={handleSubmit(onSubtmit, err)}buttonColor='#36B3B9' contentStyle={{ height: 45 }} >Alterar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  contentContainer: {
    gap: 1,
    flex: 0.9
  },
});
