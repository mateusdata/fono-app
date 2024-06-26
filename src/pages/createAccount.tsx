import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { Button, TextInput } from 'react-native-paper';
import { Context } from '../context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '../components/errorMessage';
import axios from 'axios';
import CustomText from '../components/customText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/Api';

const CreateAccount = ({ navigation }: any) => {
  const { setUser, setLoadingAuth } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const { watch, reset, handleSubmit, setError, trigger, control, formState: { errors }, setValue } = useForm({
    defaultValues: {
      nick_name: "",
      password: "",
      email: ""
    },
    mode: "onChange"
  });


  const onSubmit = async (data) => {

    try {
      setLoading(true)
      const response = await api.post("/create-user", data)
      setLoading(false);
      console.log(response.data)
      navigation.navigate("FinishRegistration", { user: watch()})
      reset();
    } catch (error) {
      setError("password", { message: "Ocorreu um error" })

      setLoading(false)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ gap: 10, marginTop: 10 }}>
          <CustomText fontFamily='Poppins_300Light' style={{
            fontSize: 25,
            marginBottom: 0,
            marginTop: 0,
            color: "#4d4d4f",
            textAlign: "center"
          }}>
            Criar conta
          </CustomText>

        </View>
        <View style={styles.inputContainer}>
          <Controller control={control} rules={
            {
              required: 'Obrigatório', maxLength: { value: 40, message: "o tamanho maximo do texto é 40 caracteres" },
              minLength: { value: 3, message: "Informe um texto maior" },
              pattern: { value: /^(?!^\d+$).+$/, message: 'Não são permitidas  entradas numéricas' }
            }}
            render={({ field: { onChange, onBlur, value, } }) => (
              <TextInput
                mode="outlined" autoFocus activeOutlineColor="#376fe8" error={!!errors.nick_name} label="Nome"
                placeholder="Nome" onBlur={onBlur} onChangeText={onChange} value={value}
              />
            )}
            name="nick_name"
          />

          <ErrorMessage name={"nick_name"} errors={errors} />

          <Controller control={control}
            rules={{
              required: 'Obrigatório', maxLength: { value: 40, message: "o tamanho maximo do texto é 40 caracteres" },
              minLength: { value: 3, message: "Informe um texto maior" },
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email inválido' }
            }}
            render={({ field: { onChange, onBlur, value, } }) => (
              <TextInput
                mode="outlined" activeOutlineColor="#376fe8" error={!!errors.email} label="email"
                placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value}
              />
            )}
            name="email"
          />

          <ErrorMessage name={"email"} errors={errors} />

          <Controller control={control} rules={
            {
              required: 'Obrigatório', maxLength: { value: 40, message: "Nome muito grande" },
              minLength: { value: 5, message: "Informe uma senha maior" },
            }}
            render={({ field: { onChange, onBlur, value, } }) => (
              <TextInput
                mode="outlined" activeOutlineColor="#376fe8" error={!!errors.password} label="Senha"
                placeholder="Senha" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry
              />
            )}
            name="password"
          />

          <ErrorMessage name={"password"} errors={errors} />

          <Button
            disabled={loading}
            loading={loading}
            buttonColor='#36B3B1'
            textColor='white'
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            Criar conta
          </Button>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Fazer login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
  },
  button: {
    padding: 5
  },
  titleText: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 25,
    marginBottom: 0,
    marginTop: 0,
    color: "#4d4d4f",
  },
  inputContainer: {
    width: "90%",
    gap: 0,
    flex: 1,
  },
  footerContainer: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  footerText: {
    fontFamily: "Poppins_600SemiBold",
    color: "gray",
  },
  linkText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#407AFF",
  },
});

export default CreateAccount;
