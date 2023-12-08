import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { TextInput } from 'react-native-paper';
import axiosInstance from '../config/axiosInstance';
import { Context } from '../context/AuthProvider';

const CreateAccount = ({ navigation }:any) => {
    const {login} = useContext(Context);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        crfa: '',
        password: ''
    });

    const handleInputChange = (field:any, value:any) => {
        setUserDetails({
            ...userDetails,
            [field]: value
        });
    };

    const handleCreateAccount = () => {
       axiosInstance.post("/create-user",{
        first_name: "eeee tocador",
        sur_name: "silva",
        last_name: "oreia seca",
        cpf: "sasassssas",
        birthday: "1912-10-08",
        email: "alexempre2ss@gmail.com",
        password: "123456"
      }).then((response)=>{
        console.log(response);
        login("alexempre2ss@gmail.com", "123456");
       })
        console.log(userDetails);
    };

    return (
        <ScrollView>
            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", gap: 15, alignItems: "center" }}>
                <Text style={{
                    fontFamily: "Poppins_800ExtraBold",
                    fontSize: 25,
                    marginBottom: 0,
                    marginTop: 0,
                    color: "#4d4d4f"
                }}>
                    Criar conta
                </Text>
                <View style={{ width: "90%", gap: 8 }}>
                    <TextInput
                        mode="outlined"
                        label="nome"
                        placeholder="nome"
                        style={{
                            height: 52,
                            fontFamily: "Poppins_300Light",
                            borderRadius: 150
                        }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="email"
                        placeholder="email"
                        secureTextEntry
                        style={{ height: 52 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="CRFA"
                        placeholder="CRFA"
                        style={{
                            height: 52,
                            fontFamily: "Poppins_300Light",
                            borderRadius: 150
                        }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('crfa', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        placeholder="Senha"
                        secureTextEntry
                        style={{ height: 52 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('password', value)}
                    />
                    <PrimaryButton name="Criar conta" handleButton={handleCreateAccount} />
                    <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "gray" }}>Lembrou sua senha</Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Fazer login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default CreateAccount;
