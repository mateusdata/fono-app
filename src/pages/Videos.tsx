import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable, ScrollView, Image, BackHandler } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import api from '../config/Api';
import { AntDesign } from '@expo/vector-icons';
import SkelectonView from '../components/SkelectonView';
import CustomText from '../components/customText';
import { ActivityIndicator, Button, FAB, Modal, Searchbar, TextInput } from 'react-native-paper';
import { colorPrimary, colorSecundary } from '../style/ColorPalette';
import { Dialog } from 'tamagui';
import dayjs from 'dayjs';
import * as yup from "yup"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Context } from '../context/AuthProvider';
import { ContextPacient } from '../context/PacientContext';
import { Sheet } from 'tamagui';
import HeaderSheet from '../components/HeaderSheet';

export default function Videos({ navigation }) {
  const [page, setPage] = useState(1);
  const [videosFono, setVideosFono] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const { user } = useContext(Context)
  const [search, setSearch] = useState("");
  const [changeList, setChangeList] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const url = "https://fono-api-solitary-surf-9909.fly.dev/videos/"

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (modalVisible) {
        setModalVisible(false)
        return true
      }
      return false;
    });

    return () => backHandler.remove();
  }, [modalVisible]);

  useEffect(() => {
    if (search === "") {
      // Se a busca estiver vazia, recarrega os vídeos
      setVideosFono([])
      setChangeList(!changeList); // Ou qualquer método que você use para recarregar os vídeos
      setPage(1)
    }
  }, [search]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/list-exercise?pageSize=15&page=${page}`);

        setVideosFono([...videosFono, ...response.data.rows]);
        console.log(response.data.rows)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };
    fetchVideos();
  }, [page, changeList]);




  const seachVideos = async () => {

    try {
      const response = await api.post(`/search-exercise`, { search });
      setVideosFono(response.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      setChangeList(!changeList)
    }
  }


  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleVideoPress = (uri) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => {
      handleVideoPress(item);
      setIsVideoPlaying(true)
    }}

      style={{
        flexDirection: "row", alignItems: "center", backgroundColor: "#d2d4db", marginVertical: 5
      }}>
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: "center", alignItems: "center", gap: 8, }}>
        <AntDesign name="play" size={30} color={"#36B3B9"} />
        <Text>{item?.name}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return <SkelectonView />
  }
  return (
    <View onTouchMove={() => { }} style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5 }}>
      <Searchbar
        onChange={seachVideos}
        onChangeText={(e) => setSearch(e)}
        value={search}
        placeholder="Pesquisar videos"
        mode='bar'
        inputMode='search'
        selectionColor={"gray"}
        cursorColor={"gray"}
        style={{ marginBottom: 10 }}

      />

      <FlatList
        data={videosFono}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem({ item })}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />

      <Sheet
        modal
        open={modalVisible}
        dismissOnSnapToBottom
        animation="medium"
        native
        onOpenChange={() => {
          setModalVisible(false);
          setIsVideoPlaying(false)
        }
        }
        snapPoints={[85]}

      >


        <Sheet.Overlay />

        <Sheet.Frame style={{ borderTopEndRadius: 15, borderTopStartRadius: 15 }}>

          <HeaderSheet />


          <ScrollView style={{ backgroundColor: 'transparent', maxWidth: "100%", minWidth: "100%" }}>
            <CustomText style={{ textAlign: "center", fontSize: 18, marginTop: 12, color: colorSecundary, paddingHorizontal: 25 }}>{selectedVideo?.name}</CustomText>
            <View style={{ justifyContent: "center", alignItems: "center" }}>

              <Video
                style={{ width: "78%", height: 350, borderRadius: 15, borderWidth: 1, borderColor: "#d6d6d6", backgroundColor: "white" }}
                source={{ uri: url + selectedVideo?.video_urls[0] }}
                resizeMode={ResizeMode.COVER}
                onLoadStart={() => setIsVideoLoading(true)}
                isLooping={true}
                key={selectedVideo?.exe_id}
                usePoster={isVideoLoading}
                posterSource={{ uri: "https://i.pinimg.com/originals/ec/d6/bc/ecd6bc09da634e4e2efa16b571618a22.gif"}}
                shouldPlay={isVideoPlaying}
                onLoad={() => {
                  setIsVideoLoading(false);
                  setIsVideoPlaying(true); // Definir como true apenas quando o vídeo estiver carregado
                }}
              />


            </View>

            {!isVideoLoading &&

              <View style={{ width: "100%", paddingTop: 5, paddingHorizontal: 25 }}>
                {selectedVideo?.description && <CustomText style={{ textAlign: "center", fontSize: 18, color: colorSecundary }}>Descrição</CustomText>}
                <CustomText style={{ textAlign: "justify", fontSize: 15 }}>{selectedVideo?.description}</CustomText>

                {selectedVideo?.objective && <CustomText style={{ textAlign: "center", fontSize: 18, color: colorSecundary }}>Objetivo</CustomText>}
                <CustomText style={{ textAlign: "justify", fontSize: 15 }}>{selectedVideo?.objective}</CustomText>

                {selectedVideo?.academic_sources && <CustomText style={{ textAlign: "center", fontSize: 18, color: colorSecundary }}>Referências</CustomText>}
                <CustomText fontFamily='Poppins_200ExtraLight_Italic' style={{ textAlign: "justify", fontSize: 12 }}>{`" ${selectedVideo?.academic_sources} "`}</CustomText>
              </View>

            }

          </ScrollView>

        </Sheet.Frame>
      </Sheet>



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