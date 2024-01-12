import React from 'react';
import { View, Text, Button, Linking } from 'react-native';

const Help = () => {
    const sendMessage = () => {
        const message = 'Olá Doutora Flavia Neves, tudo bem? Estou usando o app fonotheapp e quero tirar algumas dúvidas.';
        const url = `https://api.whatsapp.com/send?phone=557599787828&text=Ol%C3%A1%20Doutora%20Flavia%20Neves,%20tudo%20bem?%20Estou%20usando%20o%20app%20fonotheapp%20e%20quero%20tirar%20algumas%20d%C3%BAvidas.`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            return Linking.openURL(url);
          } else {
            console.log("Não foi possível abrir o aplicativo de mensagens");
          }
        });
      };
      
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Whatsapp</Text>
      <Button color="green" title="Entrar em contato" onPress={sendMessage} />
    </View>
  );
};

export default Help;
