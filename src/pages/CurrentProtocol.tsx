import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import api from '../config/Api';
import { ContextPacient } from '../context/PacientContext';

const CurrentProtocol = ({navigation}) => {
    const { setPac_id, pac_id } = useContext(ContextPacient);

    const [protocol, setProtocol] = useState(null);

    useEffect(() => {
        const fetchProtocol = async () => {
            const response = await api.get(`/current-protocol/${pac_id}?page=10&pageSize=1`);
            setProtocol(response.data.rows[0].sessions[0].protocol);
           // const responses = await api.get(`/current-protocol/9?page=10&pageSize=1`);
           // console.log(responses.data.rows[0].sessions[0].protocol.exercise_plans);
        };
        fetchProtocol();
    }, [pac_id]);

    if (!protocol) {
        return <ActivityIndicator animating={true} color={"blue"} />;
    }

    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>{protocol.name}</Title>
                    <Paragraph>{protocol.description}</Paragraph>
                    <Paragraph style={{color:"green"}}>Status: {protocol.status}</Paragraph>
                </Card.Content>
            </Card>
            {protocol?.exercise_plans.map((plan, index) => (
                <Card key={index}>
                    <Card.Content>
                        <Title>Plano</Title>
                        <Paragraph>Exercise Name: {plan.exercise.name}</Paragraph>
                        <Paragraph>Repetitions: {plan.repetitions}</Paragraph>
                        <Paragraph>Series: {plan.series}</Paragraph>                       
                        <Paragraph>Objective: {plan.exercise.objective}</Paragraph>
                    </Card.Content>
                </Card>
            ))}
            <Button onPress={() => navigation.goBack()}  icon="arrow-left" mode="contained" style={{ marginTop: 20, backgroundColor: '#36B3B9' }}>
                Voltar
            </Button>
        </View>
    );
};

export default CurrentProtocol;
