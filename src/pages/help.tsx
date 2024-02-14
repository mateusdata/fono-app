import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../components/customText';
const App = () => {

  const handlePressWhatsAppMessage = () => {
    const message = 'Olá Doutora Flavia Neves, tudo bem? Estou usando o app fonotheapp e quero tirar algumas dúvidas.';
    const url = `whatsapp://send?phone=557599787828&text=${message}`;
    const canOpen = Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
    }
  };
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor:"white"
    }}>
      <CustomText style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      }}>Entre em contato conosco</CustomText>
      <CustomText style={{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
      }}>Nossa equipe está pronta para ajudá-lo. Clique no botão abaixo para nos enviar uma mensagem no WhatsApp.</CustomText>
      <Pressable style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25D366',
        padding: 10,
        borderRadius: 5,
      }} onPress={handlePressWhatsAppMessage}>
        <Ionicons name="logo-whatsapp" size={25} color="white" />
        <CustomText style={{
          color: 'white',
          marginLeft: 10,
        }}>Enviar mensagem</CustomText>
      </Pressable>
    </View>
  );
};

export default App;
