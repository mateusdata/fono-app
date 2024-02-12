import React, { useEffect, useState } from 'react';
import { View, Text,  TextInput } from 'react-native';
import { Button } from 'react-native-paper';

const App = () => {
  const [conexao, setConexao] = useState(null);
  const [mensage, setMensage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const websocket = new WebSocket('ws://dcd3-179-54-108-103.ngrok-free.app');
    setConexao(websocket);

    websocket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      websocket.send("Sua mensagem aqui"); 
    };

    websocket.onmessage = (e) => {
      console.log('Mensagem recebida do servidor:', e.data);
      setMensage(e.data);
    };

    websocket.onerror = (e:any) => {
      console.log('Erro:', e.message);
    };

    websocket.onclose = (e) => {
      console.log('Conexão fechada:', e.code, e.reason);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (conexao) {
      conexao.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <View style={{padding:20, gap:25}}>
      <Text>Aplicativo React Native com WebSocket</Text>
      <Text>{mensage}</Text>
      <TextInput
        value={inputMessage}
        onChangeText={setInputMessage}
        placeholder="Digite sua mensagem aqui"
      />
    <Button  mode='contained' onPress={sendMessage}>Mandar mensage</Button>
    </View>
  );
};

export default App;
