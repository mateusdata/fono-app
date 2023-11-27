import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Context } from '../context/AuthProvider';
import { TextInput } from 'react-native-paper';
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from '../components/primaryButton';
const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login, setLoading } = useContext(Context);
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleLogin = async () => {
        setLoading(true);
        login(email, senha);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Bem-vindo de volta</Text>
                <Image source={{uri:"https://institutoacorde.org.br/wp-content/uploads/2021/02/fono.jpg"}} resizeMode='cover' style={{height:150, width:150}}  /> 
                </View>

            <View style={styles.formContainer}>
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Digite seu email"
                    style={{
                        height: 52,
                        borderRadius: 150,
                        marginBottom:10
                    }}
                    value={email}
                    activeOutlineColor='#376fe8'

                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    mode="outlined"
                    label="Senha"
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={senha}
                    style={{ height: 52 }}

                    activeOutlineColor='#376fe8'
                    onChangeText={(text) => setSenha(text)}
                />
                <PrimaryButton name="Login" handleButton={handleLogin} />
                <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", color: "gray" }}>Esqueceu sua senha ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SendEmail")}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Recumperar senha</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#407AFF',
        borderRadius: 5,
        padding: 18,
        alignItems: 'center',
        marginTop: 15
    },
    buttonText: {
        fontFamily: "Poppins_800ExtraBold",
        color: '#f4f4f4',
        fontWeight: 'bold',
        fontSize: 17
    },
});

export default Login;
