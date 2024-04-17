import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import api from '../config/Api';
import { ContextPacient } from '../context/PacientContext';

const CurrentProtocol = ({navigation, route}) => {
    const { setPac_id, pac_id } = useContext(ContextPacient);
    const { protocolId } = route.params; 
    const [protocol, setProtocol] = useState(null);

    useEffect(() => {
        const fetchProtocol = async () => {
            try {
                const response = await api.get(`/info-session/${protocolId}`);
                setProtocol(response.data.protocol);
            } catch (error) {
                console.error(error);
                // Tratar erro
            }
        };
        fetchProtocol();
    }, [protocolId]);

    if (!protocol) {
        return <ActivityIndicator animating={true} color={"blue"} />;
    }

    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>{protocol.name}</Title>
                    <Paragraph>{protocol.description}</Paragraph>
                    <Paragraph style={{color:"green"}}>Status: {protocol.status ==="active" ? "Ativo" : "Inativo"}</Paragraph>
                </Card.Content>
            </Card>
            {protocol?.exercise_plans.map((plan, index) => (
                <Card key={index}>
                    <Card.Content>
                        <Title>Exercise  {index+1}</Title>
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
