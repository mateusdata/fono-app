import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../config/axiosInstance";
import { View } from "tamagui";
import { ScrollView, Text } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import CustomText from "../components/customText";

const StructuralAnalysis = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();
  const [analysis, setAnalysis] = useState<any>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);

  const onSubmit = async (data) => {
    const answers = selectedAnswers.map((answer, index) => ({
      qus_id: answer.qus_id,
      pac_id: 1, // Substitua pelo ID correto do paciente
      value: watch(`temControleOral[${index}]`), // Obtém o valor selecionado do React Hook Form
    }));

    try {
      const response = await axiosInstance.post("/answers", answers);
      navigation.navigate("FunctionalAnalysis");
    } catch (error) {
      console.log("error");
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
        <Controller
          rules={{ required: "Obrigatório" }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={{ borderWidth: 0 }}>
              {analysis?.sections?.map((section: any, sectionIndex: number) => (
                <View key={sectionIndex} style={{ borderBottomWidth: 1 }}>
                  <Text style={{ paddingBottom: 15 }}>{section.name}</Text>
                  {section?.questions?.map((question: any, questionIndex: number) => (
                    <View key={questionIndex}>
                      <RadioButton.Group
                        onValueChange={(selectedValue) => {
                          setSelectedAnswers((prevAnswers) => {
                            const updatedAnswers = [...prevAnswers];
                            updatedAnswers[sectionIndex * 10 + questionIndex] = {
                              qus_id: question.que_id,
                              name: question.name,
                              value: selectedValue,
                            };
                            return updatedAnswers;
                          });
                          onChange(selectedValue);
                        }}
                        value={value}
                      >
                        <CustomText fontFamily="Poppins_500Medium">{question.name}</CustomText>
                        {question?.alternatives?.map((alternative: any, alternativeIndex: number) => (
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
            </View>
          )}
          name="temControleOral"
          defaultValue=""
        />
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
