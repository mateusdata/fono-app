import React, { useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Searchbar, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const AccompanyPatient = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const patients = [
        {
            id: 1,
            name: 'João Silva',
            cpf: '123.456.789-00'
        },
        {
            id: 2,
            name: 'Maria Santos',
            cpf: '987.654.321-00'
        },
        {
            id: 3,
            name: 'Carlos Pereira',
            cpf: '456.789.123-00'
        },
        {
            id: 4,
            name: 'Ana Costa',
            cpf: '789.123.456-00'
        }
    ];

    const onChangeSearch = (query) => setSearchQuery(query);

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable android_ripple={{ color: "#36B3B9" }}>
                            <List.Item
                                style={{ borderBottomWidth: 0.3, borderColor: "gray", width: "96%" }}
                                title={item.name}
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
