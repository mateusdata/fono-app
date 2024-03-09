import React, { useContext, useState } from 'react';
import { View, Pressable, Image, ScrollView, Animated, StyleSheet } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Square, Text, XStack, YStack } from 'tamagui';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomText from '../components/customText';
import { StatusBar } from 'expo-status-bar';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const Home = ({ navigation }: { navigation: any }) => {
  const [showAllCards, setShowAllCards] = useState<boolean>(false);
  const { logOut, user } = useContext(Context);
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>{user?.nick_name}</Title>
              <View style={styles.pacientsInfo}>
              <AntDesign name="medicinebox" size={20} color="#36B3B9" />
                <Paragraph> 10 Pacietes</Paragraph>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button textColor='#36B3B9' onPress={() => navigation.navigate("DetalhesPacientes")}>Ver todos</Button>
            </Card.Actions>
          </Card>
        </View>

        <YStack space='$2.5' style={{ width: '100%', height: '100%', marginTop: 40 }}>
          <XStack space='$2.5' style={{ justifyContent: 'center', borderWidth: 0 }}>

            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("Anamnese")} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <AntDesign name="addfile" size={20} color="#36B3B9" />
              <CustomText>Paciente</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("AccompanyPatient")} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
            <AntDesign name="adduser" size={20} color="#36B3B9" />
              <CustomText>Acompanhar</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("Exercise")} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <SimpleLineIcons name='chart' size={20} color='#36B3B9' />
              <CustomText>Exercícios</CustomText>
            </Pressable >
          </XStack>
          <XStack space='$2.5' style={{ justifyContent: 'center', borderWidth: 0 }}>

            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("Protokol")} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <AntDesign name="Safety" size={20} color="#36B3B9" />
              <CustomText>Protocolo</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <SimpleLineIcons name='badge' size={20} color='#36B3B9' />
              <CustomText>Relatorios</CustomText>
            </Pressable >
            <Pressable android_ripple={{ color: "#36B3B9" }} onPress={() => navigation.navigate("Exercise")} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
              <SimpleLineIcons name='check' size={20} color='#36B3B9' />
              <CustomText>Exercícios</CustomText>
            </Pressable >
          </XStack>
          {showAllCards &&

            <Animated.View style={{ opacity: 1, direction: "rtl" }}>
              <XStack space='$2.5' style={{ justifyContent: 'center', borderWidth: 0 }}>
                <Pressable android_ripple={{ color: "#36B3B9" }} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
                  <AntDesign name="aliwangwang" size={20} color="#36B3B9" />
                  <CustomText>Recibos</CustomText>
                </Pressable>
                <Pressable android_ripple={{ color: "#36B3B9" }} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
                  <SimpleLineIcons name='calendar' size={20} color='#36B3B9' />
                  <CustomText>Ficha</CustomText>
                </Pressable>
                <Pressable android_ripple={{ color: "#36B3B9" }} style={{ backgroundColor: "white", width: 105, gap: 12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#E8E8E8' }}>
                  <SimpleLineIcons name='feed' size={20} color='#36B3B9' />
                  <CustomText>Menu</CustomText>
                </Pressable>
              </XStack>
            </Animated.View>
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
      <StatusBar style="auto" />
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
    flexDirection: "row", top: 5, alignItems: "center"
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
