import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { Context } from '../context/AuthProvider';
import { TextInput } from 'react-native-paper';
import PrimaryButton from '../components/primaryButton';
import CustomText from '../components/customText';
import { ActivityIndicator } from "react-native";
const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login, setLoading, loading } = useContext(Context);
    
    const handleLogin = async () => {
        
        if(email && senha){
         setLoading(true);
         login(email, senha);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <CustomText style={styles.titleText}>Bem-vindo de volta</CustomText>
                <Image source={require("../../assets/favicon.png")} resizeMode='cover' style={{height:200, width:200}}  /> 
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
               <View>
                 <PrimaryButton name="Login" handleButton={handleLogin} />
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
