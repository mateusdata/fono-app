import React from 'react';
import { Button, Linking, View } from 'react-native';

const App = () => {

  const handlePressWhatsAppMessage =  () => {
    const message = 'Olá Doutora Flavia Neves, tudo bem? Estou usando o app fonotheapp e quero tirar algumas dúvidas.';
    const url = `whatsapp://send?phone=557599787828&text=${message}`;
    const canOpen =  Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  const handlePressWhatsAppMessage2 = async () => {
    const message = 'Olá Doutora Flavia Neves, tudo bem? Estou usando o app fonotheapp e quero tirar algumas dúvidas.';
    const url = `whatsapp://send?phone=557599787828&text=${message}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View>
      <Button title="usando função normal" onPress={handlePressWhatsAppMessage} />
      <Button title="usando async await " onPress={handlePressWhatsAppMessage2} />
    </View>
  );
};

export default App;
