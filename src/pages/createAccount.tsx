import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { TextInput } from 'react-native-paper';
import { Context } from '../context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '../components/errorMessage';
import axios from 'axios';
import axiosInstance from '../config/axiosInstance';

const CreateAccount = ({ navigation }: any) => {
  const { login, setLoading, loading } = useContext(Context);

  const { register, handleSubmit, watch, trigger, control,  formState: { errors }, setValue } = useForm({
    defaultValues:{
        first_name: "",
        password: "",
        email: ""
      },
    mode:"onChange"
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data)
    axiosInstance.post("/create-user", data).then((response) => {
        console.log(response.data)
        if (response?.status === 200) {
            console.log(response.data)
            setLoading(false);
            return login(watch().email, watch().password);
        }
        alert("Ocorreu um erro")
        setLoading(false);

    }).catch((error) => {
        setLoading(false);
        console.log(error)
        alert("ops! ocorreu um erro 500")
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Criar conta</Text>
        <View style={styles.inputContainer}>
            <Controller control={control} rules={
                  {required: 'Obrigatório', maxLength: { value: 40,  message: "o tamanho maximo do texto é 40 caracteres"},
                    minLength: { value: 3, message: "Informe um texto maior"},
                    pattern: { value: /^(?!^\d+$).+$/, message: 'Não são permitidas  entradas numéricas'}}}
                render={({ field: { onChange, onBlur, value, } }) => (
                <TextInput
                    mode="outlined"  activeOutlineColor="#376fe8"  error={!!errors.first_name}  label="Nome"
                    placeholder="Nome"  onBlur={onBlur}    onChangeText={onChange} value={value}
                />
                )}
                name="first_name"
            />
            
            <ErrorMessage name={"first_name"} errors={errors} />

            <Controller control={control}
             rules={{
                required: 'Obrigatório', maxLength: { value: 40,  message: "o tamanho maximo do texto é 40 caracteres"},
                minLength: { value: 3, message: "Informe um texto maior"},
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email inválido'}}}                
                render={({ field: { onChange, onBlur, value, } }) => (
                <TextInput
                    mode="outlined"  activeOutlineColor="#376fe8"  error={!!errors.email}  label="email"
                    placeholder="Email"  onBlur={onBlur}    onChangeText={onChange} value={value}
                />
                )}
                name="email"
            />
            
            <ErrorMessage name={"email"} errors={errors} />

            <Controller control={control} rules={
                  {required: 'Obrigatório', maxLength: { value: 40,  message: "Nome muito grande"},
                    minLength: { value: 5, message: "Informe uma senha maior"},
                    }}
                render={({ field: { onChange, onBlur, value, } }) => (
                <TextInput
                    mode="outlined"  activeOutlineColor="#376fe8"  error={!!errors.password}  label="Senha"
                    placeholder="Senha"  onBlur={onBlur}    onChangeText={onChange} value={value} secureTextEntry 
                />
                )}
                name="password"
            />
            
            <ErrorMessage name={"password"} errors={errors} />

          < PrimaryButton name="Criar conta" handleButton={handleSubmit(onSubmit)} />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Lembrou sua senha?</Text>
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
