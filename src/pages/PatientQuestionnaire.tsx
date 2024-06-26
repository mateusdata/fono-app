import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, ScrollView, Text, Alert } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import CustomText from "../components/customText";
import { ContextPacient } from "../context/PacientContext";
import { z } from "zod";
import SkelectonView from "../components/SkelectonView";
import api from "../config/Api";
import { colorPrimary } from "../style/ColorPalette";
import { ContextGlobal } from "../context/GlobalContext";
import { useFocusEffect } from '@react-navigation/native';
import { registerAnimation } from "react-native-animatable";
import LoadingComponent from "../components/LoadingComponent";
import Toast from "../components/toast";


const PatientQuestionnaire = ({ navigation }) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const { control, handleSubmit } = useForm();
  const [analysis, setAnalysis] = useState<any>({});
  const { pac_id, pacient } = useContext(ContextPacient);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [nextQuestinnaire, setnextQuestinnaire] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const { setIsFromRegistration, isFromRegistration } = useContext(ContextGlobal)



  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const response = await api.get(`/next-questionnaire/${pac_id}`);
          setAnalysis(response.data);
          setIsLoading(false);

        } catch (error) {
          if (error?.response?.status === 404) {
            navigation.navigate(isFromRegistration ? "Root" : "Protokol");
          }
          setIsLoading(false);
        }
      };
      fetchData();
    }, [nextQuestinnaire, isFromRegistration])
  );


  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: analysis?.name ? analysis?.name : "", headerShown: isFromRegistration ? false  : true  });
  }, [analysis?.name, isFromRegistration]);

  const answerSchema = z.object({
    pac_id: z.number().int().positive(),
    answers: z.array(z.object({
      que_id: z.number().int().positive(),
      alternative: z.string().max(150)
    })).min(1)
  });


 if(isFromRegistration){
  return <LoadingComponent/>;
 }
  if (isLoading) {
    return <>
      <SkelectonView delay={100} />
    </>;
  }

  const onSubmit = async () => {
    let formattedAnswers: any = Object.values(selectedAnswers).map((answer: any) => ({
      que_id: answer.qus_id,
      alternative: answer.value
    }));

    let data: any = {
      pac_id: pac_id,
      answers: formattedAnswers
    };
    try {
      answerSchema.parse(data); // Validate data against schema
      const response = await api.post("/answer-questionnaire", data);
      console.log("Seu estado de logogado via resgisto esta => ", isFromRegistration)
      setAnalysis({});
      setSelectedAnswers({});
      setnextQuestinnaire(!nextQuestinnaire);
    } catch (error) {
      console.log("error", error);
      if (!error.response) {
        setShowToast(true)
      }
    }
  };

  return (
    <View style={{ padding: 15, flex: 1 }}>

      <ScrollView style={{ flex: 0.9, marginBottom: 50 }}>
        {analysis?.sections?.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ borderBottomWidth: 1 }}>
            <Text style={{ paddingBottom: 15 }}>{section.name}</Text>
            {section?.questions?.map((question, questionIndex) => (
              <View key={questionIndex}>
                <RadioButton.Group
                  onValueChange={(selectedValue) => setSelectedAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [question.que_id]: {
                      qus_id: question.que_id,
                      name: question.name,
                      value: selectedValue,
                    }
                  }))}
                  value={selectedAnswers[question.que_id]?.value ?? null}
                >
                  <CustomText fontFamily="Poppins_500Medium">{question.name}</CustomText>
                  {question?.alternatives?.map((alternative, alternativeIndex) => (
                    <RadioButton.Item
                      key={alternativeIndex}
                      color={colorPrimary}
                      label={alternative}
                      value={alternative}
                    />
                  ))}
                </RadioButton.Group>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>


      <View style={{ position: "absolute", margin: 16, right: 0, bottom: 0, flex: 1 }}>
        <Button icon="arrow-right"
          disabled={loading} loading={loading} buttonColor='#36B3B9' mode="contained" onPress={handleSubmit(onSubmit)}>
          Próximo
        </Button>
      </View>
      <Toast visible={showToast} mensage={"Atribua pelo menos um campo"} setVisible={setShowToast} duration={2000} />

    </View>
  );
};

export default PatientQuestionnaire;