import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axiosInstance from '../config/axiosInstance';
import { Context } from '../context/ AuthProvider';
import { TextInput } from 'react-native-paper';

const LoginForm = () => {
    const [email, setEmail] = useState('mateuspele2015@gmail.com');
    const [senha, setSenha] = useState('123456');
    const { login } = useContext(Context);

    const handleLogin = async () => {
        login(email, senha);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Bem-vindo de volta</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    mode="outlined"
                    label="Emailr"
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    mode="outlined"
                    label="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                />
             

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-start',
        padding: 20,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 25,
        marginBottom: 20,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
    },
    label: {
        color: '#000000',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#36B3B9', // Changed button color
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default LoginForm;
