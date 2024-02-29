import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';

const PatientInfo = () => {
  const {pacient} = useContext(ContextPacient);
  return (
    <View style={{ padding: 15 }}>
      <Card style={{ marginBottom: 10, padding:2,  }}>
        <Card.Title title={pacient?.first_name?.toUpperCase()} left={(props) => <IconButton {...props} icon="account" iconColor='#36B3B9' />  } />
        <Card.Content>
          <Paragraph>Paciente atual</Paragraph>
        </Card.Content>
      </Card>
      <Card style={{ marginBottom: 10, padding:2,  }}>
        <Card.Title title={pacient?.cpf} left={(props) => <IconButton {...props} icon="card-account-details" iconColor='#36B3B9' />  } />
        <Card.Content>
          <Paragraph>Paciente atual</Paragraph>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 10,  }}>
        <Card.Title title="26/12/1990" left={(props) => <IconButton {...props} icon="calendar" iconColor='#36B3B9' />  } />
        <Card.Content>
          <Paragraph>Paciente atual</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PatientInfo;
