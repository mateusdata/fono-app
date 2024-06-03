import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Searchbar, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Context } from '../context/AuthProvider';
import { ContextPacient } from '../context/PacientContext';
import api from '../config/Api';
import * as  Animatable from "react-native-animatable"
import CustomText from '../components/customText';

const UnansweredQuestions = ({ navigation }) => {

    const { logOut, user } = useContext(Context);
    const { setPac_id, pac_id } = useContext(ContextPacient);

    const [searchQuery, setSearchQuery] = useState('');
    const [pacients, setPacients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/pending-pacients/${user.doc_id}`)
                console.log(response.data.pacients)
                setPacients(response?.data.pacients);
            } catch (error) {

            }
        }
        fetchData()
    }, [])
    
    const onChangeSearch = async (search) => {
        setSearchQuery(search)
        try {

            const response = await api.get(`/pending-pacients/${user.doc_id}`)
            console.log(response.data)
            setPacients(response?.data);
        } catch (error) {

        }

    };

    return (
        <View style={{ paddingHorizontal: 8, paddingVertical: 5 }}>
            <CustomText style={{fontSize:18, padding:10, CustomTextAlign:"center"}}>Pacientes com cadastro incompletos</CustomText>

            <View>
                <Animatable.View animation="fadeInLeft">
                    <FlatList
                        data={pacients}
                        style={{ top: 5, marginTop: 5, paddingLeft: 6 }}
                        keyExtractor={(item) => item?.pac_id}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => {
                                setPac_id(item?.pac_id);
                                navigation.navigate((!!!item?.base_diseases) ? "PatientQuestionnaire" : "Anamnese")
                            }} android_ripple={{ color: "#36B3B9" }}>
                                <List.Item
                                    style={{ borderBottomWidth: 0.3, borderColor: "gray", width: "96%" }}
                                    title={item.first_name}
                                    description={`CPF: ${item?.person?.cpf}`}
                                    left={() => <MaterialIcons name="person" size={24} color="#36B3B9" style={{ top: 9, left: 6 }} />}
                                />
                            </Pressable>
                        )}
                    />
                </Animatable.View>
            </View>
        </View>
    );
};

export default UnansweredQuestions;
