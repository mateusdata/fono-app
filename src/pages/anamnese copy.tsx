// Anamnese.tsx
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller, set } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import dayjs from 'dayjs';
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from 'react-native-reanimated-carousel';
import React, { useEffect, useState } from 'react';
import { Button, XStack } from 'tamagui';

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
  const [page, setPage] = useState<Number>(0);
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
        required: { value: true, message: 'CPF é obrigatório' },
        pattern: { value: /(\d{3}\.?){3}-?\d{2}/, message: '000.000.000-00' }
      },
      style: { borderColor: errors.cpf ? 'red' : 'blue' },
    },
    {
      name: 'name',
      label: 'Nome',
      rules: {
        required: { value: true, message: 'Nome é obrigatório' }
      },
      style: { borderColor: errors.name ? 'red' : 'blue' },
    },
    {
      name: 'birthday',
      label: 'Data de Nascimento',
      rules: {
        required: { value: true, message: 'Data de nascimento é brigatório' },
        validate: (val: any) => {
          return (dayjs(val).isAfter(dayjs().subtract(100, 'year')) && dayjs(val).isBefore()) || 'Data inválida';
        }
      },
      style: { borderColor: errors.birthday ? 'red' : 'blue' },
    }],
  [
    {
      name: 'cpf',
      label: 'CPF',
      rules: {
        required: { value: true, message: 'CPF é obrigatório' },
        pattern: { value: /(\d{3}\.?){3}-?\d{2}/, message: '000.000.000-00' }
      },
      style: { borderColor: errors.cpf ? 'red' : 'blue' },
    },
    {
      name: 'name',
      label: 'Nome',
      rules: {
        required: { value: true, message: 'Nome é obrigatório' }
      },
      style: { borderColor: errors.name ? 'red' : 'blue' },
    },
    {
      name: 'birthday',
      label: 'Data de Nascimento',
      rules: {
        required: { value: true, message: 'Data de Nascimento é obrigatório' },
        validate: (val: any) => {
          return (dayjs(val).isAfter(dayjs().subtract(100, 'year')) && dayjs(val).isBefore()) || 'Data inválida';
        }
      },
      style: { borderColor: errors.birthday ? 'red' : 'blue' },
    }],
  [
    {
      name: 'cpf',
      label: 'CPF',
      rules: {
        required: { value: true, message: 'CPF é brigatório' },
        pattern: { value: /(\d{3}\.?){3}-?\d{2}/, message: '000.000.000-00' }
      },
      style: { borderColor: errors.cpf ? 'red' : 'blue' },
    },
    {
      name: 'name',
      label: 'Nome',
      rules: {
        required: { value: true, message: 'Nome é origatório' }
      },
      style: { borderColor: errors.name ? 'red' : 'blue' },
    },
    {
      name: 'birthday',
      label: 'Data de Nascimento',
      rules: {
        required: { value: true, message: 'Data de Nascimento é obrigatório' },
        validate: (val: any) => {
          return (dayjs(val).isAfter(dayjs().subtract(100, 'year')) && dayjs(val).isBefore()) || 'Data inválida';
        }
      },
      style: { borderColor: errors.birthday ? 'red' : 'blue' },
    }]
  ];

  useEffect(() => { }, [page]);

  return (
    <View style={{ flexDirection: 'column', height: '100%', paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', maxHeight: 150, minWidth: 'auto', justifyContent: 'center' }}>
        <View style={{ borderWidth: 1, borderBlockColor: "black", borderRadius: 5 }}><AntDesign name="adduser" size={150} color="black" /></View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', borderWidth: 0, justifyContent:'space-between', height:450}}>
        <View style={{flexDirection: 'column', alignItems: 'center', borderWidth: 0,}}>
          <Carousel
            // style={{ borderWidth: 1, borderColor: "red" }}
            enabled
            ref={ref}
            testID='yeas'
            data={fields}
            width={300}
            height={300}
            defaultIndex={0}
            onProgressChange={(offsetProgress, absoluteProgress) => { setPage(Math.ceil(absoluteProgress)); console.log(Math.ceil(absoluteProgress)) }}
            renderItem={({ item, index }) => <View key={index} style={{ padding: 10, flexDirection: 'column', gap: 20 }}>{item.map((field, index2) =>
              <Controller
                control={control}
                name={field.name}
                rules={field.rules}
                render={({ field: { onChange, onBlur, value } }) => <TextInput key={index2} mode="outlined" label={field.label} outlineStyle={field.style} value={value} onChangeText={onChange} onBlur={onBlur} />
                }
              />)}</View>}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {(new Array(fields.length)).fill(0).map((element, index) => <View key={index * 100} style={{ width: 30, height: 10, borderWidth: 1, borderColor: 'black', borderRadius: 3, backgroundColor: page == index ? "#376fe8" : undefined }}></View>)}
          </View>
          <View>
            {errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>}
            {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
            {errors.birthday && <Text style={{ color: 'red' }}>{errors.birthday.message}</Text>}
          </View>
        </View>
        <XStack style={{ marginTop: 10, paddingRight: 10, borderWidth: 0, width: '100%', justifyContent: 'flex-end' }}>
          <Button onTouchEnd={() => { alert('passou') }} backgroundColor={'$green7Light'}>Hello</Button>
        </XStack>
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
