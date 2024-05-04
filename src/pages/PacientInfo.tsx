import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { FormatPacient } from '../interfaces/globalInterface';
import { cpf } from 'cpf-cnpj-validator';
import api from '../config/Api';
import SkelectonView from '../components/SkelectonView';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import * as  Animatable from "react-native-animatable"


const PatientInfo = () => {
  const { pac_id } = useContext(ContextPacient);
  const [pacient, setPacient] = useState<FormatPacient>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/info-pacient/${pac_id}`)
      setPacient(response.data);
      console.log(response.data.person.birthday)
    }
    fetchData()
  }, []);

  if (!pacient) {
    return <SkelectonView />
  }
  return (
    <View style={{ padding: 15 }}>

  
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
