import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Modal, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import api from '../config/Api';
import { AntDesign } from '@expo/vector-icons';
import SkelectonView from '../components/SkelectonView';
import CustomText from '../components/customText';
import { Button } from 'react-native-paper';

export default function Section({ navigation }) {
  const [page, setPage] = useState(1);
  const [videosFono, setVideosFono] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const url = "https://fono-api-solitary-surf-9909.fly.dev/videos/"
  useEffect(() => {
    console.log("oiss")
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/list-exercise?pageSize=30&page=${page}`);
        //alert("pegou os videos")
        setVideosFono(response.data.rows);
        console.log(response.data.rows)
        setLoading(false)
      } catch (error) {
        //alert("Verifique a conexão com a internet")
        setLoading(false)
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
    <Pressable onPress={() => handleVideoPress(item)} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#d2d4db", marginVertical: 5 }}>
      {false && <>
        <Video
          style={{ width: 60, height: 60 }}
          source={{ uri: item }}
          resizeMode={ResizeMode.COVER}

        />
        <Text>{item.replace(".mp4", "")}</Text>
      </>}

      <View style={{ padding: 10, flexDirection: 'row', justifyContent: "center", alignItems: "center", gap: 8, }}>
        <AntDesign name="play" size={30} color="#36B3B9" />
        <Text>{item?.name + " " + item?.exe_id}</Text>
      </View>

    </Pressable>
  );

  if (loading) {
    return <SkelectonView />
  }
  return (
    <View onTouchMove={() => { }} style={{ flex: 1 }}>
      <Text style={{ fontSize: 25, padding: 25 }}> Videos </Text>

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
        onRequestClose={() => setModalVisible(!modalVisible)}
        onTouchStart={() => alert("oii")}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ScrollView style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, maxHeight: "60%", }}>
            <CustomText style={{ textAlign: "center", fontSize: 18 }}>{selectedVideo?.name}</CustomText>
            <Button onPress={() => setModalVisible(!modalVisible)} >Fechar</Button>

            <Video
              style={{ width: "100%", height: 300, borderWidth: 2 }}
              source={{ uri: url + selectedVideo?.video_urls[0] }}
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
              usePoster={true}
              shouldPlay={true}
            />
            <View style={{ width: "90%", paddingTop: 10 }}>
              <CustomText style={{ textAlign: "center", fontSize: 18, color: "blue" }}>Descrição</CustomText>
              <CustomText style={{ textAlign: "center", fontSize: 15 }}>{selectedVideo?.description}</CustomText>
              <CustomText style={{ textAlign: "center", fontSize: 18, color: "blue" }}>Objetivo</CustomText>

              <CustomText style={{ textAlign: "center", fontSize: 15 }}>{selectedVideo?.objective}</CustomText>
              <CustomText style={{ textAlign: "center", fontSize: 18, color: "blue" }}>Referências</CustomText>

              <CustomText style={{ textAlign: "center", fontSize: 15 }}>{selectedVideo?.academic_sources}</CustomText>

            </View>
          </ScrollView>
        </View>
      </Modal>
      <Button icon="content-save"  buttonColor='#36B3B9' mode="text" onPress={() => console.log('Pressed')}>
       <CustomText style={{color:"white"}}> Salvar</CustomText>
      </Button>
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
