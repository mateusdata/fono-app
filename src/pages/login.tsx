import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Button, TextInput } from 'react-native-paper';
import PrimaryButton from '../components/primaryButton';
import CustomText from '../components/customText';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '../components/errorMessage';
const Login = ({ navigation }: any) => {
    const { login } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, trigger, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email: "mae@gmail.com",
            password: "123456"
        },
        mode: "onChange"
    });
    const onSubmit = async () => {
        setLoading(true);
        try {
            login(watch().email, watch().password);
        } catch (error) {
            
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <CustomText style={styles.titleText}>Bem-vindo de volta</CustomText>
            </View>

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
