import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Vibration } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { MaterialIcons } from '@expo/vector-icons';
import CustomText from '../components/customText';
import { AntDesign } from '@expo/vector-icons';
const LeadingPage = () => {
  const [s, setS] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<number>(1);
  useEffect(() => {
    setS(!s)
    Vibration.vibrate();
  }, []);
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

  }
  const selectedPlan = (value: number) => {
    alert(value)
    setCurrentPlan(value)
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
      <StatusBar translucent={true} style={'dark'} />
      <ScrollView>
        <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
          <CustomText fontFamily='Poppins_600SemiBold' style={{ fontSize: 18 }}>
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
        </View>


        <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", gap: 15 }}>
          <Pressable onPress={() => setCurrentPlan(1)} style={
            {
              backgroundColor: currentPlan === 1 ? "#eaf9f2" : "white", borderWidth: 1.5, borderColor:
                currentPlan === 1 ? "#38CB89" : "gray", borderRadius: 8, padding: 14, width: "95%"
            }}>
            {linesPlanAnual.map((item, index) => (
              <CustomText key={index} fontFamily='Poppins_500Medium' style={{ color: index === 3 ? "#F04438" : "black", fontSize: 17, textAlign: "center" }}>
                {item}

              </CustomText>
            ))}
          </Pressable>

          <Pressable onPress={() => setCurrentPlan(2)} style={
            {
              backgroundColor: currentPlan === 1 ? "#eaf9f2" : "white", borderWidth: 1.5, borderColor:
                currentPlan === 1 ? "#38CB89" : "gray", borderRadius: 8, padding: 14, width: "95%"
            }}>
            {linesPlanAnual.map((item, index) => (
              <CustomText key={index} fontFamily='Poppins_500Medium' style={{ color: index === 3 ? "#F04438" : "black", fontSize: 17, textAlign: "center" }}>
                {item}
              </CustomText>
            ))}
          </Pressable>
          <CustomText style={{ textAlign: "center", marginBottom: 20, paddingHorizontal: 30 }}>
            Nós te cobraremos Rs 84,90. Fatura a cada 12 meses. Cancele   qualquer momento
            {currentPlan}
          </CustomText>
        </View>

      </ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: "white" }}>
        <Pressable android_disableSound={false} onPress={() => { }} android_ripple={{ color: "white", foreground: false }} style={{
          backgroundColor: "#407aff", borderRadius: 23,
          padding: 5, alignItems: "center", justifyContent: "center",
          width: "90%", height: 48,
        }}>
          <CustomText fontFamily='Poppins_400Regular' style={{ color: "white", fontSize: 22 }}>
            Assine
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};
export default LeadingPage;
