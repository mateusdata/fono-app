import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { TextInput } from 'react-native-paper';
import axiosInstance from '../config/axiosInstance';
import { Context } from '../context/AuthProvider';

const CreateAccount = ({ navigation }: any) => {
    const { login, setLoading, loading } = useContext(Context);
    
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        sur_name: '',
        last_name: '',
        cpf: '',
        birthday: '',
        email: '',
        password: ''
      });
      

    const handleInputChange = (field: any, value: any) => {
        setUserDetails({
            ...userDetails,
            [field]: value
        });
    };

    const handleCreateAccount = () => {
       if(userDetails.first_name && userDetails.cpf && userDetails.sur_name && userDetails.last_name && userDetails.birthday && userDetails.password){
        setLoading(true);

        return axiosInstance.post("/create-user",userDetails).then((response) => {
            if(response.status===200){
                setLoading(false);
                setTimeout(() => {
                    return login(userDetails.email, userDetails.cpf);
                }, 5000);
            }
            alert("Ocorreu um erro")  
            setLoading(false);
            
        }).catch((error)=>{
            alert("Ocorreu um erro")  
            setLoading(false);                
        })
       }
        alert("Preencha todos sos campos")
        setLoading(false);
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
                        label="Primeiro nome"
                        placeholder="first_name"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('first_name', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Nome do meio"
                        placeholder="sur_name"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('sur_name', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Útimo nome"
                        placeholder="last_name"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('last_name', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="cpf"
                        placeholder="cpf"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('cpf', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Data de nascimento"
                        placeholder="birthday"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('birthday', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="email"
                        placeholder="email"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        placeholder="password"
                        secureTextEntry
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
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
