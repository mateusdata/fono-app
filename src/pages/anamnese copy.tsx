import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import ErrorMessage from '../components/errorMessage';
const Anamnese = () => {
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm();

  const onSubmit = (data) => {
    // TODO: Enviar dados para o servidor
    alert('Dados enviados! \n' + data);
    
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.containerChildren}>
        <Controller control={control} rules={{
           required: "obrigatorio" 
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              mode='outlined'
              label="Paciente"
              activeOutlineColor="#376fe8" />
          )}
          name='first_name'
        />
        <ErrorMessage name={"first_name"} errors={errors} />

        <Controller control={control} rules={{
           required: "obrigatorio" 
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
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
            <TextInput
              onChangeText={onChange}
              mode='outlined'
              label="Paciente"
              activeOutlineColor="#376fe8" />
          )}
          name='paciente'
        />
        <ErrorMessage name={"paciente"} errors={errors} />

      </View>

      <Button loading style={styles.button} buttonColor='#36B3B9' mode="contained" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Button>
    </View>
  );
};

// ... styles remain the same

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

