// Anamnese.tsx
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import dayjs from 'dayjs';
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from 'react-native-reanimated-carousel';
import React from 'react';

interface value {
  name: string,
  cpf: string,
  birthday?: string
}

type v = 'name' | 'cpf' | 'birthday'

type Field = {
  name: v,
  label: string,
  rules: object,
  style: object,
}

const Anamnese = () => {

  const ref = React.useRef<ICarouselInstance>(null);
  const defaultValues: value = {
    name: '',
    cpf: '',
    birthday: undefined,
  }
  const { getValues, setValue, watch, register, control, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    mode: 'all'
  });

  const fields: Array<Array<Field>> = [[
    {
      name: 'cpf',
      label: 'CPF',
      rules: {
        required: { value: true, message: 'Obrigatório' },
        pattern: { value: /(\d{3}\.?){3}-?\d{2}/, message: '000.000.000-00' }
      },
      style: { borderColor: errors.cpf ? 'red' : 'blue', width: 250 },
    },
    {
      name: 'name',
      label: 'Nome',
      rules: {
        required: { value: true, message: 'Obrigatório' }
      },
      style: { borderColor: errors.name ? 'red' : 'blue', width: 250 },
    }]
  ];

  return (
    <View style={{ flexDirection: 'column', height: '100%' }}>
      <View style={{ flexDirection: 'row', maxHeight: 150, minWidth: 'auto', justifyContent: 'center' }}>
        <View style={{ borderWidth: 1, borderBlockColor: "black", borderRadius: 5 }}><AntDesign name="adduser" size={150} color="black" /></View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', borderWidth: 1, borderBlockColor: "black", rowGap: 25, height: '100%' }}>

        {/*
        <View style={{ width: 250 }}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Obrigatório' }
            }}
            render={({ field: { onChange, onBlur, value } }) =>
              <TextInput mode="outlined" textContentType='name' label='Nome' cursorColor="#000000" outlineStyle={{ borderColor: errors.cpf ? 'red' : 'blue' }} onBlur={onBlur} onChangeText={onChange} value={value} />
            }
            name="name"
          />
          {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
        </View>
        <View style={{ width: 250 }}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'Obrigatório' },
              pattern: { value: /(\d{3}\.?){3}-?\d{2}/, message: '000.000.000-00' }
            }}
            render={({ field: { onChange, onBlur, value } }) =>
              <TextInput mode="outlined" label='CPF' outlineStyle={{ borderColor: errors.cpf ? 'red' : 'blue' }} onBlur={onBlur} onChangeText={onChange} value={value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')} />
            }
            name="cpf"
          />

          {errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>}
        </View>
        <View style={{ width: 250 }}>
          <View style={{ marginBottom: 30 }}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Obrigatório' },
                validate: (val) => {
                  return (dayjs(val).isAfter(dayjs().subtract(100, 'year')) && dayjs(val).isBefore()) || 'Data inválida';
                }
              }}
              render={({ field: { onChange, onBlur, value } }) =>
                <TextInput mode="outlined" label='Data Nascimento' value={value?.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')} outlineStyle={{ borderColor: errors.cpf ? 'red' : 'blue' }} onBlur={onBlur} onChange={onChange} />
              }
              name="birthday"
            />
          </View>
          <Text>{dayjs(watch('birthday')?.split('/').reverse().join('-')).toString()}</Text>
          <Text>{watch('cpf')}</Text>
          {errors.birthday && <Text style={{ color: 'red' }}>{errors.birthday.message}</Text>}
        </View>
            */}
        <Carousel
          vertical
          style={{ borderWidth: 1, borderColor: "red" }}
          enabled
          ref={ref}
          testID='yeas'
          pagingEnabled={true}
          data={fields}
          snapEnabled={true}
          width={350 / 2}
          height={200}

          onSnapToItem={index => console.log("current index:", index)}
          renderItem={({ item }) => <>{item.map((field, index) =>
            <Controller
              control={control}
              name={field.name}
              rules={field.rules}
              render={({ field: { onChange, onBlur, value } }) => <TextInput key={index} mode="outlined" label={field.label} outlineStyle={field.style} value={value} onChangeText={onChange} onBlur={onBlur} />
              }
            />)}</>}

        />
      </View>
    </View>
  );
};

{/*
            <Controller
              control={control}
              name={item.name}
              rules={item.rules}
              render={({ field: { onChange, onBlur, value } }) => <TextInput mode="outlined" label={item.label} outlineStyle={item.style} value={value} onChangeText={onChange} onBlur={onBlur} />
              }
            />*/}

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
