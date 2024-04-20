import React, { useContext, useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import PacientContext, { ContextPacient } from '../context/PacientContext';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import api from '../config/Api';
import { AntDesign } from '@expo/vector-icons';
import { Platform, Alert } from "react-native"

import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import dayjs from 'dayjs';
import { FormatPacient } from '../interfaces/globalInterface';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';


const AnsweredQuestions = () => {
  const [expandedIndex, setExpandedIndex] = React.useState(null);
  const [answered, setAnswered] = useState([]);
  const { pac_id } = useContext(ContextPacient);
  const [pacient, setPacient] = useState<FormatPacient>();


  const [progressPercentage, setProgressPercentage] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const date = dayjs(new Date()).format("DD-MM-YYYY-HH-mm-ss-SSS");
  const PDF_NAME = `Relatório de anamnese - ${date}.pdf`
  const PDF_URI = `https://fono-api.vercel.app/generate-report/${pac_id}` // leve.
  //const PDF_URI = "https://www.mcfadden.com.br/assets/pdf/Flofi.pdf" // pesado

  const handlePress = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/info-pacient/${pac_id}`)
      setPacient(response.data);
    }
    fetchData()
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("answered-questionnaire/:pac_id");
        console.log(response.data)
        setAnswered(response.data);
      } catch (error) {
      }
    };
    fetchData();
  }, []);


  function onDownloadProgress({
    totalBytesWritten,
    totalBytesExpectedToWrite,
  }: FileSystem.DownloadProgressData) {
    const percentage = (totalBytesWritten / totalBytesExpectedToWrite) * 100
    setProgressPercentage(percentage)
  }

  async function getPdf() {
    try {
      setIsDownloading(true)

      const fileUri = FileSystem.documentDirectory + PDF_NAME

      const downloadResumable = FileSystem.createDownloadResumable(
        PDF_URI,
        fileUri,
        {},
        onDownloadProgress
      )

      const downloadResponse = await downloadResumable.downloadAsync()

      if (downloadResponse?.uri) {
        await fileSave(downloadResponse.uri, PDF_NAME)
        setProgressPercentage(0)
        setIsDownloading(false)
      }
    } catch (error) {
      Alert.alert("Download", "Não foi possível realizar o download.")
      console.error(error)
    }
  }

  async function fileSave(uri: string, filename: string) {
    if (Platform.OS === "android") {
      // Pega a pasta temporária.
      const directoryUri = FileSystem.cacheDirectory + filename

      // Lê o conteúdo do arquivo em formato base64
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // Escreve o conteúdo do arquivo no diretório.
      await FileSystem.writeAsStringAsync(directoryUri, base64File, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // Abre o arquivo recém-criado
      await Sharing.shareAsync(directoryUri)
    } else {
      Sharing.shareAsync(uri)
    }
  }

  return (
    <View style={styles.container}>

      <Pressable onPress={getPdf} style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center" }}>

        <View>
          {progressPercentage > 0 && (
            <Text >
              {progressPercentage.toFixed(1)}% baixado...
            </Text>
          )}

          <AntDesign name="pdffile1" size={34} color="red" />
        </View>
      </Pressable>



      <List.Section title='Perguntas respondidas' style={{ gap: 0 }}>

        <List.Accordion
          title="Anamnese"
          style={{ backgroundColor: "#E8E8E8" }}
          left={(props) => <List.Icon {...props} icon="all-inclusive" />}
          expanded={expandedIndex === 1}
          onPress={() => handlePress(1)}>

          <View style={{ left: -18, padding: 10, gap: 5 }}>
            <Text style={{ fontSize: 18 }}>{`Doença base: ${pacient?.base_diseases}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Perfil alimentar: ${pacient?.food_profile}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Queixas de declutição: ${pacient?.chewing_complaint}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Doença bade: ${pacient?.education}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Doença bade: ${pacient?.consultation_reason}`}</Text>
          </View>

        </List.Accordion>
        <Text></Text>

        <List.Accordion
          title="Analise estrutural"
          style={{ backgroundColor: "#E8E8E8" }}
          left={(props) => <List.Icon {...props} icon="cloud" />}
          expanded={expandedIndex === 2}
          onPress={() => handlePress(2)}>

          {pacient?.questionnaires.map((item, index) => (
            <View key={index} style={{ left: -18, padding: 10, gap: 5 }}>
              <Text style={{ fontSize: 18 }}>{`Doença base: ${item?.name}`}</Text>
              <Text style={{ fontSize: 18 }}>{`Doença base: ${item?.purpose}`}</Text>
              {item.sections.map((item2) => (
                <Text style={{ fontSize: 18 }}>{`Doença base: ${item2?.name}`}</Text>

              ))}

            </View>
          ))}

        </List.Accordion>
        <Text></Text>

        <List.Accordion
          title="Analise funcional"
          style={{ backgroundColor: "#E8E8E8" }}
          left={(props) => <List.Icon   {...props} icon="filter" />}
          expanded={expandedIndex === 3}
          onPress={() => handlePress(3)}>

          <View style={{ left: -18, padding: 10, gap: 5 }}>
            <Text style={{ fontSize: 18 }}>{`Doença base: ${pacient?.base_diseases}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Perfil alimentar: ${pacient?.food_profile}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Queixas de declutição: ${pacient?.chewing_complaint}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Doença bade: ${pacient?.education}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Doença bade: ${pacient?.consultation_reason}`}</Text>
          </View>

        </List.Accordion>


      </List.Section>
    </View>
  );
};

export default AnsweredQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  }
})



