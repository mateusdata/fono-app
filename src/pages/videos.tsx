import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, ScrollView, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Dialog } from 'tamagui';
import { Entypo } from '@expo/vector-icons';
import CustomText from '../components/customText';

export default function Videos() {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleVideoPress = (uri: any) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
      <CustomText> Esse exercicio faz isso e aquilo</CustomText>
        {[0, 0, 0, 0].map((item, index) => (
          <Pressable style={{flexDirection:"row", alignItems:"center", backgroundColor:"#d2d4db", marginVertical:5}} key={index} onPress={() => handleVideoPress(`https://fono-api-solitary-surf-9909.fly.dev/public/v${index + 1}.mp4`)}>
            <Video
              ref={video}
              style={styles.video1}
              source={{
                uri: `https://fono-api-solitary-surf-9909.fly.dev/public/v${index + 1}.mp4`,
              }}
              resizeMode={ResizeMode.COVER}
              isLooping={true}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              usePoster={true}
            />
            <View style={{flexDirection:"row", alignItems:"center", gap:35}}> 
              <View>
              <CustomText>Acachamento com barra</CustomText>
              <CustomText>Esse exercicio faz isso e aquilo</CustomText>
              </View>
              <Entypo name="flag" size={24} color="blue" />

            </View>


          </Pressable>
        ))}
      </ScrollView>

      <Dialog open={modalVisible}  >

        <Dialog.Trigger />

        <Dialog.Portal  >

          <Dialog.Overlay key="overlay" onPress={() => setModalVisible(!modalVisible)} />

          <Dialog.Content key="content" style={{ backgroundColor: "white" }} >

            {false &&
              <>
                <Dialog.Title key="title" />

                <Dialog.Description />

                <Dialog.Close />
              </>
            }

            {/* ... */}
            <View style={{ backgroundColor: "white", width: "100%" }}>
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: selectedVideo,
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                usePoster={true}
                shouldPlay={false}
              />


            </View>
          </Dialog.Content>

        </Dialog.Portal>

      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    lignSelf: 'flex-start',
    width: 275,
    height: 300,
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    margin: 10
  },
  video1: {
    alignSelf: 'flex-start',
    width: 60,
    height: 60,
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,
    margin: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    padding: 7,
    borderRadius: 5,
  },
});
