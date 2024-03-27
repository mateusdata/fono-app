import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { BackHandler } from 'react-native';
import { FormatPacient } from '../interfaces/globalInterface';
import SkelectonView from '../components/SkelectonView';
import api from '../config/Api';

const Protokol = ({ navigation }) => {
    const { setPac_id, pac_id } = useContext(ContextPacient);
    const [pacient, setPacient] = useState<FormatPacient>();
    const [protocols, setProtocols] = useState<any>([]);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/info-pacient/${pac_id}`)
            const protocol = await api.get(`/info-protocol/${pac_id}`)
            setProtocols(protocol.data)
            console.log(protocol.data)
            setPacient(response.data);
        }
        fetchData()
    }, []);

    if (!pacient) {
        return <SkelectonView />
    }
    return (
        <ScrollView style={{ padding: 15 }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                <Avatar.Text size={64} label="M" labelStyle={{ color: "white" }} style={{ marginBottom: 10, backgroundColor: "#36B3B9", }} />
                <Title style={{ marginBottom: 10, }}>{pacient?.person?.first_name && pacient?.person?.first_name}</Title>
            </View>

            <View style={{ marginTop: 15, marginBottom: 40 }}>
                <Button buttonColor='#36B3B9' icon="information" mode="contained" onPress={() => navigation.navigate("PatientInfo")} style={{ marginBottom: 10 }}>
                    Info. Cadastral
                </Button>

                <Button buttonColor='#36B3B9' icon="clipboard-text" mode="contained" onPress={() => { navigation.navigate("AnsweredQuestions") }} style={{ marginBottom: 10 }}>
                    Questionário 
                </Button>
            </View>

            <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 18 }}>Sessões do usuário:</Text>

                <Card onPress={() => navigation.navigate("CurrentProtocol")}  style={{ marginBottom: 10 }}>
                    <Card.Title title={protocols.name} left={(props) => <IconButton {...props} icon="folder" iconColor='#36B3B9' />} />
                    <Card.Content>
                        <Paragraph>{`  Status ${protocols.status}`  }</Paragraph>
                    </Card.Content>
                </Card>

            <Button buttonColor='#38CB89' icon="content-save" mode="contained" onPress={() => {
                navigation.navigate("Section");
            }} style={{ marginTop: 10 }}>
                Iniciar sessão
            </Button>

            <Button buttonColor='#F04438' textColor='white' icon="content-save" mode="contained" onPress={() => {
                setPac_id(null)
                navigation.navigate("Root");
            }} style={{ marginTop: 10 }}>
                Encerar sesão
            </Button>
            <Text>{JSON.stringify(protocols.exercise)}</Text>
        </ScrollView>
    );

};

export default Protokol;
