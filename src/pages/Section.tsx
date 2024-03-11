import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Button, ScrollView, Modal, TouchableWithoutFeedback, Pressable, Text, BackHandler } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Dialog } from 'tamagui';
import CustomText from '../components/customText';
import { Searchbar } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { FormatPacient } from '../interfaces/globalInterface';
import api from '../config/Api';
import SkelectonView from '../components/SkelectonView';

export default function Videos({navigation}) {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [currentMenssage, setCurrentMensage] = useState("");
  const [videosFono, setVideosFono] = useState<any>([]);
  const { setPac_id, pac_id } = useContext(ContextPacient);
    const [pacient, setPacient] = useState<FormatPacient>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/info-pacient/${pac_id}`)
            setPacient(response.data);
        }
        fetchData()
    },[]);
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: pacient?.person?.first_name ? "Sessão - " + pacient?.person?.first_name  + "ferreia porrto almeira soares da " : "" });
  }, [pacient?.person?.first_name]);

 api.get("/rota/",{params:{pageSize:10, page:500 }})
 
  let newArrayVideos = [
    "bico_sustentado.mp4",
    "bocejo.mp4",
    "cara_de_assustada.mp4",
    "cara_de_brava.mp4",
    "cara_de_cheiro_ruim.mp4",
    "degluticao_com_esforco.mp4",
    "escala_de_hiperagudo.mp4",
    "estalar_de_labios.mp4",
    "estalo_de_lingua.mp4",
    "exercicio_de_risorio.mp4",
  ]
  useEffect(() => {
    let tempVideosFono = [];
    for (let i = 1; i <= 4; i++) {
      tempVideosFono.push(`https://fono-api-solitary-surf-9909.fly.dev/videos/${newArrayVideos[i]}`);
    }
    setVideosFono(tempVideosFono);

  }, [])


  const handleVideoPress = (uri: any) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  }


  if(!pacient?.person?.first_name){
    return (
        <SkelectonView/>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontSize: 5 }}></Text>
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
          <Searchbar
            style={{ width: "90%" }}
            placeholder="Pesquisar videos"
            value={""}
          />
        </View>


        {videosFono?.map((item, index) => (
          <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#d2d4db", marginVertical: 5 }} key={index} onPress={() => handleVideoPress(`https://fono-api-solitary-surf-9909.fly.dev/videos/${newArrayVideos[index + 1]}`)}>
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
              <View onTouchStart={() => setCurrentMensage(`${newArrayVideos[index + 1].replace(".mp4", "")}`)}>
                <CustomText>{`Execicio ${index + 1}°`}</CustomText>
                <CustomText>{`${newArrayVideos[index + 1].replace(".mp4", "")}`}</CustomText>
              </View>

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

            <View style={{ backgroundColor: "white", width: "100%" }}>
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: selectedVideo,
                }}
                useNativeControls={false}
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
    backgroundColor: 'white',
  },
  video: {
    alignSelf: 'center',
    width: 275,
    height: 350,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    margin: 15,
    backgroundColor: '#f5f5f5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  video1: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    margin: 15,
    backgroundColor: '#f5f5f5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
