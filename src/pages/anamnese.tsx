import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ErrorMessage from '../components/errorMessage';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axiosInstance from '../config/axiosInstance';
import { ScrollView } from 'react-native-gesture-handler';
import { Context } from '../context/AuthProvider';
import { ContextPacient } from '../context/PacientContext';


const Anamnese = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const {user} = useContext(Context);
  const {setPac_id } = useContext(ContextPacient);


  
  const schema = yup.object({
    first_name: yup.string().required("Paciente é obrigatorio").matches(/^(?!^\d+$).+$/,
      { message: 'Não são permitidas  entradas numéricas' }),
    cpf: yup.string().matches(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
      { message: "Cpf invalido", excludeEmptyString: false }).required("Cpf inválido"),
    birthday: yup.date().required("Data inválida"),
    last_name: yup.string().nullable(),
    education: yup.string().nullable(),
    base_diseases: yup.string().nullable(),
    food_profile: yup.string().nullable(),
    chewing_complaint: yup.string().optional().nullable(),
    reason_consultation: yup.string().optional().nullable(),
  }).required();

  const { reset, handleSubmit, watch, formState: { errors }, control, setError } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      first_name: "",
      last_name: "",
      cpf: "",
      birthday: null,
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { education, base_diseases, food_profile, chewing_complaint, reason_consultation, ...filteredData } = data;
    try {
      const response = await axiosInstance.post("/create-pacient", {...filteredData, doc_id:user.doc_id });
      setPac_id(response.data.pac_id);
      navigation.navigate("StructuralAnalysis");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if(e?.response){
        return setError("cpf", {message:"Paciente já existe."})
      }
      return setError("cpf", {message:"Sem conceão com a internet, tente novamanete"})
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerChildren}>
        <Controller control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
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
              value={value}
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
            <TextInput
              value={value}
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
        <Button disabled={loading} loading={loading} style={styles.button} buttonColor='#36B3B9' mode="contained" onPress={handleSubmit(onSubmit)}>
          Enviar
        </Button>
      </ScrollView>
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
