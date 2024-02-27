import React, { useContext, useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import axiosInstance from '../config/axiosInstance';
import PacientContext, { ContextPacient } from '../context/PacientContext';
import { StyleSheet, Text, View } from 'react-native';

const AnsweredQuestions = () => {
    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [answered, setAnswered] = useState([]);
    const { pac_id } = useContext(ContextPacient);
    const handlePress = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("answered-questionnaire/:pac_id");
                console.log(response.data)
                setAnswered(response.data);
            } catch (error) {
                alert("Erro")
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <List.Section title='Perguntas respondidas' style={{gap:0}}>
                <List.Accordion
                    title="Analise estrutural"
                    style={{backgroundColor:"#E8E8E8"}}
                    left={(props) => <List.Icon {...props} icon="printer" />}
                    expanded={expandedIndex === 1}
                    onPress={() => handlePress(1)}>
                    <List.Item title="Item 1" />
                    <List.Item title="Item 2" />
                    <List.Item title="Item 3" />
                </List.Accordion>
                <Text></Text>
                <List.Accordion
                    title="Analise funcional"
                    style={{backgroundColor:"#E8E8E8"}}
                    left={(props) => <List.Icon   {...props} icon="filter" />}
                    expanded={expandedIndex === 2}
                    onPress={() => handlePress(2)}>
                    <List.Item title="Item 1" />
                    <List.Item title="Item 2" />
                    <List.Item title="Item 3" />
                </List.Accordion>


            </List.Section>
        </View>
    );
};

export default AnsweredQuestions;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        padding:5,
        borderWidth:2
    }
})