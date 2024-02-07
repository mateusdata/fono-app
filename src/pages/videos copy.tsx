import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Dialog } from 'tamagui';
import { Entypo } from '@expo/vector-icons';
import CustomText from '../components/customText';
import axios from 'axios';

export default function Videos() {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [currentMenssage, setCurrentMensage] = useState("");
  const [videosFono, setVideosFono] = useState<any>([]);
  let newArrayVideos = [
    "bico_sustentado.mp4",
    "bocejo.mp4",
    "cara_de_assustada.mp4",
    "cara_de_brava.mp4",
    "cara_de_cheiro_ruim.mp4",
  ]
  useEffect(() => {
    let tempVideosFono = [];
   
    console.log("entrou aqui")
    for (let i = 1; i <= 4; i++) {
      tempVideosFono.push(`https://fono-api-solitary-surf-9909.fly.dev/videos/${newArrayVideos[i]}`);
      console.log(tempVideosFono + "\n\n");

    }
    setVideosFono(tempVideosFono);

  }, [])


  const handleVideoPress = (uri: any) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <CustomText fontFamily='Poppins_400Regular' style={{ textAlign: "center", fontSize: 22 }}> Reprodução de execicios</CustomText>
                                                                                                                                                                           
        {videosFono?.map((item, index) => (
          <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#d2d4db", marginVertical: 5 }} key={index} onPress={() => handleVideoPress(`https://fono-api-solitary-surf-9909.fly.dev/videos/${newArrayVideos[index+1]}`)}>
            <Video
              ref={video}
              style={styles.video1}
              source={{
                uri: item,
              }}
              resizeMode={ResizeMode.COVER}
              isLooping={false}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              usePoster={true}
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 35 }}>
              <View onTouchStart={() => setCurrentMensage(`Exercicio ${index + 1}°`)}>
                <CustomText>{`Execicio ${index + 1}°`}</CustomText>
                <CustomText>{`Essa é sucinta a descrição do ${index + 1}°`}</CustomText>
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

            {true &&
              <>
                <Dialog.Title key="title" textAlign='center' color={"$blue10"} >
                  {currentMenssage}
                </Dialog.Title>
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
                useNativeControls={true}
                resizeMode={ResizeMode.COVER}
                isLooping={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                usePoster={true}
                shouldPlay={true}
                isMuted={false}

              />


            </View>
            <Dialog.Description>

            </Dialog.Description>
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
    height: 350,
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