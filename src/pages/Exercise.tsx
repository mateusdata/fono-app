// HomePage.js
import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Button, Input, XStack, YStack, Card, Text } from 'tamagui';
import { AntDesign } from '@expo/vector-icons';

const Exercise = () => {
  return (
    <YStack style={{flex:1, borderWidth:1, alignItems:'center'}}>
      <XStack style={{ flex: 0.2, alignItems: 'center', marginBottom:50}}><Input width='$19' style={{ paddingLeft: 35 }} /><AntDesign name='search1' size={20} style={{ position: 'absolute', marginLeft: 10 }} /></XStack>
      <ScrollView style={{flex:0.8}}>
        {[0, 1, 2, 3, 4, 5].map((item) => <XStack width={'$19'} style={{ height: 100, borderWidth: 1, alignItems: 'center', marginBottom: 10 }}><Card backgroundColor={'$blue10Dark'} style={{ width: '100%', height: '100%' }}><XStack><Image source={{ uri: 'https://images.healthshots.com/healthshots/en/uploads/2023/05/10200007/exercise-770x436.jpg' }} style={{ width: 100, height: 100 }} /><XStack><Text>NICE</Text></XStack></XStack></Card></XStack>)}
      </ScrollView>
    </YStack>
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

export default Exercise;
