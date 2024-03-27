import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
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

export default function Section({ navigation }) {
  const [page, setPage] = useState(1);
  const [videosFono, setVideosFono] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [errorInput, setErroInput] = useState("");
  const { user } = useContext(Context)
  const { pac_id } = useContext(ContextPacient)
  const [search, setSearch] = useState("");
  const [changeList, setChangeList] = useState(true);

  const [series, setSeries] = useState<any>("");
  const [repetitions, setRepetitions] = useState<any>("");

  const schema = yup.object().shape({
    doc_id: yup.number(),
    ses_id: yup.number(),
    name: yup.string().max(150),
    description: yup.string().max(255),
    exercise_plans: yup.array().of(
      yup.object().shape({
        exe_id: yup.number(),
        series: yup.number(),
        repetitions: yup.number(),
      })
    ).required(),
  });
  const { control, formState: { errors }, watch, handleSubmit, reset,  setValue } = useForm({
    defaultValues: {
      doc_id: user.doc_id,
      ses_id: 0,
      name: dayjs(new Date).format("Protocolo DD/DD/YYYY - HH:mm:ss"),
      description: "sem descrição",
    },
    resolver: yupResolver(schema)
  })


  const [selectedVideo, setSelectedVideo] = useState(null);
  const url = "https://fono-api-solitary-surf-9909.fly.dev/videos/"
  useEffect(() => {
    console.log("oiss")
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/list-exercise?pageSize=15&page=${page}`);
        const session: any = await api.post("create-session", { pac_id });
        setValue("ses_id", session.data.ses_id);
        setVideosFono(response.data.rows);
        console.log(response.data.rows)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };
    fetchVideos();
  }, [page,changeList]);

  const seachVideos  = async() =>{
    
    try {
      const response = await api.post(`/search-exercise`, {search});
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
  const addExercice = (exe_id: number) => {

    if (series && repetitions) {
      const data = {
        exe_id,
        series,
        repetitions
      };

      let exercisePlans = watch("exercise_plans");
      if (exercisePlans?.some(exercise => exercise?.exe_id === exe_id)) {
        setSeries("");
        setRepetitions("");data
        return alert("Não é possível cadastrar o mesmo exercício");
      }
      if (!Array.isArray(exercisePlans)) {
        exercisePlans = [];
        setSeries("");
        setRepetitions("");
      }

      setValue("exercise_plans", [...exercisePlans, data]);
      setSeries("");
      setRepetitions("");
      return
    }
    alert("Erro: informe as series e repetições")
  }



  
  const onSubmit = async (data) => {
    try {
      const response: any = await api.post("create-protocol", data );
        alert("Protocolo criado com sucesso 🥳🎉🎉");
        reset()
    } catch (error) {
      console.log(error);
      alert("Erro ao criar Protocolo");
    }
  };
  
  const onError = (error) => {
    console.log(error);
    console.log( error)
  }
  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleVideoPress(item)} style={{ flexDirection: "row", alignItems: "center", backgroundColor: watch("exercise_plans")?.some(exercise => exercise?.exe_id === item.exe_id) ? "#38CB89" :"#d2d4db", marginVertical: 5 }}>
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: "center", alignItems: "center", gap: 8, }}>
        <AntDesign name="play" size={30} color= { watch("exercise_plans")?.some(exercise => exercise?.exe_id === item.exe_id) ? "white" :"#36B3B9"} />
        <Text style={{color: watch("exercise_plans")?.some(exercise => exercise?.exe_id === item.exe_id) ? "white" :"black"}}>{item?.name}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return <SkelectonView />
  }
  return (
    <View onTouchMove={() => { }} style={{ flex: 1 }}>
      <Searchbar
        onChange={seachVideos}
        onChangeText={(e)=> setSearch(e)}
        value={search}
        placeholder="Pesquisar pacientes"
        mode='bar'
        inputMode='search'
        iconColor='#407AFF'
        rippleColor={"#E8E8E8"}
        selectionColor={"#E8E8E8"}
        cursorColor={"gray"}
        style={{ borderBottomWidth: 1, borderColor: colorSecundary, marginBottom:12}}
      />

      <FlatList
        data={videosFono}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem({ item })}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
      <Dialog open={modalVisible}>

        <Dialog.Portal>
          <Dialog.Overlay key={"Overlay"} onPress={() => {
            setErroInput("")
            setModalVisible(false);

          }} />
          <Dialog.Content key={"Content"} style={{ maxHeight: "85%", maxWidth: "95%" }}>

            <ScrollView style={{ backgroundColor: 'transparent', maxWidth: "100%", minWidth: "100%" }}>
              <View style={{ alignItems: "flex-end", borderWidth: 0 }}>
                <Pressable onPress={() => { setIsVideoLoading(true); setModalVisible(!modalVisible) }}>
                  <AntDesign name="close" size={24} color="red" />
                </Pressable>
              </View>
              <CustomText style={{ textAlign: "center", fontSize: 18, padding: 0, color: colorSecundary }}>{selectedVideo?.name}</CustomText>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {isVideoLoading && <ActivityIndicator size="large" color={colorSecundary} />}

                <Video
                  style={{ width: "50%", height: 200, borderRadius: 15, borderWidth:2, borderColor: watch("exercise_plans")?.some(exercise => exercise?.exe_id === selectedVideo.exe_id) ? "#38CB89": "transparent" }}
                  source={{ uri: url + selectedVideo?.video_urls[0] }}
                  resizeMode={ResizeMode.STRETCH}
                  onLoadStart={() => setIsVideoLoading(true)}
                  isLooping={true}
                  usePoster={true}
                  shouldPlay={true}
                  onLoad={() => setIsVideoLoading(false)}
                />

                <View style={{ flexDirection: "row", gap: 2, marginTop: 5 }}>
                  <TextInput
                    mode='outlined'
                    keyboardType='numeric'
                    placeholder='Ex: 3'
                    style={{ width: 100, height: 35 }}
                    label="Series"
                    value={series}
                    onChangeText={(event) => setSeries(event)}
                  />

                  <TextInput
                    mode='outlined'
                    keyboardType='numeric'
                    placeholder='Ex: 15'
                    style={{ width: 100, height: 35 }}
                    label="Repetições"
                    value={repetitions}
                    onChangeText={(event) => setRepetitions(event)}
                  />
                </View>

                <Text style={{ color: "red" }}>{errorInput}</Text>
                <Button onPress={() => addExercice(selectedVideo.exe_id)} style={{ marginTop: 5 }}
                  textColor='white' buttonColor={`${watch("exercise_plans")?.some(exercise => exercise?.exe_id === selectedVideo.exe_id) ? "#38CB89" : "#848383"}`} mode='contained-tonal' >
                  {`${watch("exercise_plans")?.some(exercise => exercise?.exe_id === selectedVideo.exe_id) ? "Exercicio adicionado" : "Adicionar"}`}
                </Button>
              </View>

              {!isVideoLoading && <View style={{ width: "100%", paddingTop: 5, paddingHorizontal: 25 }}>
                {selectedVideo?.description && <CustomText style={{ textAlign: "center", fontSize: 18, color: colorSecundary }}>Descrição</CustomText>}
                <CustomText style={{ textAlign: "justify", fontSize: 15 }}>{selectedVideo?.description}</CustomText>

                {selectedVideo?.objective && <CustomText style={{ textAlign: "center", fontSize: 18, color: colorSecundary }}>Objetivo</CustomText>}
                <CustomText style={{ textAlign: "justify", fontSize: 15 }}>{selectedVideo?.objective}</CustomText>

                {selectedVideo?.academic_sources && <CustomText style={{ textAlign: "center", fontSize: 18, color: colorSecundary }}>Referências</CustomText>}
                <CustomText fontFamily='Poppins_200ExtraLight_Italic' style={{ textAlign: "justify", fontSize: 12 }}>{`" ${selectedVideo?.academic_sources} "`}</CustomText>
              </View>}

            </ScrollView>

          </Dialog.Content>

        </Dialog.Portal>

      </Dialog>



      <View style={{
        flex: 1,
        position: 'relative',
      }}>
        <Button
        mode='elevated'
          textColor='white'
          style={{
            height:40,
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#36B3B9',
          }}
          icon="plus"
          onPress={handleSubmit(onSubmit, onError)}
        >
          Cria protocolo
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