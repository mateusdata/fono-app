// HomePage.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context } from '../context/AuthProvider';
import { Button, Text } from 'tamagui';
import { Facebook, Circle } from 'react-content-loader/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomePage = () => {
  const { logOut, user } = useContext(Context);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 50, height: 50, backgroundColor: 'black', borderRadius: 30 }}>
        </View>
        <Text>
          {'Jose Alcanjo Valerios'}
        </Text>
      </View>
      <View style={styles.header}>
        <Ionicons name="logo-google-playstore" size={100} color="#799DEF" />
        <Text style={styles.headerText}>FONO APP </Text>
      </View>
      <View style={{ flexDirection: 'row', minWidth: '100%' }}>
        <View style={{ flex: 0.5 }}>
          <Text style={{ fontWeight: '100' }}>Total de pacientes</Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><Text style={{ fontWeight: 'bold' }}>150.000.000</Text><SimpleLineIcons name='eye' size={15} color='#36B3B9' /></View>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text style={{color:'#36B3B9'}}>Ver todos</Text>
        </View>
        
      </View>
      <View style={styles.welcomeContainer}>
        <View style={{flexDirection:'row', gap:10}}>
          <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}>
            <SimpleLineIcons name='eye' size={15} color='black' />
            <Text>Menu</Text>
          </View>
          <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}>
            <SimpleLineIcons name='eye' size={15} color='black' />
            <Text>Menu</Text>
          </View>
          <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}>
            <SimpleLineIcons name='eye' size={15} color='black' />
            <Text>Menu</Text>
          </View>
        </View>
        <View style={{minWidth:"auto", alignItems:'center'}}><MaterialIcons name="keyboard-arrow-down" size={20} color="black" /></View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    padding: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeContainer: {
    backgroundColor: '#36B3B9',
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
    backgroundColor: '#36B3B9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HomePage;
