import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, List } from 'react-native-paper';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import api from '../config/Api';
import { AntDesign } from '@expo/vector-icons';
import { FormatPacient } from '../interfaces/globalInterface';
import { Context } from '../context/AuthProvider';
import { ContextPacient } from '../context/PacientContext';
import { colorGreen, colorPrimary } from '../style/ColorPalette';
import SkelectonView from '../components/SkelectonView';
import * as  Animatable from "react-native-animatable"
import downloadPDF from '../utils/downloadPDF';


const AnsweredQuestions = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [answered, setAnswered] = useState([]);
  const { pac_id } = useContext(ContextPacient);
  const [pacient, setPacient] = useState<FormatPacient>();
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/info-pacient/${pac_id}`);
      setPacient(response.data);
    };
    fetchData();
  }, [pac_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`answered-questionnaire/${pac_id}`);
        setAnswered(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pac_id]);


  async function getPdf() {
    try {
      setLoading(true);
      const response: any = await api.get(`/generate-report/${pac_id}`)
      await downloadPDF(response?.data?.doc_url, response?.data?.doc_name, user?.token, setLoading)
    } catch (error) {
      console.error("Ocorreu um erro" + error.message)
      setLoading(false)
    }
  }


  const renderQuestions = (questions) => {
    return questions.map((question) => (
      <Animatable.View animation="" key={question.que_id} style={{ right: 30, padding: 10 }}>
        <Text style={{ flex: 1, fontSize: 18 }}>{question.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
          {question.alternatives.map((alternative, index) => (
            <Pressable
              key={index}
              style={{ marginRight: 10, right: 7, top: 8, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, backgroundColor: alternative === question.answer.alternative ? colorGreen : '#fff' }}
              onPress={() => handleAnswerClick(question.que_id, alternative)}
            >
              <Text style={{ color: alternative === question.answer.alternative ? '#fff' : '#007bff' }}>{alternative}</Text>
            </Pressable>
          ))}
        </View>
      </Animatable.View>
    ));
  };
  const renderAnamnese = () => {
    return (
      <Animatable.View animation="" style={styles.anamneseContainer}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.anamneseText}>{`Doença base: `}</Text>
          <Text style={[styles.anamneseText, styles.blueText]}>{`${pacient?.base_diseases}`}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.anamneseText}>{`Perfil alimentar: `}</Text>
          <Text style={[styles.anamneseText, styles.blueText]}>{`${pacient?.food_profile}`}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.anamneseText}>{`Queixas de deglutição: `}</Text>
          <Text style={[styles.anamneseText, styles.blueText]}>{`${pacient?.chewing_complaint}`}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.anamneseText}>{`Educação: `}</Text>
          <Text style={[styles.anamneseText, styles.blueText]}>{`${pacient?.education}`}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.anamneseText}>{`Motivo da consulta: `}</Text>
          <Text style={[styles.anamneseText, styles.blueText]}>{`${pacient?.consultation_reason}`}</Text>
        </View>
      </Animatable.View>
    );
  };


  const handleAccordionPress = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };



  const handleAnswerClick = (questionId, alternative) => {
    // Aqui você pode implementar a lógica para enviar a resposta para o servidor
    console.log(`Questão ${questionId} selecionada: ${alternative}`);
  };


  if (!pacient && !pacient?.person && !pacient?.person.first_name && !pacient?.questionnaires) {
    return <SkelectonView />
  }


  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={getPdf} style={styles.pressable}>
        <View style={styles.row}>
          <AntDesign name="pdffile1" size={34} color="red" />
          <Text style={styles.text}>{`Relatório de anamnese do paciente ${pacient?.person.first_name.split(' ')[0]}`}</Text>
        </View>
      </Pressable>
      {loading && <ActivityIndicator size="small" color={colorPrimary}/>}

      <List.Section title='Perguntas respondidas' titleStyle={{ color: "black", fontSize: 15, right: 10 }} style={{ gap: 0, }}>
        <List.Accordion
          title="Anamnese"
          titleStyle={{ color: expandedIndex === 0 ? colorGreen : "#2a7c6c" }}
          style={{ backgroundColor: "#E8E8E8", marginBottom: 10 }}
          left={(props) => <AntDesign name="Safety" style={{ top: 5, left: 5 }} color={expandedIndex === 0 ? colorGreen : "#2a7c6c"} size={24} />}
          expanded={expandedIndex === 0}
          onPress={() => handleAccordionPress(0)}>
          {renderAnamnese()}
        </List.Accordion>

        {answered && answered.map((item, index) => (
          <List.Accordion
            key={index + 1}
            titleStyle={{ color: expandedIndex === index + 1 ? colorGreen : "#2a7c6c" }}

            title={item.name}
            style={{ backgroundColor: "#E8E8E8", marginBottom: 10 }}
            left={(props) => <AntDesign name="Safety" style={{ top: 5, left: 5 }} color={expandedIndex === index + 1 ? colorGreen : "#2a7c6c"} size={24} />}
            expanded={expandedIndex === index + 1}
            onPress={() => handleAccordionPress(index + 1)}>
            {item.sections.map((section) => (
              <View key={section.qhs_id}>
                {renderQuestions(section.questions)}
              </View>
            ))}
          </List.Accordion>
        ))}

      </List.Section>
    </ScrollView>
  );
};

export default AnsweredQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  anamneseContainer: {
    padding: 10,
    marginHorizontal: -18,
    marginVertical: 5,
  },
  anamneseText: {
    fontSize: 18,
    marginBottom: 5,
  },
  blueText: {
    color: colorGreen,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
