import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Searchbar, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Context } from '../context/AuthProvider';
import { ContextPacient } from '../context/PacientContext';
import api from '../config/Api';

const AccompanyPatient = ({navigation}) => {

    const { logOut, user } = useContext(Context);
    const { setPac_id, pac_id } = useContext(ContextPacient);

    const [searchQuery, setSearchQuery] = useState('');
    const [pacients, setPacients] = useState([]);

    useEffect(()=>{
      const fetchData = async () =>{
        try {
            const response = await api.post(`/search-pacient`,{doc_id:user.doc_id, search:""})
            setPacients( response?.data.slice(0, 8));
        } catch (error) {
        
        }
      }
      fetchData()
    },[])
    const onChangeSearch = async (search) => {
        setSearchQuery(search)
        try {
            const response = await api.post(`/search-pacient`,{doc_id:user.doc_id, search:search})
            setPacients(response?.data);
        } catch (error) {
        
        }
       
    };

    return (
        <View style={{padding:15}}>

           <Text></Text>
        
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
                    data={pacients}
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
