import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Vibration } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomText from '../components/customText';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../context/AuthProvider';
import LoadingComponent from '../components/LoadingComponent';
const LeadingPage = ({navigation}:any) => {
  const [currentPlan, setCurrentPlan] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchPlan = async () => {
      try {
        const response = await AsyncStorage.getItem("plan");
        setLoading(true);
        if (response != null) {
            return navigation.navigate("Root");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []); 
  
  if(loading){
    return <LoadingComponent/>
  }
 
  const linesTitle = [
    "Acesso ilimitado a plataforma",
    "Cadastro personalizados de alunos",
    "Acesso a todos os videos do aplicativo",
    "Acesso aos relatórios de pacientes",
  ];

  const linesPlanAnual = [
    "Anual",
    "R$ 84,90",
    "Cobrado a cada 12 meses",
    "Economize 70%",
  ];

  const linesPlanMonth = [
    "Semestral",
    "R$ 66,90",
    "Cobrado a cada 6 meses",
    "Economize 54%",
  ]

  const subscribePlan = () => {
    Vibration.vibrate();
    if (currentPlan == 1) {
      navigation.navigate("Root")
      AsyncStorage.setItem("plan", JSON.stringify({isSubscriber:true, plan:1, price:" R$ 84,90", duration:"12 meses", type:"Anual"}))
      alert("o plano escolhido é o anual com o valor de R$ 84,90")

      return
    };
    AsyncStorage.setItem("plan", JSON.stringify({isSubscriber:true, plan:2,  price:" R$ 66,90", duration:"6 meses", type:"Anual"}))
    navigation.navigate("Root")
    alert("o plano escolhido é o mensal com o valor de R$ 66,90");
  }


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
      <StatusBar translucent={true} style={'dark'} />
      <ScrollView>
        <View style={{ paddingHorizontal: 15, marginTop: 15, }}>
          <CustomText fontFamily='Poppins_600SemiBold' style={{ fontSize: 19 }}>
            Assine o Fonotheapp plus. Cancele a qualquer momento.
          </CustomText>

          <View >
            {linesTitle.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', gap: 2, top: 5 }}>
                <AntDesign style={{ top: 2 }} name="check" size={19} color="#38CB89" />
                <CustomText key={index} fontFamily='Poppins_300Light' style={{ fontSize: 13, top: 2 }}>
                  {item}
                </CustomText>
              </View>
            ))}
          </View>
          <CustomText fontFamily='Poppins_600SemiBold' style={{ fontSize: 18, textAlign: "center", marginVertical: 25 }}>
            Escolha um plano
          </CustomText>
          <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-end", top: 8, gap: 2, paddingRight: 20 }}>
            <MaterialCommunityIcons name="arrow-down-left" size={37} color="orange" />
            <Text style={{ textAlign: "right" }} >
              Mais em conta

            </Text>
          </View>
        </View>


        <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", gap: 7 }}>
          <Pressable onPress={() => setCurrentPlan(1)} style={
            {
              backgroundColor: currentPlan === 1 ? "#eaf9f2" : "#f4fcf8", borderWidth: 1.5, borderColor:
                currentPlan === 1 ? "#38CB89" : "gray", borderRadius: 8, padding: 14, width: "95%"
            }}>
            {linesPlanAnual.map((item, index) => (
              <View key={index}>

                <CustomText key={index} fontFamily='Poppins_500Medium' style={{ color: index === 3 ? "#F04438" : "black", fontSize: 17, textAlign: "center" }}>
                  {item}
                </CustomText>
              </View>
            ))}
          </Pressable>

          <Pressable onPress={() => setCurrentPlan(2)} style={
            {
              backgroundColor: currentPlan === 2 ? "#eaf9f2" : "#f4fcf8", borderWidth: 1.5, borderColor:
                currentPlan === 2 ? "#38CB89" : "gray", borderRadius: 8, padding: 14, width: "95%"
            }}>
            {linesPlanMonth.map((item, index) => (
              <CustomText key={index} fontFamily='Poppins_500Medium' style={{ color: index === 3 ? "#F04438" : "black", fontSize: 17, textAlign: "center" }}>
                {item}
              </CustomText>
            ))}
          </Pressable>
          <CustomText style={{ textAlign: "center", marginBottom: 20, paddingHorizontal: 30 }}>
            {` oi Nós te cobraremos R$ ${currentPlan === 1 ? "84,90" : "66,90"}. Fatura a cada ${currentPlan === 1 ? "12" : "6"} meses. Cancele qualquer momento.`}
          </CustomText>
        </View>

      </ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: "white" }}>
        <Pressable android_disableSound={false} onPress={subscribePlan} android_ripple={{ color: "white", foreground: false }} style={{
          backgroundColor: "#407aff", borderRadius: 23,
          padding: 5, alignItems: "center", justifyContent: "center",
          width: "90%", height: 48,
        }}>
          <CustomText fontFamily='Poppins_400Regular' style={{ color: "white", fontSize: 22 }}>
            Assine
          </CustomText>
        </Pressable>
        <View style={{ flexDirection: "row", marginVertical: 8, }}>
        
          <Pressable onPress={()=> navigation.navigate("TermsAndServices")} android_ripple={{color:"gray"}} >
          <CustomText fontFamily='Poppins_400Regular' style={{ color: "blue", fontSize: 14 }}>
            Termos e Serviços  - {" "}
          </CustomText>
          </Pressable>
          <Pressable onPress={()=> navigation.navigate("PolicyAndPrivacy")} android_ripple={{color:"gray"}}>
            <CustomText fontFamily='Poppins_400Regular' style={{ color: "blue", fontSize: 14 }}>
              Política de Privacidade
            </CustomText>
          </Pressable>
          
        </View>
      </View>
    </View>
  );
};
export default LeadingPage;
