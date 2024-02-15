import * as React from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Context } from '../context/AuthProvider';
import axiosInstance from '../config/axiosInstance';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ChangeCredential() {
  const { user, setUser } = React.useContext(Context);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false)
  Keyboard.isVisible()
  const schema = yup.object({
    new_password: yup.string().min(3, "Nova senha é muito pequena"),
    current_password: yup.string().min(6,"Senha atual é muito pequena")
  })
  const { control, handleSubmit, setError,watch,  formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      new_password: "",
      current_password:''
    }
  })
  const onSubmit = (data: string) => {
    setLoading(true);
    axiosInstance.post(`/update-password/${user?.usu_id}`, data).then(async (response) => {
      setLoading(false);
    }).catch((e) => {
      setLoading(false);

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
              error={!!errors.current_password}
              onChangeText={onChange}
              mode="outlined"
              label="Senha atual"
              placeholder=""
              style={styles.input}
              activeOutlineColor='#376fe8'
              value={value}
            />
          )}
          name='current_password'
        />
        <ErrorMessage name={"current_password"} errors={errors} />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              autoFocus
              error={!!errors.new_password}
              onChangeText={onChange}
              mode="outlined"
              label="Nova senha"
              placeholder=""
              style={styles.input}
              activeOutlineColor='#376fe8'
              value={value}
            />
          )}
          name='new_password'
        />
        <ErrorMessage name={"new_password"} errors={errors} />
        
        <Snackbar onDismiss={() => { setShowToast(!showToast) }}
          duration={2000}
          style={{ backgroundColor: "#38CB89" }} visible={showToast}
          action={{ label: "☑️" }}
        >
            Senha Atualizada
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
