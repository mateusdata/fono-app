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
        birthday: new Date(),
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
       if(userDetails.first_name && userDetails.cpf && userDetails.last_name && userDetails.password){
       
        if(!userDetails.email.includes("@") &&  !userDetails.email.includes(".") ){
            alert("informe um email valido ")
            return
        }
        else if (userDetails.cpf.length < 11 || userDetails.cpf.length >11){
            alert("informe um cpf valido")
            return
        }
        else if (userDetails.password.length < 5 ){
            alert("A senha deve ser maior que 6 digitos ")
            return
        }
        setLoading(true);
;         axiosInstance.post("/create-user",userDetails).then((response) => {
            if(response.status===200){
                setLoading(false);
                alert("usuario cadastrado com sucesso");
                setTimeout(() => {
                    return login(userDetails.email, userDetails.password);
                }, 500);
                return
            }
            alert("Ocorreu um erro no front end")  
            setLoading(false);
            
        }).catch((error)=>{
            alert("Ocorreu um erro no servidor")  
            setLoading(false);                
        });
        return;
       }
        alert("Preencha todos sos campos")
        setLoading(false);
    };

    return (
        <ScrollView style={{flex:1, backgroundColor:"#FFFFFF"}} >

            <View style={{ backgroundColor: "#FFFFFF", flex: 1, height:"100%", justifyContent: "flex-start", gap: 15, alignItems: "center" }}>
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
                        label="Nome"
                        placeholder="Primeio nome"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('first_name', value)}
                    />
                    { false && <TextInput
                        mode="outlined"
                        label="Nome do meio"
                        placeholder="sur_name"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('sur_name', value)}
                    />}
                    <TextInput
                        mode="outlined"
                        label="Sobrenome"
                        placeholder="Sobrenome"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('last_name', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="CPF"
                        placeholder="CPF"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('cpf', value)}
                    />
                   { false && <TextInput
                        mode="outlined"
                        label="Data de nascimento"
                        placeholder="birthday"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('birthday', value)}
                    />}
                    <TextInput
                        mode="outlined"
                        label="E-mail"
                        placeholder="E-mail"
                        style={{ height: 52, fontFamily: "Poppins_300Light", borderRadius: 150 }}
                        activeOutlineColor='#376fe8'
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        placeholder="Senha"
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
        </ScrollView >
    )
}

export default CreateAccount;
