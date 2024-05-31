import React, { useContext, useEffect, useState } from 'react';
import { Alert, BackHandler, FlatList, Platform, ScrollView, Text, View } from 'react-native';
import { Avatar, Button, Card, Title } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { FormatPacient } from '../interfaces/globalInterface';
import SkelectonView from '../components/SkelectonView';
import api from '../config/Api';
import { Sheet } from 'tamagui';
import HeaderSheet from '../components/HeaderSheet';
import { Context } from '../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import { AntDesign } from '@expo/vector-icons';
import { colorGreen, colorPrimary, colorRed, colorSecundary } from '../style/ColorPalette';
import * as Location from 'expo-location';
import { ContextGlobal } from '../context/GlobalContext';
import CustomText from '../components/customText';
import * as  Animatable from "react-native-animatable"


const Protokol = ({ navigation }) => {

    const { pac_id, setPac_id } = useContext(ContextPacient);
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [pacient, setPacient] = useState<FormatPacient>();
    const [protocols, setProtocols] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [firstModal, setFirstModal] = useState<boolean>(true);
    const [page, setPage] = React.useState(0);
    const { setLocation, thereSession, setThereSession } = useContext(ContextGlobal);
    const { setIsFromRegistration, isFromRegistration } = useContext(ContextGlobal)

    useEffect(() => {
        setIsFromRegistration(true)
    }, [isFromRegistration])

    useEffect(() => {
        return () => backHandler.remove();
    }, [modalVisible]);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (modalVisible) {
            setModalVisible(false)
            return true
        }

        return false;
    });


    useEffect(() => {
        getLocation();
    }, [])

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Error em localização", "Não será possível gerar relatório sem permissão de localização");
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get(`/info-pacient/${pac_id}`);
                    setPacient(response.data);
                } catch (error) {
                    setLoading(false)
                }

                try {
                    const protocol = await api.get(`last-sessions/${pac_id}/${user.doc_id}?pageSize=100&page=1`);
                    setProtocols(protocol.data);
                    setLoading(false)

                } catch (error) {
                    setLoading(false)
                }
            };

            fetchData();
        }, [pac_id, user.doc_id])
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
                }
                }
                snapPoints={[40]} >

                <Sheet.Overlay />

                <Sheet.Frame style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>

                    <HeaderSheet />

                    {firstModal ?
                        <FlatList
                            style={{ top: 10 }}
                            data={protocols?.rows.reverse()}
                            keyExtractor={(item) => item?.ses_id?.toString()}
                            renderItem={({ item }) => (
                                <Card onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('CurrentProtocol', { protocolId: item?.ses_id });
                                }} style={{ marginBottom: 10 }}>
                                    { item?.protocol?.name && 
                                        <> 
                                            <Card.Title
                                                title={item?.protocol?.name}
                                                subtitle={`Data de Criação: ${dayjs(item?.protocol?.created_at).format("DD-MM-YYYY - hh-mm")}`}
                                                left={(props) => <AntDesign name='sharealt' size={30} iconColor='#36B3B9' />}
                                            />
                                        </>
                                    }
                                </Card>
                            )}
                            onEndReachedThreshold={0.1}
                            onEndReached={() => {
                                setPage((prevPage) => prevPage + 1)
                            }}
                        />
                        :
                        <ScrollView style={{ bottom: 10, paddingHorizontal: 15, paddingVertical: 25 }}>
                            <Text style={{ textAlign: "center", fontSize: 22, marginVertical: 2 }} >Relatórios disponiveis</Text>

                            <Button
                                buttonColor={colorPrimary}
                                textColor='white'
                                icon={(props) => <AntDesign name="pdffile1" style={{ top: 0, left: 0 }} color={"white"} size={18} />}
                                mode="contained"
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate("ServiceProvisionReceipt", { pacient: pacient })
                                }}
                                style={{ marginTop: 10 }}
                            >
                                Recibo de prestação de serviço
                            </Button>

                            <Button buttonColor={colorPrimary} textColor='white' icon={(props) => <AntDesign name="pdffile1" style={{ top: 0, left: 0 }} color={"white"} size={18} />} mode="contained" onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("MonitoringReportPdf", { pacient: pacient })
                            }} style={{ marginTop: 10 }}>
                                Relatório de acompanhamento
                            </Button>

                            <Button buttonColor={colorPrimary} textColor='white' icon={(props) => <AntDesign name="pdffile1" style={{ top: 0, left: 0 }} color={"white"} size={18} />} mode="contained" onPress={() => {
                                navigation.navigate("DischargeReportPdf", { pacient: pacient })
                                setModalVisible(false);
                            }} style={{ marginTop: 10 }}>
                                Relatório de alta
                            </Button>

                        </ScrollView>
                    }
                </Sheet.Frame>
            </Sheet>

            <ScrollView style={{ padding: 15 }}>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                    <Avatar.Text size={64} label={`${pacient?.person.first_name.split(' ')[0]?.[0]?.toUpperCase()}${pacient?.person.first_name.split(' ')[1]?.[0]?.toUpperCase() || ''}`}
                        labelStyle={{ color: "white" }} style={{ marginBottom: 10, backgroundColor: "#36B3B9", }} />
                    <Title style={{ marginBottom: 10, }}>{pacient?.person?.first_name && pacient?.person?.first_name}</Title>
                </View>

                <View style={{ marginTop: 15, marginBottom: 40 }}>
                    <Button buttonColor='#36B3B9' icon="information" mode="contained" onPress={() => navigation.navigate("PatientInfo")} style={{ marginBottom: 10 }}>
                        Informação Cadastral
                    </Button>

                    <Button buttonColor='#36B3B9' icon="clipboard-text" mode="contained" onPress={() => { navigation.navigate("AnsweredQuestions") }} style={{ marginBottom: 10 }}>
                        Avaliação fonoaudiologica
                    </Button>
                    <Button icon={(props) => <AntDesign name="pdffile1" style={{ top: 0, left: 0 }} color={"white"} size={20} />} buttonColor={colorPrimary} mode='contained' onPress={() => {
                        setFirstModal(false)
                        setModalVisible(true)
                    }}>Gerear recibos e relatórios</Button>




                </View>

                <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 18 }}>Sessões do usuário</Text>

                <Animatable.View animation={protocols?.count ? "slideInUp" : ""} >
                    <Card onPress={() => {
                        if (protocols?.count) {
                            setFirstModal(true)
                            setModalVisible(true)
                        }
                    }} style={{ marginBottom: 10 }}>
                        <Card.Title style={{}} title={`${protocols?.count ? protocols?.count + " Sessões" : "Nenhuma sessão"}`
                        } left={(props) => !protocols?.count ? <AntDesign name='closecircleo' size={30} color={!protocols?.count ? colorRed : colorGreen} /> :
                            <AntDesign name='sharealt' size={30} color={colorGreen} />} />
                    </Card>
                </Animatable.View>


            </ScrollView>


            <View style={{ bottom: 10, paddingHorizontal: 15, marginHorizontal: 5, paddingBottom: Platform.OS === "ios" && 20 }}>
                <Button buttonColor={thereSession ? colorRed : '#38CB89'} icon="content-save" mode="contained" onPress={() => {
                    if (!thereSession) {
                        return navigation.navigate("Section");
                    }

                    setPac_id(null)
                    navigation.navigate("Root");
                    setThereSession(false)
                }} style={{ marginTop: 10 }}>
                    {`${thereSession ? "Sair" : " Iniciar sessão"}`}
                </Button>

            </View>
        </View>
    );
};

export default Protokol;
