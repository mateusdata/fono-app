import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
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
import { colorGreen, colorPrimary, colorRed } from '../style/ColorPalette';
import * as Location from 'expo-location';
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import GlobalContext, { ContextGlobal } from '../context/GlobalContext';


const Protokol = ({ navigation }) => {

    const { setPac_id, pac_id } = useContext(ContextPacient);
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [pacient, setPacient] = useState<FormatPacient>();
    const [protocols, setProtocols] = useState<any>([]);
    const [open, setopen] = useState<any>(false);
    const [pdfName, setPdfName] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleFinished, setModalVisibleFinished] = useState(false);
    const [currentReport, setCurrentReport] = useState(null)
    const [progressPercentage, setProgressPercentage] = useState(0)
    const [isDownloading, setIsDownloading] = useState(false)
    const [page, setPage] = React.useState(0);

    const date = dayjs(new Date()).format("DD-MM-YYYY-HH-mm-ss-SSS");
    //const PDF_URI = `https://fono-api.vercel.app/generate-report/${pac_id}` // leve.

    // Rota para follow-up-report
    const name = "name"


    const { location, setLocation, thereSession, setThereSession } = useContext(ContextGlobal);

    useFocusEffect(() => {
        getLocation();
    });

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Error em localização", "Não será possível gerar relatório sem permissão de localização");
            console.error('Permissão para acessar a localização negada');
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    };


    useEffect(() => {
        if (pdfName !== "") {
            console.log("Entrou e mudou de nome")
            getPdf();
        }
        else {
            console.log("Errorc")

        }
    }, [pdfName]);


    const linkUrlPdf = [
        `https://fono-api.vercel.app/service-term/${pac_id}?price=${10}&number_of_sessions=${5}`,
        `https://fono-api.vercel.app/follow-up-report/${pac_id}?diagnoses=${name}&structural_assessment=${name}&functional_assessment=${name}&swallowing_assessment=${name}&general_guidelines=${name}&conclusion=${name}&next_steps=${name}`,
        `https://fono-api.vercel.app/discharg-report/1?medical_diagnoses=${name}&how_it_was_discovered=${name}&first_session_findings=${name}&therapeutic_plan=${name}&patients_progress=${name}&current_condition=${name}&referrals=${name}`
    ]
    const PDF_URI = linkUrlPdf[currentReport] // leve.
    // Rota para discharge-report

    //const PDF_URI = "https://www.mcfadden.com.br/assets/pdf/Flofi.pdf" // pesado

    function onDownloadProgress({
        totalBytesWritten,
        totalBytesExpectedToWrite,
    }: FileSystem.DownloadProgressData) {
        const percentage = (totalBytesWritten / totalBytesExpectedToWrite) * 100
        setProgressPercentage(percentage)
    }

    async function getPdf() {
        try {
            setIsDownloading(true)
            console.log(pdfName)
            const fileUri = FileSystem.documentDirectory + pdfName

            const downloadResumable = FileSystem.createDownloadResumable(
                PDF_URI,
                fileUri,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Substitua your_token_here pelo seu token de autenticação
                    },
                },
                onDownloadProgress
            )

            const downloadResponse = await downloadResumable.downloadAsync()

            if (downloadResponse?.uri) {
                await fileSave(downloadResponse.uri, pdfName)
                setProgressPercentage(0)
                setIsDownloading(false)
            }
        } catch (error) {
            Alert.alert("Download", "Não foi possível realizar o download.")
            console.error(error)
        }
    }

    async function fileSave(uri: string, filename: string) {
        if (Platform.OS === "android") {
            // Pega a pasta temporária.
            const directoryUri = FileSystem.cacheDirectory + filename

            // Lê o conteúdo do arquivo em formato base64
            const base64File = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            })

            // Escreve o conteúdo do arquivo no diretório.
            await FileSystem.writeAsStringAsync(directoryUri, base64File, {
                encoding: FileSystem.EncodingType.Base64,
            })

            // Abre o arquivo recém-criado
            await Sharing.shareAsync(directoryUri)
        } else {
            Sharing.shareAsync(uri)
        }
    }


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
            <View>
                {false ? (
                    <>
                        <Text selectable >Latitude: {location.latitude}</Text>
                        <Text selectable >Longitude: {location.longitude}</Text>
                    </>
                ) : (
                    <Text>{false && "Obtendo localização..."}</Text>
                )}
            </View>
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

                    <FlatList
                        style={{ top: 10 }}
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

            <Sheet
                modal
                open={modalVisibleFinished}
                dismissOnSnapToBottom
                animation="medium"
                native
                onOpenChange={() => { setModalVisibleFinished(false) }
                }

                snapPoints={[30]} >

                <Sheet.Overlay />

                <Sheet.Frame style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>

                    <HeaderSheet />

                    <ScrollView style={{ bottom: 10, paddingHorizontal: 15, paddingVertical: 20 }}>

                        <Button
                            loading={!!progressPercentage}
                            buttonColor={colorPrimary}
                            textColor='white'
                            icon="share"
                            mode="contained"
                            onPress={() => {
                                setCurrentReport(0);
                                //setPdfName(`Recibo de prestação de serviço ${pacient.person.first_name} - ${pacient.person.cpf}.pdf`);
                                setModalVisibleFinished(!modalVisibleFinished);
                                // Mover isso para depois de setPdfName
                                navigation.navigate("ServiceProvisionReceipt", { pacient: pacient })
                            }}
                            style={{ marginTop: 10 }}
                        >
                            Recibo de prestação de serviço
                        </Button>

                        <Button buttonColor={colorPrimary} textColor='white' icon="share" mode="contained" onPress={() => {
                            setCurrentReport(1)
                            //setPdfName(`Relatório de acompanhamento ${pacient.person.first_name} - ${pacient.person.cpf}.pdf`)
                            setModalVisibleFinished(!modalVisibleFinished);
                            navigation.navigate("MonitoringReportPdf", { pacient: pacient })
                        }} style={{ marginTop: 10 }}>
                            Relatório de acompanhamento
                        </Button>

                        <Button buttonColor={colorPrimary} textColor='white' icon="share" mode="contained" onPress={() => {
                            setCurrentReport(2)
                            //setPdfName(`Relatório de alta  ${pacient.person.first_name} - ${pacient.person.cpf}.pdf`)
                            navigation.navigate("DischargeReportPdf", { pacient: pacient })
                            setModalVisibleFinished(!modalVisibleFinished);
                        }} style={{ marginTop: 10 }}>
                            Relatório de alta
                        </Button>

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
                    <Button buttonColor={colorRed} mode='contained' onPress={() => {

                        setModalVisibleFinished(!modalVisibleFinished)
                    }}>gerar relatório</Button>

                </View>

                <Text style={{ marginBottom: 10, textAlign: "center", fontSize: 18 }}>Sessões do usuário: {String(thereSession)}</Text>

                <Card onPress={() => { protocols?.count && setModalVisible(!modalVisible) }} style={{ marginBottom: 10 }}>
                    <Card.Title style={{}} title={`${protocols?.count ? protocols?.count + " Sessões" : "Nenhuma sessão"}`
                    } left={(props) => !protocols?.count ? <AntDesign name='closecircleo' size={30} color={!protocols?.count ? colorRed : colorGreen} /> :
                        <AntDesign name='sharealt' size={30} color={colorGreen} />} />
                </Card>

            </ScrollView>


            <View style={{ bottom: 10, paddingHorizontal: 15 }}>
                <Button buttonColor={thereSession ? colorRed : '#38CB89' } icon="content-save" mode="contained" onPress={() => {
                    if (!thereSession){
                        setThereSession(true)
                        return navigation.navigate("Section");
                    }
                    navigation.navigate("Root");
                    setThereSession(false)

                     }} style={{ marginTop: 10 }}>
                    {`${thereSession ? "Encerar sessão" : " Iniciar sessão"}`}
                </Button>

            </View>
        </View>

    );

};

export default Protokol;
