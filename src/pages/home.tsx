// Home.js
import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Button, Text, XStack, YStack } from 'tamagui';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomText from '../components/customText';

const Home = ({ navigation }: { navigation: any }) => {
  const { logOut, user } = useContext(Context);
  return (
   <>

     <ScrollView style={styles.container}>
      <View style={styles.header}>
       {false && 
       <>
        <Ionicons name="medkit-sharp" size={60} color="#38CB89" />
        <CustomText style={styles.headerText}>FONOTHERAPP</CustomText>
       </>
       }
      </View>
      <View style={{ flexDirection: 'row', minWidth: '100%' }}>
        <View style={{ flex: 0.5 }}>
          <CustomText style={{ fontWeight: '100' }}>Total de pacientes</CustomText>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><CustomText style={{ fontWeight: 'bold' }}>150.000.000</CustomText><SimpleLineIcons name='eye' size={20} color='#36B3B9' /></View>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <CustomText style={{ color: '#36B3B9' }}>Ver todos</CustomText>
        </View>

      </View>
      <YStack space='$2.5' style={{width:'100%', height:'100%', marginTop: 40}}>
        <XStack space='$2.5' style={{ justifyContent:'center', borderWidth:0}}>
          
          <Pressable onPress={()=>navigation.navigate("Anamnese")}  style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <AntDesign name="pluscircleo" size={20} color="green" />
            <CustomText>Paciente</CustomText>
          </Pressable >
          <Pressable  style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='eye' size={20} color='green' />
            <CustomText>Acompanhar</CustomText>
          </Pressable >
          <Pressable onPress={()=>navigation.navigate("Exercise")} style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='action-redo' size={20} color='green' />
            <CustomText>Exercícios</CustomText>
          </Pressable >
        </XStack>
        <XStack space='$2.5' style={{ justifyContent:'center', borderWidth:0}}>
          
          <Pressable onPress={()=>navigation.navigate("Anamnese")}  style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <AntDesign name="pluscircleo" size={20} color="green" />
            <CustomText>Paciente</CustomText>
          </Pressable >
          <Pressable  style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='eye' size={20} color='green' />
            <CustomText>Acompanhar</CustomText>
          </Pressable >
          <Pressable onPress={()=>navigation.navigate("Exercise")} style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='action-redo' size={20} color='green' />
            <CustomText>Exercícios</CustomText>
          </Pressable >
        </XStack>
        <XStack space='$2.5' style={{ justifyContent:'center', borderWidth:0}}>
          <View style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <AntDesign name="aliwangwang" size={20} color="green" />
            <CustomText>Recibos</CustomText>
          </View>
          <View style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='calendar' size={20} color='green' />
            <CustomText>Ficha</CustomText>
          </View>
          <View style={{backgroundColor:"white",  width: 100, gap:12, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#38CB89' }}>
            <SimpleLineIcons name='feed' size={20} color='green' />
            <CustomText>Menu</CustomText>
          </View>
        </XStack>
        <View style={{ minWidth: "auto", alignItems: 'center' }}><MaterialIcons name="keyboard-arrow-down" size={20} color="green" /></View>
        
      </YStack>
      
    </ScrollView>
    
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default Home;
