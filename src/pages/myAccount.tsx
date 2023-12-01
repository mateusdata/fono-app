import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const MyAccount = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderColor: 'yellow', borderWidth: 1, flex: 0.5, alignItems: "center", marginTop: 40, marginBottom: 40 }}>
        <Image source={{ uri: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/24630_7E9A5B3C65889D88.jpg?w=1024" }} style={{ width: 100, height: 100, resizeMode: "contain", borderRadius: 50 }} />

        <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}> Agenlina Valerios Alves </Text>
        <Text style={{ color: "black", fontSize: 15, fontWeight: "100" }}> agenlina@gmail.com </Text>

        <Pressable>
          <View style={{ backgroundColor: "#d1dfff", width: "100%", padding: 10, borderRadius: 8, marginTop: 5, paddingHorizontal: 50 }}>
            <Text style={{ color: "#36B3B9", fontSize: 15, fontWeight: "800" }}> Indique  e ganhe 10% de bonus </Text>
          </View>
        </Pressable>
      </View>

      <View style={{ borderColor: 'red', borderWidth: 1, alignItems: "center", width: "100%", flex: 1 }}>
        <Pressable>
          <View style={{ backgroundColor: "#d1dfff", padding: 15, width: 340, borderRadius: 6, marginTop: 10, borderColor: 'blue', borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 1, width: 130 }}>
              <MaterialIcons name="info-outline" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Suas informações</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
          </View>
        </Pressable>

        <Pressable>
          <View style={{ backgroundColor: "#d1dfff", padding: 15, width: 340, borderRadius: 6, marginTop: 10, borderColor: 'blue', borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 1, width: 130 }}>
              <Ionicons name="ios-card" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Minha assinatura</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
          </View>
        </Pressable>

        <Pressable>
          <View style={{ backgroundColor: "#d1dfff", padding: 15, width: 340, borderRadius: 6, marginTop: 10, borderColor: 'blue', borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 1, width: 130 }}>
              <SimpleLineIcons name="user-female" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Indique e ganhe</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
          </View>
        </Pressable>

        <Pressable>
          <View style={{ backgroundColor: "#d1dfff", padding: 15, width: 340, borderRadius: 6, marginTop: 10, borderColor: 'blue', borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 1, width: 130 }}>
              <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Endereço</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
          </View>
        </Pressable>

        <Pressable>
          <View style={{ backgroundColor: "#d1dfff", padding: 15, width: 340, borderRadius: 6, marginTop: 10, borderColor: 'blue', borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 1, width: 130 }}>
              <Foundation name="comments" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Sugestão</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default MyAccount