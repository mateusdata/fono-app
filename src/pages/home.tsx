import React, { useContext, useEffect, useState } from 'react';
import { View, Pressable, ScrollView, Animated, StyleSheet, BackHandler, ToastAndroid, Share, Text, Linking, Dimensions, RefreshControl } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Square, XStack, YStack } from 'tamagui';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomText from '../components/customText';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { ContextPacient } from '../context/PacientContext';
import api from '../config/Api';
import Toast from '../components/toast';
import NetInfo from "@react-native-community/netinfo";
import { colorPrimary, colorRed } from '../style/ColorPalette';
import SkelectonSmall from '../components/SkelectonSmall';
import * as  Animatable from "react-native-animatable"
import { ContextGlobal } from '../context/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Home = ({ navigation }: { navigation: any }) => {
  const [totalPacient, setTotalPacient] = useState<any>('');
  const { logOut, user } = useContext(Context);
  const { pac_id } = useContext(ContextPacient);
  const [showToast, setShowToast] = useState<boolean>(true);
  const [mensageToast, setMensageToast] = useState<string>("");
  const { setThereSession, thereSession } = useContext(ContextGlobal);

  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  const updateScreenDimensions = () => {
    setScreenHeight(Dimensions.get('window').height);
    setScreenWidth(Dimensions.get('window').width);
  };

  useEffect(() => {
    const dimensionsChangeListener = () => {
      updateScreenDimensions();
    };
    Dimensions.addEventListener('change', dimensionsChangeListener);

    return () => {
      // Não há necessidade de remover o ouvinte aqui
    };
  }, []);
  const [showAllCards, setShowAllCards] = useState<boolean>(screenHeight > 700 ? true : false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setShowToast(true)
        setMensageToast("Sem conexão com a internet")
        return;
      }
      setShowToast(false)

    });

    return () => {
      unsubscribe();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fectData()

    }, [pac_id && thereSession, user.doc_id])
  );

  const fectData = async () => {
    try {
      const response = await api.get(`/count-pacients/${user.doc_id}`);
      setTotalPacient(response?.data.num_pacients);
    } catch (error) {
      if (!error.response) {

      }
    }
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: '🎉 Olá amigos, venham conferir este super aplicativo de fonoaudiologia para médicos: 📱 https://fonotherapp.vercel.app/ 🎉',
        url: "https://fonotherapp.vercel.app/",
      });
    } catch (error) {
    }
  };

  const openSite = () => {
    Linking.openURL("https://fonotherapp.vercel.app/")
  }


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    fectData();
    setTimeout(() => {
      setRefreshing(false);
    }, 800)
  };
  return (
    <>

      <ScrollView
        refreshControl={
          <RefreshControl

            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.container}>

        <View style={styles.header}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={{ color: colorPrimary }} >{user?.nick_name}</Title>
              <View style={styles.pacientsInfo}>
                <Animatable.View animation="slideInLeft" style={styles.pacientsInfo}>
                  <AntDesign name="addusergroup" size={22} style={{ top: 0, left: 4 }} color="#36B3B9" />
                  <Paragraph >
                    {totalPacient !== '' ? (totalPacient === 1 ? " " + totalPacient +
                      "Paciente" : + totalPacient + " Pacientes ") : <SkelectonSmall />}
                  </Paragraph>

                </Animatable.View>

              </View>
            </Card.Content>
            <Card.Actions>
              <Button textColor='#36B3B9' onPress={() => navigation.navigate("AccompanyPatient")}>Ver todos</Button>
            </Card.Actions>
          </Card>
        </View>

        <YStack space='$2.5' style={{ width: '100%', height: '100%', marginTop: 40 }}>
          <XStack space='$2.5' style={{ justifyContent: 'center', borderWidth: 0 }}>

            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("CreatePacient")} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <AntDesign name="addfile" size={20} style={{ top: 4 }} color="#36B3B9" />
              <CustomText >Paciente</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("AccompanyPatient")} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <AntDesign name="adduser" size={20} style={{ top: 4 }} color="#36B3B9" />
              <CustomText>Acompanhar</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("Exercise")} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <SimpleLineIcons name='chart' size={20} style={{ top: 4 }} color='#36B3B9' />
              <CustomText>Exercícios</CustomText>
            </Pressable >
          </XStack>
          <XStack space='$2.5' style={{ justifyContent: 'center', borderWidth: 0 }}>

            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => {
              if (pac_id && thereSession) {
                return navigation.navigate("Protokol")
              }
              setMensageToast("Nenhum paciente em atendimento")
              setShowToast(true)
            }} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: thereSession ? 1 : 2, borderColor: thereSession ? colorRed : "#E8E8E8" }}>
             
              {thereSession ? <Animatable.View animation={"rubberBand"} iterationCount={"infinite"} iterationDelay={100}>
                <AntDesign name="arrowright" size={20} style={{ top: thereSession ? 9 : 4 }} color={thereSession ? "red" : "#36B3B9"} />
              </Animatable.View> :

                <AntDesign name="Safety" size={20} style={{ top: thereSession ? 9 : 4 }} color={thereSession ? "red" : "#36B3B9"} />
              }
              <CustomText style={{ textAlign: "center", color: thereSession ? "red" : "black" }}>{thereSession && `Contunuar`} Atendimento</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={handleShare} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <SimpleLineIcons name='badge' size={20} style={{ top: 4 }} color='#36B3B9' />
              <CustomText>Indique</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9", }} onPress={() => navigation.navigate("UnansweredQuestions")} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <SimpleLineIcons name='check' size={20} style={{ top: 9 }} color='#36B3B9' />
              <CustomText style={{ textAlign: "center" }}>Concluir Cadastro</CustomText>
            </Pressable >
          </XStack>
          {showAllCards &&

            <Animatable.View animation={"pulse"}>
              <XStack space='$2.5' style={{ justifyContent: 'center', borderWidth: 0 }}>
                <Pressable android_ripple={{ color: "#36B3B9" }} onPress={openSite} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
                  <MaterialCommunityIcons name="web" size={24} style={{ top: 0 }} color="#36B3B9" />
                  <CustomText>Site</CustomText>
                </Pressable>
                <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("FrequentlyAskedQuestions")} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
                  <SimpleLineIcons name='calendar' size={20} style={{ top: 10, paddingBottom: 5 }} color='#36B3B9' />
                  <CustomText>Perguntas frequentes</CustomText>
                </Pressable>
                <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("Feedback")} style={{ backgroundColor: "white", width: screenHeight > 700 ? 110 : 105, gap: 12, height: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
                  <SimpleLineIcons name='feed' size={20} style={{ top: 0 }} color='#36B3B9' />
                  <CustomText>Feedback</CustomText>
                </Pressable>
              </XStack>
            </Animatable.View>
          }
          <View
            onTouchStart={() => setShowAllCards(!showAllCards)} style={{ minWidth: "auto", alignItems: 'center' }}>

            <Square animation="quick" rotate={showAllCards ? '180deg' : '0deg'}>
              <MaterialIcons
                name={`${showAllCards ? "keyboard-arrow-down" : "keyboard-arrow-up"}`}
                size={35} color="#36B3B9" />
            </Square>
          </View>

        </YStack>

      </ScrollView>

      <Toast visible={showToast} mensage={mensageToast} setVisible={setShowToast} duration={6000} />

    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  header: {
    padding: 0,
  },
  pacientsInfo: {
    flexDirection: "row", top: 3, alignItems: "center", borderWidth: 0, gap: 5, right: 4,
  },
  card: {
    marginVertical: 5,
    backgroundColor: "#ECF2FF"

  },
  headerText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeContainer: {

    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    gap: 10,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  aboutUsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  aboutUsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutUsText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#F04438',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#E8E8E8',
    fontWeight: 'bold',
  },
});
