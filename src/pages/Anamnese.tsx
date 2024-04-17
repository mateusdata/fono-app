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


const Anamnese = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useContext(Context);
  const { setPac_id, setPacient, pac_id } = useContext(ContextPacient);
  const [questionTitle, setQuestionTitle] = useState<string>("")
  const formatCpf = cpf;


  const schema = yup.object({
    education: yup.string().required("Obrigatorio"),
    base_diseases: yup.string().required("Obrigatorio"),
    food_profile: yup.string().required("Obrigatorio"),
    chewing_complaint: yup.string().required("Obrigatorio"),
    consultation_reason: yup.string().required("Obrigatorio"),

  }).required();

  const { reset, handleSubmit, watch, formState: { errors }, control, setError } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {

    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post(`/update-pacient/${pac_id}`, data);
      setPac_id(response.data.pac_id);
      setPacient(response?.data?.person);
      navigation.navigate("PatientQuestionnaire");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e)
      if (e?.response) {
        return setError("chewing_complaint", { message: "Paciente já existe." })
      }
      return setError("chewing_complaint", { message: "Sem conexão com a internet, tente novamente" })
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
              label="Escolaridade"
              activeOutlineColor="#376fe8" />
          )}
          name='education'
        />
        <ErrorMessage name={"education"} errors={errors} />


        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode='outlined'
              label="Doenças base"
              activeOutlineColor="#376fe8" />
          )}
          name='base_diseases'
        />
        <ErrorMessage name={"base_diseases"} errors={errors} />


        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode='outlined'
              label="Perfil alimentar"
              activeOutlineColor="#376fe8" />
          )}
          name='food_profile'
        />
        <ErrorMessage name={"food_profile"} errors={errors} />


        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode='outlined'
              label="Queichas a deglutição"
              activeOutlineColor="#376fe8" />
          )}
          name='chewing_complaint'
        />
        <ErrorMessage name={"chewing_complaint"} errors={errors} />

        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              mode='outlined'
              label="Motivo da consulta"
              activeOutlineColor="#376fe8" />
          )}
          name='consultation_reason'
        />
        <ErrorMessage name={"consultation_reason"} errors={errors} />


      </ScrollView>


      <View style={{ position: "absolute", margin: 16, right: 0, bottom: 0, flex: 1 }}>
        <Button icon="arrow-right" 
          disabled={loading} loading={loading} buttonColor='#36B3B9' mode="contained" onPress={handleSubmit(onSubmit)}>
          Próximo
        </Button>
      </View>


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
