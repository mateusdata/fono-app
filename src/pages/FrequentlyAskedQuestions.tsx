import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";

const FrequentlyAskedQuestions = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faq = [
    { title: "Como faço para logar?", description: "Para fazer login, clique no botão 'Login' e insira suas credenciais." },
    { title: "Onde encontro meu perfil?", description: "Seu perfil está na guia 'Perfil' do menu lateral." },
    { title: "Como agendo uma consulta?", description: "Vá para 'Agendamento' e siga as instruções para selecionar o horário." },
    { title: "Posso cancelar uma consulta?", description: "Sim, vá para 'Agendamento', selecione a consulta e cancele." },
    { title: "Ver resultados dos questionários?", description: "Os resultados estão em 'Resultados', onde você verá um resumo." },
    { title: "Compartilhar resultados?", description: "Compartilhe com seu médico em 'Resultados'." },
    { title: "App em outros idiomas?", description: "Atualmente, apenas em português, mas adicionaremos mais idiomas." }
  ];
  
  function handleAccordionPress(index) {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  }

  const renderFAQ = () => {
    return faq.map((item, index) => (
      <List.Accordion
        key={index}
        title={item.title}
        titleStyle={{ color: expandedIndex === index ? "#2a7c6c" : "black" }}
        style={{ backgroundColor: "#E8E8E8", marginBottom: 10 }}
        left={(props) => <AntDesign name="Safety" style={{ top: 5, left: 5 }} color={expandedIndex === index ? "#2a7c6c" : "black"} size={24} />}
        expanded={expandedIndex === index}
        onPress={() => handleAccordionPress(index)}
      >
        <Animatable.View animation="fadeIn" style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16 }}>{item.description}</Text>
        </Animatable.View>
      </List.Accordion>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Seção de Perguntas Frequentes */}
      <List.Section title='Perguntas frequentes' titleStyle={{ color: "black", fontSize: 18, marginBottom:10, right: 10 }} style={{ gap: 0 }}>
        {renderFAQ()}
      </List.Section>
    </View>
  );
};

export default FrequentlyAskedQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
});
