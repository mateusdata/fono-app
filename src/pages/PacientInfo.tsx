import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Avatar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { FormatPacient } from '../interfaces/globalInterface';
import { cpf } from 'cpf-cnpj-validator';
import api from '../config/Api';
import SkelectonView from '../components/SkelectonView';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colorPrimary } from '../style/ColorPalette';
import { useFocusEffect } from '@react-navigation/native';


const PatientInfo = ({navigation}) => {
  const { pac_id } = useContext(ContextPacient);
  const [pacient, setPacient] = useState<FormatPacient>();

  useFocusEffect(
    React.useCallback(() => {
       
      const fetchData = async () => {
        const response = await api.get(`/info-pacient/${pac_id}`)
        setPacient(response.data);
        console.log(response.data.person.birthday)
      }
      fetchData()
    }, [pac_id])
);

  

  if (!pacient) {
    return <SkelectonView />
  }
  return (
    <View style={{ padding: 15 }}>
      <Pressable onPress={() => navigation.navigate("UpdatePacient",{pacient:pacient})} android_ripple={{ color: colorPrimary }} style={{ flexDirection: "row", justifyContent: "flex-end", alignContent: "flex-end", }}>
        <Text style={{ textAlign: "center", top: 2 }}>editar</Text>
        <MaterialIcons name="edit-square" size={28} color={"orange"} />
      </Pressable>
      <Card style={{ marginBottom: 10, padding: 2, }}>
        <Card.Title title={" " + pacient?.person?.first_name?.toUpperCase()} left={(props) => <IconButton {...props} icon="account" iconColor='#36B3B9' />} />
      </Card>
      <Card style={{ marginBottom: 10, padding: 2, }}>
        <Card.Title title={" CPF:  " + cpf.format(pacient?.person?.cpf)} left={(props) => <IconButton {...props} icon="card-account-details" iconColor='#36B3B9' />} />
      </Card>

      <Card style={{ marginBottom: 10, }}>
        <Card.Title title={" " + dayjs(pacient?.person?.birthday).format('DD/MM/YYYY')} left={(props) => <IconButton {...props} icon="calendar" iconColor='#36B3B9' />} />

      </Card>
    </View>
  );
};

export default PatientInfo;
