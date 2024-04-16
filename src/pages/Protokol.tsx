import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { BackHandler } from 'react-native';
import { FormatPacient } from '../interfaces/globalInterface';
import SkelectonView from '../components/SkelectonView';
import api from '../config/Api';
import { Sheet } from 'tamagui';
import HeaderSheet from '../components/HeaderSheet';

const Protokol = ({ navigation }) => {
    const { setPac_id, pac_id } = useContext(ContextPacient);
    const [pacient, setPacient] = useState<FormatPacient>();
    const [protocols, setProtocols] = useState<any>([]);
    const [open, setopen] = useState<any>(false);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/info-pacient/${pac_id}`);
                alert(pac_id)
                setPacient(response.data);
            } catch (error) {
                console.error(error);
                alert("Ocorreu um erro ao carregar os dados do paciente.");
            }

            try {
                const protocol = await api.get(`/info-protocol/${pac_id}`);
                setProtocols(protocol.data);
            } catch (error) {
                console.error(error);
                alert("Ocorreu um erro ao carregar os protocolos.");
            }
        };

        fetchData();
    }, []);


    if (!pacient) {
        return <SkelectonView />
    }
    return (
        <View style={{ flex: 1 }}>


            <Sheet
                modal
                open={modalVisible}
                dismissOnSnapToBottom
                animation="medium"
                native
                onOpenChange={() => {
                    setModalVisible(false);
                    //setIsVideoPlaying(false)
                }
                }
                snapPoints={[50]} >

                <Sheet.Overlay />

                <Sheet.Frame style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>

                    <HeaderSheet />
                    <ScrollView>
                        <Text style={{ textAlign: "center", fontSize: 25 }}>Sessões </Text>
                        {[0,0,0,0,0,0,0,0,0,0,].map((item)=>(
                            <Card onPress={() => navigation.navigate("CurrentProtocol")} style={{ marginBottom: 10 }}>
                            <Card.Title title={protocols.name} left={(props) => <IconButton {...props} icon="star" iconColor='#36B3B9' />} />
                        </Card>
                        ))}

                        
                    </ScrollView>


                </Sheet.Frame>
            </Sheet>

            <ScrollView style={{ padding: 15 }}>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                    <Avatar.Text size={64} label={pacient?.person?.first_name[0]?.toUpperCase()} labelStyle={{ color: "white" }} style={{ marginBottom: 10, backgroundColor: "#36B3B9", }} />
                    <Title style={{ marginBottom: 10, }}>{pacient?.person?.first_name && pacient?.person?.first_name}</Title>
                </View>

                <View style={{ marginTop: 15, marginBottom: 40 }}>
                    <Button buttonColor='#36B3B9' icon="information" mode="contained" onPress={() => navigation.navigate("PatientInfo")} style={{ marginBottom: 10 }}>
                        Info. Cadastral
                    </Button>

                    <Button buttonColor='#36B3B9' icon="clipboard-text" mode="contained" onPress={() => { navigation.navigate("AnsweredQuestions") }} style={{ marginBottom: 10 }}>
                        Avaliação fonoaudiologica
                    </Button>
                </View>

                <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 18 }}>Sessões do usuário:</Text>

                <Card onPress={() => { setModalVisible(!modalVisible) }} style={{ marginBottom: 10 }}>
                    <Card.Title style={{}} title={"10 Sessões"} left={(props) => <IconButton {...props} icon="star" size={40} iconColor='#36B3B9' />} />
                </Card>

                {/*
                  <Card onPress={() => navigation.navigate("CurrentProtocol")} style={{ marginBottom: 10 }}>
                    <Card.Title title={protocols.name} left={(props) => <IconButton {...props} icon="folder" iconColor='#36B3B9' />} />
                    <Card.Content>
                        <Paragraph>{`  Status ${protocols.status}`}</Paragraph>
                    </Card.Content>
                </Card>
                */}



                <Text>{JSON.stringify(protocols.exercise)}</Text>
            </ScrollView>


            <View style={{ bottom: 10 }}>
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
            </View>
        </View>

    );

};

export default Protokol;
