import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ErrorMessage from '../components/errorMessage';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ScrollView } from 'react-native-gesture-handler';
import { Context } from '../context/AuthProvider';
import { ContextPacient } from '../context/PacientContext';
import { cpf } from 'cpf-cnpj-validator';
import api from '../config/Api';


const CreatePacient = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useContext(Context);
  const { setPac_id, setPacient } = useContext(ContextPacient);
  const formatCpf = cpf;

  const schema = yup.object({
    first_name: yup.string().required("Paciente é obrigatorio").matches(/^(?!^\d+$).+$/,
      { message: 'Não são permitidas  entradas numéricas' }),
    cpf: yup.string().matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
      { message: "Cpf invalido", excludeEmptyString: false }).required("Cpf inválido"),
    birthday: yup.date().required("Data inválida"),
    last_name: yup.string(),
  }).required();

  const { reset, handleSubmit, watch, formState: { errors }, control, setError } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      first_name: "Aluno teste",
      last_name: "",
      cpf: (() => {
        let cpf = "";
        while (cpf.length < 11) {
          cpf += Math.floor(Math.random() * 10);
        }
        return formatCpf.format(cpf);
      })(),
      birthday: new Date(),
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/create-pacient", { ...data, doc_id: user.doc_id });
      setPac_id(response.data.pac_id);
      setPacient(response?.data?.person);
      reset();
      navigation.navigate("Anamnese");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      if (error?.response) {
        return setError("cpf", { message: "Paciente já existe." })
      }
      return setError("cpf", { message: "Sem conexão com a internet, tente novamente" })
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerChildren}>
        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              autoFocus
              onChangeText={onChange}
              mode='outlined'
              label="Nome"
              activeOutlineColor="#376fe8" />
          )}
          name='first_name'
        />

        <ErrorMessage name={"first_name"} errors={errors} />

        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={formatCpf.format(value)}
              onChangeText={onChange}
              mode='outlined'
              label="Cpf"
              activeOutlineColor="#376fe8" />
          )}
          name='cpf'
        />
        <ErrorMessage name={"cpf"} errors={errors} />

        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <SafeAreaProvider>
              <View style={{ justifyContent: 'center', flex: 0.2, alignItems: 'center', paddingTop: 15 }}>
                <DatePickerInput
                  error
                  locale='pt-BR'
                  label="Data de nascimento "
                  value={(watch().birthday)}
                  onChange={onChange}
                  inputMode="start"
                  mode='outlined'
                  activeOutlineColor={`${errors.birthday ? "red" : "#376fe8"}`}
                  iconStyle={{ display: 'none' }}
                />
              </View>
            </SafeAreaProvider>

          )}

          name='birthday'
        />
        <ErrorMessage name={"birthday"} errors={errors} />


      </ScrollView>
      <View style={{ width: "90%", bottom: 20 }}>
        <Button disabled={loading} loading={loading} style={styles.button} buttonColor='#36B3B9' mode="contained" onPress={handleSubmit(onSubmit)}>
          Enviar
        </Button>
      </View>
    </View>
  );
};


export default CreatePacient;

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
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    width: "100%"
  },

  button: {
    width: '100%',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
