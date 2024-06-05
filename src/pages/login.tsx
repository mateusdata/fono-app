import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Button, TextInput } from 'react-native-paper';
import PrimaryButton from '../components/primaryButton';
import CustomText from '../components/customText';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '../components/errorMessage';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/Api';
import * as  Animatable from "react-native-animatable"
import { ContextGlobal } from '../context/GlobalContext';


const Login = ({ navigation }: any) => {
    const { setLoadingAuth, setUser, user } = useContext(Context);
    const {isDevelopment, setIsdevelopment} =  useContext(ContextGlobal)
    
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setError, trigger, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email:isDevelopment ? "mateuspele2015@gmail.com" : "",
            password:isDevelopment ? "123456" : ""
        },
        mode: "onSubmit"
    });

    const infoUser = async (doc_id:number)=>{
        const response = await api.get(`/info-user/${doc_id}`);
      
        try {
          const recoveryUser = JSON.parse(await AsyncStorage.getItem("usuario"));
          const updatedUser = { ...recoveryUser, gov_license:response.data.doctor.gov_license };
          setUser(updatedUser);
          await AsyncStorage.setItem("usuario", JSON.stringify(updatedUser));
        } catch (error) {
        }
      
      }

    const onSubmit = async (data: object) => {
        try {
            setLoading(true);
            const response = await api.post("/login", data);

            setLoadingAuth(true);
            try {
                await AsyncStorage.setItem("usuario", JSON.stringify(response.data));
                setUser(response.data);
                infoUser(response?.data?.doc_id)
            } catch (error) {
                alert("erro")
            }
            setLoadingAuth(false);

        } catch (error) {
            setLoading(false);
            if (!error.response) {
                return setError("password", { message: "Ocorreu um erro!" })
            }
            setError("password", { message: "Ocorreu um erro!" })
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar animated hideTransitionAnimation='fade' style='light' />

            <Animatable.View style={styles.titleContainer}>
                <CustomText style={styles.titleText}>Bem-vindo de volta</CustomText>
            </Animatable.View>

            <View style={styles.formContainer}>
                <Controller control={control} rules={
                    {
                        required: 'Obrigatório', maxLength: { value: 40, message: "o tamanho maximo do texto é 40 caracteres" },
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email inválido' }
                    }}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined" activeOutlineColor="#376fe8" error={!!errors.email} label="Email"
                            placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value}
                        />
                    )}
                    name="email"
                />

                <ErrorMessage name={"email"} errors={errors} />

                <Controller control={control} rules={
                    {
                        required: 'Obrigatório', maxLength: { value: 40, message: "o tamanho maximo do texto é 40 caracteres" },
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
                <View>
                    <Button
                        mode='contained-tonal'
                        loading={loading}
                        buttonColor='#36B3B1'
                        textColor='white'
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}>
                        Entrar
                    </Button>
                </View>
                <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <CustomText style={{ fontFamily: "Poppins_600SemiBold", color: "gray" }}>Esqueceu sua senha ?</CustomText>
                    <Pressable onPress={() => navigation.navigate("SendEmail")}>
                        <CustomText style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Recuperar senha</CustomText>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: "Poppins_600SemiBold",
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        padding: 2,
    },
    titleContainer: {
        fontFamily: "Poppins_600SemiBold",
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: "Poppins_800ExtraBold",
        fontSize: 25,
        marginBottom: 0,
        marginTop: 0,
        color: "#4d4d4f"
    },
    formContainer: {
        fontFamily: "Poppins_600SemiBold",
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
    },
    label: {
        fontFamily: "Poppins_600SemiBold",
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        fontFamily: "Poppins_600SemiBold",
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        fontFamily: "Poppins_600SemiBold",
        //git backgroundColor: '#407AFF',
        borderRadius: 5,
        padding: 5,
        marginTop: 15,
    },
    buttonText: {
        fontFamily: "Poppins_800ExtraBold",
        color: '#f4f4f4',
        fontWeight: 'bold',
        fontSize: 17
    },
});

export default Login;
