import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import CustomText from '../components/customText';
import { Button, TextArea, XGroup, XStack, YStack } from 'tamagui'
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/errorMessage';
import axiosInstance from '../config/axiosInstance';
import { Context } from '../context/AuthProvider';

const Suggestion = () => {
    const { register, trigger, setValue, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: ""
        }
    });
    const { user } = useContext(Context);
    const onSubmit = (data) => {
        ToastAndroid.show('✅ Sugestão enviada', ToastAndroid.TOP);
        console.log(data)
        axiosInstance.post("/send-suggestion", { sugestion: data, nome: user.nome, email: user.email })
        reset({ email: '' });
    };
    const err = (err) => {
        console.log("error");

    }
    return (
        <View style={styles.container}>
            <CustomText fontFamily='Poppins_300Light' style={styles.titulo}>Página de Sugestão do Aplicativo Fonotherapp</CustomText>
            <CustomText style={styles.texto}>Por favor, dê sua sugestão:</CustomText>
            <TextArea
                multiline
                style={styles.textArea}
                numberOfLines={5}
                onChangeText={text => setValue('email', text)}
                borderWidth={2}
                {...register('email', {
                    required: 'Este campo é obrigatório',
                    maxLength: {
                        value: 40,
                        message: "o tamanho maximo do texto é 15 caracteres"
                    }, minLength: {
                        value: 3,
                        message: "informe um texto maior"
                    },
                    pattern: {
                        value: /^(?!^\d+$).+$/,
                        message: 'Não são permitidas apenas entradas numéricas'

                    }
                })}
                value={watch().email}
            />
            <ErrorMessage name={"email"} errors={errors} />


            <Button bg={"#36B3B9"} size={"$5"} mt={10} style={{ color: "white" }} onPress={handleSubmit(onSubmit, err)}>Enviar Sugestão</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    texto: {
        fontSize: 18,
    },
    textArea: {
        minHeight: "15%",
        maxHeight: "40%",
        width: '80%',
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: 10,
        textAlignVertical: "top",
        padding: 5,
        fontSize: 16,
        borderRadius: 5

    },
});

export default Suggestion;
