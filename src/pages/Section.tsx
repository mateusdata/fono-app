import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Dialog } from 'tamagui';
import { Searchbar } from 'react-native-paper';
import { ContextPacient } from '../context/PacientContext';
import { FormatPacient } from '../interfaces/globalInterface';
import api from '../config/Api';
import SkelectonView from '../components/SkelectonView';

export default function Section({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [videosFono, setVideosFono] = useState<any>([]);
  const { pac_id } = useContext(ContextPacient);
  const [pacient, setPacient] = useState<FormatPacient>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/info-pacient/${pac_id}`);
      setPacient(response.data);
    };
    fetchData();
  }, [pac_id]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: pacient?.person?.first_name ? "Sessão - " + pacient?.person?.first_name : "" });
  }, [navigation, pacient?.person?.first_name]);

  useEffect(() => {
    const fetchVideos = async () => {
      alert("oi")

      const response = await api.get("/videos/list-exercise?pageSize=10&page=1");
      setVideosFono(response.data.rows.map((row: any) => row.video_urls.map((url: string) => `https://fono-api-solitary-surf-9909.fly.dev/videos/${url}`)).flat());
    };
    fetchVideos();
  }, []);

  const handleVideoPress = (uri: any) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  };

  if (!pacient?.person?.first_name) {
    return <SkelectonView />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontSize: 5 }}></Text>
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
          <Searchbar
            style={{ width: "90%" }}
            placeholder="Pesquisar vídeos"
            value={""}
          />
        </View>

        {videosFono?.map((item: string, index: number) => (
          <Pressable style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#d2d4db", marginVertical: 5 }} key={index} onPress={() => handleVideoPress(item)}>
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
              <View onTouchStart={() => setCurrentMessage(`Exercício ${index + 1}`)}>
                <Text>{`Exercício ${index + 1}`}</Text>
                <Text>{item.replace(".mp4", "")}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Dialog open={modalVisible}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay onPress={() => setModalVisible(!modalVisible)} />
          <Dialog.Content style={{ backgroundColor: "white" }}>
            {true && (
              <>
                <Dialog.Title textAlign='center' color={"$blue10"}>
                  {currentMessage}
                </Dialog.Title>
                <Dialog.Close />
              </>
            )}
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
            <Dialog.Description></Dialog.Description>
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
    elevation: 5
  }
});
