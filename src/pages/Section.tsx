import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Modal, Button, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import api from '../config/Api';

export default function Section({ navigation }) {
  const [page, setPage] = useState(1);
  const [videosFono, setVideosFono] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [t, setT] = useState<any>(0)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/list-exercise?pageSize=9&page=${page}`);
        setT(response?.data)
        alert("pegou os videos")
        setVideosFono(prevVideos => [...prevVideos, ...response.data.rows.map((row: any) => row.video_urls.map((url: string) => `https://fono-api-solitary-surf-9909.fly.dev/videos/${url}`)).flat()]);
      } catch (error) {
        //alert("ocorreu um erro ao carregar mais vídeos");
      }
    };
    fetchVideos();
  }, [page]);

  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleVideoPress = (uri) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#d2d4db", marginVertical: 5 }}>
      <Video
        style={{ width: 60, height: 60 }}
        source={{ uri: item }}
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        usePoster={true}
      />
      <Text>{item.replace(".mp4", "")}</Text>
    </View>
  );

  return (
    <View onTouchMove={()=>handleEndReached} style={{ flex: 1 }}>
     <Text style={{fontSize:25, padding:25}}> tamanho do objeto de videos {JSON.stringify(t?.rows?.length)} </Text>
      <FlatList
        data={videosFono}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem({ item })}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Video
              style={{ width: 300, height: 300 }}
              source={{ uri: selectedVideo }}
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
              usePoster={true}
              shouldPlay={true}
            />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
