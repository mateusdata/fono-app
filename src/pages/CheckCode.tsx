import * as React from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, Keyboard, Pressable, Text } from 'react-native';
import { Context } from '../context/AuthProvider';
import axiosInstance from '../config/axiosInstance';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomText from '../components/customText';

export default function ChangeCredential({ navigation }) {
    const { email, setEmail } = React.useContext(Context);
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (!email) { navigation.navigate("Login"); };
    }, []);
    if (!email) {
        return null;
    }
    const schema = yup.object({
        codigo: yup.string().min(6, "codigo  muito pequeno").max(6, "codigo  muito grande")
    })
    const { control, handleSubmit, setError, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            codigo: "",
        }
    })

    const sendCode = () => {
        axiosInstance.post('/send-reset-code', { email: email }).then((response) => {
            if (response.status === 200) {
                return alert("um novo codigo foi enviado para " + email)
            }
            return ("ops! ocorreu um erro ")
        }).catch((error) => {
            error?.response.status && alert(" ocorreu um erro");
        })
    }
    const onSubmit = (data: any) => {
        setLoading(true);
        axiosInstance.post("/verify-reset-code", {
            codigo:541131
        }).then(async (response) => {
            console.log(response.data);
            setEmail(data?.codigo)
            navigation.navigate("ChangePassword");
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            if (e?.status !== 40) {
                setError("codigo", { message: "Código inválido" })
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
                        Insira seu codigo pra obter um código de segurança
                    </CustomText>
                </View>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            autoFocus
                            error={!!errors.codigo}
                            onChangeText={onChange}
                            mode="outlined"
                            label="codigo"
                            placeholder=""
                            style={styles.input}
                            activeOutlineColor='#376fe8'
                            value={value}
                        />
                    )}
                    name='codigo'
                />
                <ErrorMessage name={"codigo"} errors={errors} />
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
                <Pressable onPress={sendCode}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Reivinhar código</Text>
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
