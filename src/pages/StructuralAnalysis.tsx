import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../config/axiosInstance";
import { View, ScrollView, Text } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import CustomText from "../components/customText";
import { ContextPacient } from "../context/PacientContext";
import { z } from "zod";

const answerSchema = z.object({
  pac_id: z.number().int().positive(),
  answers: z.array(z.object({
    que_id: z.number().int().positive(),
    alternative: z.string().max(150)
  }))
});


const StructuralAnalysis = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const [analysis, setAnalysis] = useState<any>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const { pac_id } = useContext(ContextPacient);

  const onSubmit = async () => {
    const formattedAnswers = selectedAnswers.map((answer) => ({
      que_id: answer.qus_id,
      alternative: answer.value
    }));

    const data = {
      pac_id: 13,
      answers: formattedAnswers
    };
   // console.log("Data before validation:", data);
    try {
      answerSchema.parse(data); // Validate data against schema
      console.log("Funcounou \n\n\n\n\n ", data)
      const response = await axiosInstance.post("/answer-questionnaire", data);
      console.log(response.data)
      //navigation.navigate("FunctionalAnalysis");
    } catch (error) {
      //console.log(data)
      console.log("error", error);
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/info-questionnaire/4");
        setAnalysis(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ padding: 15, flex: 1 }}>
      <ScrollView style={{ flex: 0.9, marginBottom: 20 }}>
        <Text>ID do paciente: {pac_id}</Text>
        {analysis?.sections?.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ borderBottomWidth: 1 }}>
            <Text style={{ paddingBottom: 15 }}>{section.name}</Text>
            {section?.questions?.map((question, questionIndex) => (
              <View key={questionIndex}>
                <RadioButton.Group
                  onValueChange={(selectedValue) => setSelectedAnswers((prevAnswers) => {
                    const updatedAnswers = [...prevAnswers];
                    updatedAnswers[sectionIndex * 10 + questionIndex] = {
                      qus_id: question.que_id,
                      name: question.name,
                      value: selectedValue,
                    };
                    return updatedAnswers;
                  })}
                  value={selectedAnswers[sectionIndex * 10 + questionIndex]?.value}
                >
                  <CustomText fontFamily="Poppins_500Medium">{question.name}</CustomText>
                  {question?.alternatives?.map((alternative, alternativeIndex) => (
                    <RadioButton.Item
                      key={alternativeIndex}
                      color="green"
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
      <View style={{ borderWidth: 0, justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Button style={{ width: "100%" }} buttonColor="#36B3B9" mode="contained" onPress={handleSubmit(onSubmit)}>
          Próximo
        </Button>
      </View>
    </View>
  );
};

export default StructuralAnalysis;
