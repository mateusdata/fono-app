// Anamnese.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Context } from '../context/AuthProvider';
import { AntDesign } from '@expo/vector-icons';
import { Input } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

const Anamnese = () => {
  const defaultValues = {
    name: '',
    cpf: '',
    birthday: '',

  }
  const { getValues, setValue, watch,register, control, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    mode: 'all'
  });

  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', maxHeight: 150, minWidth: 'auto', justifyContent: 'center' }}>
        <View style={{ borderWidth: 1, borderBlockColor: "black", borderRadius: 5 }}><AntDesign name="adduser" size={150} color="black" /></View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', borderWidth: 1, borderBlockColor: "black", rowGap: 5 }}>
        <View style={{ width: 250 }}>
          <Text>Nome:</Text>
          <Controller
            control={control}
            rules={{
              required:{value:true, message:'Obrigatório'}
            }}
            render={({ field: { onChange, onBlur, value } }) =>
              <Input style={{ borderColor: errors.name ? 'red' : 'blue' }} onBlur={onBlur} onChangeText={onChange} value={value}></Input>
            }
            name="name"
          />
          
          {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
        </View>
        <View style={{ width: 250 }}>
          <Text>CPF:</Text>
          <Controller
            control={control}
            rules={{
              required: {value:true, message:'Obrigatório'},
              pattern: {value:/\d{11}/,message:'000.000.000-00'}
            }}
            render={({ field: { onChange, onBlur, value } }) =>
              <Input style={{ borderColor: errors.cpf ? 'red' : 'blue' }} onBlur={onBlur} onChangeText={onChange} value={value}></Input>
            }
            name="cpf"
          />
          
          {errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>}
        </View>
        <View style={{ width: 250 }}>
          <Text>Birthday:</Text>
          <Controller
            control={control}
            rules={{
              required:{value:true, message:'Obrigatório'},
              pattern: {value:/\d{2}\/\d{2}\/\d{4}/,message:'dd/mm/yyyy'},
              validate: (val) => {
                if(!dayjs(val.split('/').reverse().join('-')).isValid()) return 'dd/mm/yyyy';
              }
            }}
            render={({ field: { onChange, onBlur, value } }) =>
              <Input style={{ borderColor: errors.birthday ? 'red' : 'blue' }} onBlur={onBlur} onChangeText={onChange} value={value}></Input>
            }
            name="birthday"
          />
          
          {errors.birthday && <Text style={{ color: 'red' }}>{errors.birthday.message}</Text>}

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    backgroundColor: '#36B3B9',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeContainer: {
    backgroundColor: '#36B3B9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  aboutUsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  aboutUsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutUsText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#36B3B9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Anamnese;
