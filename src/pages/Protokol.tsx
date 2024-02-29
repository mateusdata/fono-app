import React, { useContext } from 'react';
import { StatusBar, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton, Text } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';

const Protokol = ({navigation}) => {
    const {pacient} = useContext(ContextPacient);

    return (
        <View style={{ padding: 15 }}
        >

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                <Avatar.Text size={64} label="M" labelStyle={{color:"white"}} style={{ marginBottom: 10, backgroundColor:"#36B3B9", }} />
                <Title style={{ marginBottom: 10,}}>{pacient?.first_name?.toUpperCase()}</Title>
            </View>

            <View style={{marginTop:15, marginBottom:40}}>
                <Button buttonColor='#36B3B9' icon="information" mode="contained" onPress={() => navigation.navigate("PatientInfo")} style={{ marginBottom: 10 }}>
                    Info. Cadastral
                </Button>

                <Button buttonColor='#36B3B9' icon="clipboard-text" mode="contained" onPress={() => {navigation.navigate("AnsweredQuestions")}} style={{ marginBottom: 10 }}>
                    Questionário
                </Button>
            </View>

            <Text style={{ marginBottom: 10, textAlign:"center", fontSize:18}}>Sessões do usuário:</Text>

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
        </View>
    );
};

export default Protokol;
