import * as React from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { View, StyleSheet, Keyboard, Text } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import ErrorMessage from '../components/errorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/Api';
import { colorPrimary, colorSecundary } from '../style/ColorPalette';

export default function ChangePhone() {
    const { user, setUser } = React.useContext(Context);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showToast, setShowToast] = React.useState<boolean>(false);

    Keyboard.isVisible();

    const schema = yup.object({
        phone: yup.string().required("Obrigatório").max(15, "telefone Inválido").min(5, "telefone Inválido"),
    });

    const { control, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
        defaultValues: {
            phone: user.phone
        }
    });

    const onSubmit = (data: string) => {
        setLoading(true);
        api.post(`/update-doctor/${user?.doc_id}`, data).then(async (response) => {
            setShowToast(true);
            try {
                const recoveryUser = JSON.parse(await AsyncStorage.getItem("usuario"));
                const updatedUser = { ...recoveryUser, ...response.data };
                setUser(updatedUser);
                await AsyncStorage.setItem("usuario", JSON.stringify(updatedUser));
            } catch (error) {
                console.error("Erro ao atualizar usuário:", error);
            }
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            setError("phone", { message: "Ocorreu um erro" });
        });
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.9 }}>
               {<View style={{flexDirection:"row"}}> 
                    <Text style={{ fontSize: 18, marginBottom: 10, padding: 5 }} >{`${!user.phone ? "Você ainda não cadastrou seu telefone": "Meu telefone atual"}`}</Text>
                    <Text style={{ fontSize: 18, marginBottom: 10, padding: 5, color: colorSecundary }} >{user?.phone }</Text>
                </View>}
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            autoFocus
                            keyboardType='numeric'
                            onChangeText={onChange}
                            mode="outlined"
                            label={user.phone? "Alterar telefone": "Criar telefone"}
                            placeholder="telefone"
                            style={styles.input}
                            activeOutlineColor='#376fe8'
                            value={value}
                        />
                    )}
                    name='phone'
                />
                <ErrorMessage name={"phone"} errors={errors} />
                <Snackbar
                    onDismiss={() => { setShowToast(!showToast) }}
                    duration={2000}
                    visible={showToast}
                    action={{ label: "Fechar" }}
                >
                    telefone Atualizado
                </Snackbar>
            </View>

            <Button
                loading={loading}
                buttonColor='#36B3B1'
                textColor='white'
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
            >
                {user.phone? "Alterar telefone": "Criar telefone"}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 8,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        padding: 5
    }
});
