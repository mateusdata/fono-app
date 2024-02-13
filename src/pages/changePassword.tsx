import * as React from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Context } from '../context/AuthProvider';
import axiosInstance from '../config/axiosInstance';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ChangePassword() {
  const { user, login, email } = React.useContext(Context);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false)

  const schema = yup.object({
    newPassword: yup.string().min(6, "A senha deve ter pelo menos 6 caractéres"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('newPassword'), null], 'As senhas devem corresponder')
  });
  
  const { control, handleSubmit, setError,watch,  formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword:''
    }
  })
  const onSubmit = (data: any) => {
    setLoading(true);
    axiosInstance.post('/reset-password', { email: email, newPassword: data.newPassword }).then(async (response) => {
      console.log(response.data);
      login(email, data?.newPassword);
      setLoading(false);
    }).catch((e) => {
      setLoading(false);
      alert("Ocorreu um erro")
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              autoFocus
              error={!!errors.newPassword}
              onChangeText={onChange}
              mode="outlined"
              label="Nova senha"
              placeholder=""
              style={styles.input}
              activeOutlineColor='#376fe8'
              value={value}
            />
          )}
          name='newPassword'
        />
        <ErrorMessage name={"newPassword"} errors={errors} />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              autoFocus
              error={!!errors.confirmPassword}
              onChangeText={onChange}
              mode="outlined"
              label="Confirmar senha"
              placeholder=""
              style={styles.input}
              activeOutlineColor='#376fe8'
              value={value}
            />
          )}
          name='confirmPassword'
        />
        <ErrorMessage name={"confirmPassword"} errors={errors} />
        
        <Snackbar onDismiss={() => { setShowToast(!showToast) }}
          duration={2000}
          style={{ backgroundColor: "#38CB89" }} visible={showToast}
          action={{ label: "☑️" }}
        >
            Senha Atualizado
        </Snackbar>
      </View>

      <Button

        loading={loading}
        buttonColor='#36B3B1'
        textColor='white'
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        Alterar senha
      </Button>

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
  button: {
    padding: 5
  }
});
