import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import axiosInstance from '../config/axiosInstance';
import { FormatPacient } from '../interfaces/globalInterface';
import { cpf } from 'cpf-cnpj-validator';

const PatientInfo = () => {
  const {pac_id } = useContext(ContextPacient);
  const [pacient, setPacient] = useState<FormatPacient>();
  useEffect(() => {
    const fetchData = async () => {
        const response = await axiosInstance.get(`/info-pacient/${pac_id}`)
        setPacient(response.data);
    }
    fetchData()
},[]);

  return (
    <View style={{ padding: 15 }}>
      <Card style={{ marginBottom: 10, padding:2,  }}>
        <Card.Title title={ " " +pacient?.person?.first_name?.toUpperCase()} left={(props) => <IconButton {...props} icon="account" iconColor='#36B3B9' />  } />
    
      </Card>
      <Card style={{ marginBottom: 10, padding:2,  }}>
        <Card.Title title={ " CPF:  " + cpf.format(pacient?.person?.cpf)} left={(props) => <IconButton {...props} icon="card-account-details" iconColor='#36B3B9' />  } />
      </Card>

      <Card style={{ marginBottom: 10,  }}>
        <Card.Title title={" " +pacient?.person?.birthday} left={(props) => <IconButton {...props} icon="calendar" iconColor='#36B3B9' />  } />
        
      </Card>
    </View>
  );
};

export default PatientInfo;
