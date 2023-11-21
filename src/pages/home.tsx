// HomePage.js
import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context } from '../context/ AuthProvider';
import { Button,Text } from 'tamagui';

const HomePage = () => {
const {logOut} = useContext(Context);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>App </Text>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem-vindo ao App de Fonoaudiologia!</Text>
      </View>

      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutUsTitle}>Quem Somos</Text>
        <Text style={styles.aboutUsText}>
        Fonoaudiologia
        </Text>
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
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    backgroundColor: '#36B3B9',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeContainer: {
    backgroundColor: '#36B3B9',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
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
