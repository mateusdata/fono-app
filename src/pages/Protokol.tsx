import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { BackHandler } from 'react-native';
import axiosInstance from '../config/axiosInstance';
import { useFocusEffect } from '@react-navigation/native';

const Protokol = ({ navigation }) => {
    const { setPac_id, pac_id } = useContext(ContextPacient);
    const [pacient, setPacient] = useState<any>([]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get(`/info-pacient/${pac_id}`)
            setPacient(response.data);
            console.log(JSON.stringify(response.data));
        }
        fetchData()
    },[]);

    return (
        <View style={{ padding: 15 }}
        >
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                <Avatar.Text size={64} label="M" labelStyle={{ color: "white" }} style={{ marginBottom: 10, backgroundColor: "#36B3B9", }} />
                <Title style={{ marginBottom: 10, }}>{pacient?.person?.first_name && pacient?.person?.first_name}</Title>                
            </View>

            <View style={{ marginTop: 15, marginBottom: 40 }}>
                <Button buttonColor='#36B3B9' icon="information" mode="contained" onPress={() => navigation.navigate("PatientInfo")} style={{ marginBottom: 10 }}>
                    Info. Cadastral{JSON.stringify(pacient?.first_name)}
                </Button>

                <Button buttonColor='#36B3B9' icon="clipboard-text" mode="contained" onPress={() => { navigation.navigate("AnsweredQuestions") }} style={{ marginBottom: 10 }}>
                    Questionário
                </Button>
            </View>

            <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 18 }}>Sessões do usuário:</Text>

            <Card style={{ marginBottom: 10 }}>
                <Card.Title title="Protocolo atual " left={(props) => <IconButton {...props} icon="folder" iconColor='#36B3B9' />} />
                <Card.Content>
                    <Paragraph>ATM1</Paragraph>
                    <Paragraph>06/02/2024</Paragraph>
                </Card.Content>
            </Card>

            {/* Adicione mais Cards para mais sessões */}

            <Button buttonColor='#36B3B9' icon="content-save" mode="contained" onPress={() => {
                alert("Protocolo salvo")
                setTimeout(() => {
                    navigation.navigate("Root");
                }, 2000);
            }} style={{ marginTop: 10 }}>
                Salvar Protocolo
            </Button>

            <Button buttonColor='#F04438' textColor='white' icon="content-save" mode="contained" onPress={() => {
                setPac_id(null)
                navigation.navigate("Root");
            }} style={{ marginTop: 10 }}>
                Encerar atendimento
            </Button>
        </View>
    );
};

export default Protokol;
