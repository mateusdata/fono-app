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

export default function CheckCode({ navigation }) {
    const { email, setEmail } = React.useContext(Context);
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (!email) { navigation.navigate("Login"); };
    }, []);
    if (!email) {
        return null;
    }
    const schema = yup.object({
        verification_code: yup.string().min(4, "codigo  muito pequeno").max(6, "codigo  muito grande")
    })
    const { control, handleSubmit, setError, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            verification_code: "",
        }
    })

    const sendCode = () => {
        axiosInstance.post('/verify-reset-code', { email: email }).then((response) => {
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
        axiosInstance.post("/verify-reset-code",{...data, email}).then((response) => {
            setLoading(false);
            navigation.navigate("ChangePassword");

        }).catch((e) => {
            setLoading(false);
            if (e?.status !== 401) {
                setError("verification_code", { message: "Código inválido" })
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
                        Verificar código
                    </CustomText>
                    <CustomText fontFamily='Poppins_300Light' style={{ fontSize: 18, textAlign: "center" }}>
                        Insira o código  que acabamos de enviar para seu email.
                    </CustomText>
                </View>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            autoFocus
                            error={!!errors.verification_code}
                            onChangeText={onChange}
                            mode="outlined"
                            label="codigo"
                            placeholder=""
                            style={styles.input}
                            activeOutlineColor='#376fe8'
                            value={value}
                        />
                    )}
                    name='verification_code'
                />
                <ErrorMessage name={"verification_code"} errors={errors} />
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
                <CustomText fontFamily='Poppins_300Light' style={{ color: "gray" }}>Não tem um código</CustomText>
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
