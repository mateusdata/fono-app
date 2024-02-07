import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ErrorMessage from '../components/errorMessage';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axiosInstance from '../config/axiosInstance';


const Anamnese = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const schema = yup.object({
    first_name: yup.string().required("Paciente é obrigatorio").matches(/^(?!^\d+$).+$/,
      { message: 'Não são permitidas  entradas numéricas' }),
    cpf: yup.string().matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
      { message: "Cpf invalido", excludeEmptyString: false }).required("Cpf inválido"),
    birthday: yup.date().required("Data inválida"),
    last_name: yup.string().optional()
  }).required()
  const { reset, handleSubmit, watch, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      first_name: "",
      last_name: "",
      cpf: "",
      birthday: null
    }
  });


  const onSubmit = (data) => {
    setLoading(true)
    axiosInstance.post("/create-pacient", data).then((response) => {
      console.log(response);
      //reset({ first_name: "", cpf: "", birthday: null });
      navigation.navigate("StructuralAnalysis")
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
      console.log("deu erro")
      console.log(e);
    })

  };



  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor='white' barStyle='dark-content' />

      <View style={styles.containerChildren}>
        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode='outlined'
              label="Paciente"
              activeOutlineColor="#376fe8" />
          )}
          name='first_name'
        />
        <ErrorMessage name={"first_name"} errors={errors} />

        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode='outlined'
              label="CPF"

              activeOutlineColor="#376fe8" />
          )}
          name='cpf'
        />
        <ErrorMessage name={"cpf"} errors={errors} />

        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <SafeAreaProvider>
              <View style={{ justifyContent: 'center', flex: 0.2, alignItems: 'center', paddingTop: 0 }}>
                <DatePickerInput

                  locale='pt-BR'
                  label="Data de nascimento "
                  value={(watch().birthday)}
                  onChange={onChange}
                  inputMode="start"
                  mode='outlined'
                  outlineColor={`${errors.birthday ? "red" : "gray"}`}
                  activeOutlineColor={`${errors.birthday ? "red" : "#376fe8"}`}
                  iconStyle={{ display: 'none' }}
                />
              </View>
            </SafeAreaProvider>
          )}
          name='birthday'
        />

      </View>

      <Button disabled={loading} loading={loading} style={styles.button} buttonColor='#36B3B9' mode="contained" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Button>
    </View>
  );
};


export default Anamnese;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  containerChildren: {
    fontFamily: "Poppins_600SemiBold",
    flex: 0.9,
    backgroundColor: 'transparent',
    padding: 25,
    gap: 2,
    borderRadius: 10,
    justifyContent: 'flex-start',
    width: "100%"
  },

  button: {
    width: '90%',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

