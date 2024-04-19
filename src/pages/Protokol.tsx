import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, Text, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { BackHandler } from 'react-native';
import { FormatPacient } from '../interfaces/globalInterface';
import SkelectonView from '../components/SkelectonView';
import api from '../config/Api';
import { Sheet } from 'tamagui';
import HeaderSheet from '../components/HeaderSheet';
import { Context } from '../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import { AntDesign } from '@expo/vector-icons';
import { colorGreen, colorRed } from '../style/ColorPalette';

const Protokol = ({ navigation }) => {
    const { setPac_id, pac_id } = useContext(ContextPacient);
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    const [pacient, setPacient] = useState<FormatPacient>();
    const [protocols, setProtocols] = useState<any>([]);
    const [open, setopen] = useState<any>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [page, setPage] = React.useState(1);


    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get(`/info-pacient/${pac_id}`);
                    setPacient(response.data);
                } catch (error) {
                    setLoading(false)
                    console.error(error);
                    alert("Ocorreu um erro ao carregar os dados do paciente.");
                }

                try {
                    const protocol = await api.get(`last-sessions/${pac_id}/${user.doc_id}?pageSize=100&page=1`);
                    setProtocols(protocol.data);
                    console.log(protocol.data)
                    setLoading(false)

                } catch (error) {
                    console.error(error);
                    setLoading(false)

                    // alert("Ocorreu um erro ao carregar os protocolos.");
                }
            };

            fetchData();
        }, [pac_id, user.doc_id]) // Adicione as dependências necessárias
    );



    if (!pacient || loading) {
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
               
                snapPoints={[60,90,40]} >

                <Sheet.Overlay />

                <Sheet.Frame style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>

                    <HeaderSheet />

                    <FlatList
                    style={{top:10}}
                        data={protocols?.rows}
                        keyExtractor={(item) => item?.ses_id?.toString()} // Assumindo que o objeto tem um campo 'ses_id'
                        renderItem={({ item }) => (
                            <Card onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.navigate('CurrentProtocol', { protocolId: item?.ses_id });
                            }} style={{ marginBottom: 10 }}>
                                <Card.Title title={item?.protocol?.name} subtitle={`Data de Criação: ${dayjs(item?.protocol?.created_at).format("DD-MM-YYYY - hh-mm")}`} left={(props) => <AntDesign name='sharealt' size={30} iconColor='#36B3B9' />} />
                            </Card>
                        )}
                        onEndReachedThreshold={0.1} // Carregar mais itens quando o usuário chegar a 10% do final da lista
                        onEndReached={() => {
                            // Função para carregar mais itens ao alcançar o final da lista
                            setPage((prevPage) => prevPage + 1); // Aumentar a página
                        }}
                    />



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

                <Card onPress={() => { protocols?.count &&setModalVisible(!modalVisible) }} style={{ marginBottom: 10 }}>
                    <Card.Title style={{}} title={`${protocols?.count ? protocols?.count + " Sessões" : "Nenhuma sessão"}`
                    } left={(props) => !protocols?.count ? <AntDesign name='closecircleo' size={30} color={!protocols?.count ? colorRed : colorGreen} /> :
                        <AntDesign name='sharealt' size={30} color={colorGreen} />} />
                </Card>               

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
