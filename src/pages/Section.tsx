import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import api from '../config/Api';
import { AntDesign } from '@expo/vector-icons';
import SkelectonView from '../components/SkelectonView';
import CustomText from '../components/customText';
import { ActivityIndicator, Button, FAB, Modal, Searchbar } from 'react-native-paper';
import { colorPrimary } from '../style/ColorPalette';

export default function Section({ navigation }) {
  const [page, setPage] = useState(1);
  const [videosFono, setVideosFono] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const url = "https://fono-api-solitary-surf-9909.fly.dev/videos/"
  useEffect(() => {
    console.log("oiss")
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/list-exercise?pageSize=12&page=${page}`);
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
      <Searchbar
      value=''
                placeholder="Pesquisar pacientes"
                mode='bar'
                inputMode='search'
                iconColor='#407AFF'
                rippleColor={"#E8E8E8"}
                selectionColor={"#E8E8E8"}
                cursorColor={"gray"}
                style={{ borderBottomWidth:1 , borderColor:colorPrimary }}
            />

      <FlatList
        data={videosFono}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem({ item })}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
     <Modal
  visible={modalVisible}
  onDismiss={() => { alert("oii")}}
  contentContainerStyle={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }}
>
  <ScrollView style={{ backgroundColor: 'white', padding: 0, borderRadius: 15, maxHeight: "60%",  maxWidth: "95%",  minWidth: "95%" }}>
    <View style={{ alignItems: "flex-end" }}>
      <Button onPress={() => { setIsVideoLoading(true); setModalVisible(!modalVisible) }} labelStyle={{ fontSize: 22, color: "gray" }}>
        <AntDesign name="close" size={24} color="red" />
      </Button>
    </View>
    <CustomText style={{ textAlign: "center", fontSize: 18, padding: 12 }}>{selectedVideo?.name}</CustomText>
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {isVideoLoading && <ActivityIndicator size="large" color={colorPrimary} />}

      <Video
        style={{ width: "70%", height: 200, borderRadius: 25 }}
        source={{ uri: url + selectedVideo?.video_urls[0] }}
        resizeMode={ResizeMode.CONTAIN}
        onLoadStart={() => setIsVideoLoading(true)}
        isLooping={true}
        usePoster={true}
        shouldPlay={true}
        onLoad={() => setIsVideoLoading(false)}
      />
    </View>

    {!isVideoLoading && <View style={{ width: "100%", paddingTop: 10, paddingHorizontal: 18 }}>
      {selectedVideo?.description && <CustomText style={{ textAlign: "center", fontSize: 18, color: "blue" }}>Descrição</CustomText>}
      <CustomText style={{ textAlign: "center", fontSize: 15 }}>{selectedVideo?.description}</CustomText>

      {selectedVideo?.objective && <CustomText style={{ textAlign: "center", fontSize: 18, color: "blue" }}>Objetivo</CustomText>}
      <CustomText style={{ textAlign: "center", fontSize: 15 }}>{selectedVideo?.objective}</CustomText>

      {selectedVideo?.academic_sources && <CustomText style={{ textAlign: "center", fontSize: 18, color: "blue" }}>Referências</CustomText>}
      <CustomText fontFamily='Poppins_200ExtraLight_Italic' style={{ textAlign: "center", fontSize: 12 }}>{`" ${selectedVideo?.academic_sources} "`}</CustomText>
    </View>}
  </ScrollView>
</Modal>


      <View style={{
        flex: 1,
        position: 'relative',
      }}>
        <Button
          textColor='white'
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#36B3B9', // Cor de fundo do botão
          }}
          icon="plus"
          onPress={() => { }}
        >
          Salvar
        </Button>
      </View>

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
  },
});