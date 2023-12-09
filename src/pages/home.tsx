// HomePage.js
import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Button, Text, XStack, YStack } from 'tamagui';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HomePage = ({ navigation }: { navigation: any }) => {
  const { logOut, user } = useContext(Context);
  return (
   <ScrollView>

     <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="logo-google-playstore" size={100} color="#38CB89" />
        <Text style={styles.headerText}>FONO APP: usuario bolleano é = {user.name}  </Text>
      </View>
      <View style={{ flexDirection: 'row', minWidth: '100%' }}>
        <View style={{ flex: 0.5 }}>
          <Text style={{ fontWeight: '100' }}>Total de pacientes</Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><Text style={{ fontWeight: 'bold' }}>150.000.000</Text><SimpleLineIcons name='eye' size={20} color='#36B3B9' /></View>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text style={{ color: '#36B3B9' }}>Ver todos</Text>
        </View>

      </View>
      <YStack space='$2.5' style={{width:'100%', height:'100%', marginTop: 10}}>
        <XStack space='$2.5' style={{ justifyContent:'center', borderWidth:0}}>
          
          <Pressable onPress={()=>navigation.navigate("Anamnese")}  style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <AntDesign name="pluscircleo" size={20} color="orange" />
            <Text>Paciente</Text>
          </Pressable >
          <Pressable  style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='eye' size={20} color='orange' />
            <Text>Acompanhar</Text>
          </Pressable >
          <Pressable onPress={()=>navigation.navigate("Exercise")} style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='action-redo' size={20} color='orange' />
            <Text>Exercícios</Text>
          </Pressable >
        </XStack>
        <XStack space='$2.5' style={{ justifyContent:'center', borderWidth:0}}>
          <View style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <AntDesign name="aliwangwang" size={20} color="orange" />
            <Text>Recibos</Text>
          </View>
          <View style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='calendar' size={20} color='orange' />
            <Text>Ficha</Text>
          </View>
          <View style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='feed' size={20} color='orange' />
            <Text>Menu</Text>
          </View>
        </XStack>
        <View style={{ minWidth: "auto", alignItems: 'center' }}><MaterialIcons name="keyboard-arrow-down" size={20} color="orange" /></View>
      </YStack>
      
      <Pressable style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </Pressable>
      
    </View>
    
   </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    padding: 20,
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeContainer: {

    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    gap: 10,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  aboutUsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  aboutUsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutUsText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#F04438',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#E8E8E8',
    fontWeight: 'bold',
  },
});

export default HomePage;
