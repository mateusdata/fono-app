import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Formulario = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // TODO: Enviar dados para o servidor
    alert('Dados enviados! \n' + data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Nome completo"
        mode="outlined"
        {...register('nome', { required: true })}
        value={watch('nome')} // Directly access value using watch
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

      <TextInput
        style={styles.input}
        label="CPF"
        mode="outlined"
        {...register('cpf', { required: true })}
        value={watch('cpf')}
      />
      {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}

      <TextInput
        style={styles.input}
        label="Data de nascimento"
        mode="outlined"
        {...register('dataNascimento', { required: true })}
        value={watch('dataNascimento')}
      />
      {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento.message}</Text>}

      <Button style={styles.button} mode="contained" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Button>
    </View>
  );
};

// ... styles remain the same

export default Formulario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default Formulario;
