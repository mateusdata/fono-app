import React, { useContext, useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import PacientContext, { ContextPacient } from '../context/PacientContext';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import api from '../config/Api';
import { AntDesign } from '@expo/vector-icons';
import { Platform, Alert } from "react-native"

import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Button } from "react-native-paper"



const AnsweredQuestions = () => {
    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [answered, setAnswered] = useState([]);
    const { pac_id } = useContext(ContextPacient);

    const [progressPercentage, setProgressPercentage] = useState(0)
    const [isDownloading, setIsDownloading] = useState(false)


    const PDF_NAME = `Relatório - ${new Date()}.pdf` 
    const PDF_URI = `https://fono-api.vercel.app/generate-report/${pac_id}` // leve.
    //const PDF_URI = "https://www.mcfadden.com.br/assets/pdf/Flofi.pdf" // pesado

    const handlePress = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };
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
                await fileSave(downloadResponse.uri, PDF_NAME )
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
                <Text></Text>

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
                    <List.Item title="Item 1" />
                    <List.Item title="Item 2" />
                    <List.Item title="Item 3" />
                </List.Accordion>
                <Text></Text>

                <List.Accordion
                    title="Analise estrutural"
                    style={{ backgroundColor: "#E8E8E8" }}
                    left={(props) => <List.Icon {...props} icon="cloud" />}
                    expanded={expandedIndex === 2}
                    onPress={() => handlePress(2)}>
                    <List.Item title="Item 1" />
                    <List.Item title="Item 2" />
                    <List.Item title="Item 3" />
                </List.Accordion>
                <Text></Text>
                <List.Accordion
                    title="Analise funcional"
                    style={{ backgroundColor: "#E8E8E8" }}
                    left={(props) => <List.Icon   {...props} icon="filter" />}
                    expanded={expandedIndex === 3}
                    onPress={() => handlePress(3)}>
                    <List.Item title="Item 1" />
                    <List.Item title="Item 2" />
                    <List.Item title="Item 3" />
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




/*

import { useState } from "react"
import { View, Text, Platform, Alert } from "react-native"

import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Button } from "react-native-paper"


const PDF_NAME = "doc.pdf"
const PDF_URI = "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf" // leve.
//const PDF_URI = "https://www.mcfadden.com.br/assets/pdf/Flofi.pdf" // pesado

export default function Download() {
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

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
    <View>
    <Button  onPress={handleDownload} >PDF</Button>

      {progressPercentage > 0 && (
        <Text >
          {progressPercentage.toFixed(1)}% baixado...
        </Text>
      )}
    </View>
  )
}


*/