import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationComponent = () => {
  useEffect(() => {
    // Define o manipulador de notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Agenda a notificação para ser exibida em 5 segundos
    const trigger = new Date().getTime() + 5000; // 5 segundos a partir de agora
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notificação Expo',
        body: 'Esta é uma notificação de exemplo.',
      },
      trigger,
    });

    // Limpa o manipulador de notificações quando o componente for desmontado
    return () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Componente de Notificação</Text>
    </View>
  );
};

export default NotificationComponent;
