import * as React from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/Api';
export default function ChangeEmail() {
  const { user, setUser } = React.useContext(Context);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false)
  Keyboard.isVisible()
  const schema = yup.object({
    email: yup.string().email("Email inválido").min(3, "Email muito pequeno").required("Obrigatorio").matches(/^(?!^\d+$).+$/, { message: "Números não sãoo permitidos" })
  })
  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: user?.email
    }
  })
  const onSubmit = (data: string) => {
    setLoading(true);
    api.post(`/update-user/${user?.usu_id}`, data).then(async (response) => {
      setShowToast(true);
      try {
        const recoveryUser = JSON.parse(await AsyncStorage.getItem("usuario"));
        const updatedUser = { ...recoveryUser, ...response.data };
        setUser(updatedUser);
        await AsyncStorage.setItem("usuario", JSON.stringify(updatedUser));
      } catch (error) {
      }
      setLoading(false);

    }).catch((e) => {
      setLoading(false);
      setError("email", { message: "Ocorreu um erro" })
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.9 }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              error={!!errors.email}
              autoFocus
              onChangeText={onChange}
              mode="outlined"
              label="Aterar email"
              placeholder="email"
              style={styles.input}
              activeOutlineColor='#376fe8'
              value={value}
            />
          )}
          name='email'
        />
        <ErrorMessage name={"email"} errors={errors} />
        <Snackbar onDismiss={() => { setShowToast(!showToast) }}
          duration={2000}
          visible={showToast}
          action={{ label: "Fechar" }}
          >
          Email Atualizado
        </Snackbar>
      </View>

      <Button

        loading={loading}
        buttonColor='#36B3B1'
        textColor='white'
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        Alterar email
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
