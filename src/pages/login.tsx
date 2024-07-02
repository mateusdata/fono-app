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
import * as  Animatable from "react-native-animatable"
import { ContextGlobal } from '../context/GlobalContext';
import { api } from '../config/Api';
import { LinearGradient } from 'expo-linear-gradient';
import { styleGradient } from '../style/styleGradient';
import { colorSecundary } from '../style/ColorPalette';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"


const Login = ({ navigation }: any) => {
    const { setLoadingAuth, setUser, user } = useContext(Context);
    const { isDevelopment, setIsdevelopment } = useContext(ContextGlobal)

    const schema = yup.object({
        email: yup
            .string()
            .transform(value => value.toLowerCase())
            .required('Obrigatório')
            .max(40, 'O tamanho máximo do texto é 40 caracteres')
            .email("Email inválido"),

        password: yup
            .string()
            .required('Obrigatório')
            .max(40, 'O tamanho máximo do texto é 40 caracteres')
            .min(5, 'Informe uma senha maior'),
    }).required();

    const [loading, setLoading] = useState(false);
    const { watch, handleSubmit, setError, trigger, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email: isDevelopment ? "mateuspele2015@gmail.com" : "",
            password: isDevelopment ? "123456" : ""
        },
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const infoUser = async (doc_id: number) => {



        try {
            const response = await api.get(`/info-user/${doc_id}`);
            alert(JSON.stringify(response.data))
            const recoveryUser = JSON.parse(await AsyncStorage.getItem("usuario"));
            const updatedUser = { ...recoveryUser, gov_license: response.data.doctor.gov_license };
            setUser(updatedUser);
            await AsyncStorage.setItem("usuario", JSON.stringify(updatedUser));
        } catch (error) {
            alert("error")
        }

    }

    const onSubmit = async (data: object) => {
        try {
            setLoading(true);
            const response = await api.post("/login", data);

            try {

                await AsyncStorage.setItem("usuario", JSON.stringify(response.data));
                setLoadingAuth(true);
                setUser(response.data);
                //infoUser(response?.data?.doc_id)
                //alert(JSON.stringify(data))
            } catch (error) {
                alert("erro")
            }
            setLoadingAuth(false);

        } catch (error) {
            console.log(error)

            setLoading(false);
            if (error?.response) {
                if (error?.response?.status === 401){
                    setError("email",{})
                    return setError("password", { message: "email ou senha incorretos" });
                }
                if (error?.response?.status === 404){
                    setError("email",{})
                    return setError("password", { message: error.response?.data?.message });
                }

            }
            setError("password", { message: "Ocorreu um erro!" })
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[
                    'hsla(205, 100%, 95%, 1)',
                    'hsla(320, 100%, 99%, 1)',
                    'hsla(210, 100%, 97%, 1)',
                    'hsla(205, 100%, 95%, 1)',
                    'hsla(313, 100%, 98%, 1)'
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styleGradient.background}
            />
            <StatusBar animated hideTransitionAnimation='fade' style='light' />

            <Animatable.View style={styles.titleContainer}>
                <CustomText style={styles.titleText}>Bem-vindo de volta</CustomText>
            </Animatable.View>

            <View style={styles.formContainer}>
                <Controller control={control}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined"
                            autoCorrect={false}
                            outlineStyle={{ borderWidth: (watch("email") && !errors.email) ? 2 : 2 }}
                            outlineColor={(watch("email") && !errors.email) ? "green" : "gray"}
                            activeOutlineColor={!watch("email") ? colorSecundary : !(errors?.email) ? "green" : "red"}
                            error={!!errors.email} label="Email"
                            placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value}
                        />
                    )}
                    name="email"
                />

                <ErrorMessage name={"email"} errors={errors} mt={5} mb={2} />


                <Controller control={control}
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <TextInput
                            mode="outlined"
                            autoCorrect={false}
                            outlineStyle={{ borderWidth: (watch("password") && !errors.password) ? 2 : 2 }}
                            outlineColor={(watch("password") && !errors.password) ? "green" : "gray"}
                            activeOutlineColor={!watch("password") ? colorSecundary : !(errors?.password) ? "green" : "red"}
                            error={!!errors.password} label="password"
                            placeholder="Senha" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry
                        />
                    )}
                    name="password"
                />

                <ErrorMessage name={"password"} errors={errors} mt={5} mb={2} />


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
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        gap: 0
    },
    label: {
        fontFamily: "Poppins_600SemiBold",
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        fontFamily: "Poppins_600SemiBold",
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
