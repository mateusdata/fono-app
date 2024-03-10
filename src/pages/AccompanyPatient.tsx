import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Searchbar, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Context } from '../context/AuthProvider';
import axiosInstance from '../config/axiosInstance';
import { ContextPacient } from '../context/PacientContext';

const AccompanyPatient = ({navigation}) => {

    const { logOut, user } = useContext(Context);
    const { setPac_id, pac_id } = useContext(ContextPacient);

    const [searchQuery, setSearchQuery] = useState('');
    const [pacients, setPacients] = useState([]);
    const onChangeSearch = async (search) => {
        setSearchQuery(search)
        try {
            const response = await axiosInstance.post(`/search-pacient`,{doc_id:user.doc_id, search:search})
            setPacients(response?.data);
        } catch (error) {
        
        }
       
    };

    const filteredPatients = pacients.filter((patient) =>
        patient.first_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{padding:15}}>

           
        
            <Searchbar
                placeholder="Pesquisar pacientes"
                onChangeText={onChangeSearch}
                value={searchQuery}
                mode='bar'
                inputMode='search'
                iconColor='#407AFF'
                rippleColor={"#E8E8E8"}
                selectionColor={"#E8E8E8"}
                cursorColor={"gray"}
                style={{ width: '100%', backgroundColor: 'white' , borderWidth:1, borderColor:"#407AFF" }}
            />

            <View>

                <FlatList
                    data={filteredPatients}
                    style={{ top: 5, marginTop: 5, paddingLeft: 6 }}
                    keyExtractor={(item) => item?.pacient?.pac_id}
                    renderItem={({ item }) => (
                        <Pressable onPress={()=>{
                            setPac_id(item?.pacient?.pac_id);
                            navigation.navigate("Protokol")
                        }} android_ripple={{ color: "#36B3B9" }}>
                            <List.Item
                                style={{ borderBottomWidth: 0.3, borderColor: "gray", width: "96%" }}
                                title={item.first_name}
                                description={`CPF: ${item.cpf}`}
                                left={() => <MaterialIcons name="person" size={24} color="#36B3B9" style={{ top: 9, left: 6 }} />}
                            />
                        </Pressable>
                    )}
                />

            </View>
        </View>
    );
};

export default AccompanyPatient;
