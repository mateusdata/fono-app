import * as React from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, Keyboard, Pressable } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomText from '../components/customText';
import api from '../config/Api';

export default function SendEmail({ navigation }) {
    const { email, setEmail } = React.useContext(Context);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showToast, setShowToast] = React.useState<boolean>(false)
    Keyboard.isVisible()
    const schema = yup.object({
        email: yup.string().email("Email inválido").min(6, "Email é muito pequeno")
    })
    const { control, handleSubmit, setError, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: "",
        }
    })
    const onSubmit = (data: any) => {
        setLoading(true);
        api.post("/send-reset-code",data).then((response) => {
            setEmail(data?.email);
            navigation.navigate("CheckCode");
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            if(e?.status!==401){
                setError("email",{message:"Ocorreu um erro"})
            }
        });
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.9 }}>

                <View style={{ gap: 10, marginTop: 10 }}>
                    <CustomText fontFamily='Poppins_300Light' style={{
                        fontSize: 25,
                        marginBottom: 0,
                        marginTop: 0,
                        color: "#4d4d4f",
                        textAlign: "center"
                    }}>
                        Esqueceu sua senha ?
                    </CustomText>
                    <CustomText fontFamily='Poppins_300Light' style={{ fontSize: 18, textAlign: "center" }}>
                        Insira seu email pra obter um código de segurança
                    </CustomText>
                </View>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            autoFocus
                            error={!!errors.email}
                            onChangeText={onChange}
                            mode="outlined"
                            label="Email"
                            placeholder=""
                            style={styles.input}
                            activeOutlineColor='#376fe8'
                            value={value}
                        />
                    )}
                    name='email'
                />
                <ErrorMessage name={"email"} errors={errors} />
            </View>

            <Button
                loading={loading}
                buttonColor='#36B3B1'
                textColor='white'
                style={styles.button}
                onPress={handleSubmit(onSubmit)}>
                Proximo
            </Button>

            <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                <CustomText fontFamily='Poppins_300Light' style={{ color: "gray" }}>Lembrou sua senha</CustomText>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <CustomText fontFamily='Poppins_300Light' style={{ color: "#407AFF" }}>Fazer login</CustomText>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 18,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        padding: 5
    }
});
