import React, { useContext, useEffect, useState } from 'react'
import { Alert, Platform, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Context } from '../context/AuthProvider'
import { ContextPacient } from '../context/PacientContext'
import { FormatPacient } from '../interfaces/globalInterface'
import CustomText from '../components/customText'
import { Controller, useForm } from 'react-hook-form'
import ErrorMessage from '../components/errorMessage'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { colorGreen, colorPrimary, colorSecundary } from '../style/ColorPalette'
import { ContextGlobal } from '../context/GlobalContext'
const ServiceProvisionReceipt = ({ route }: any) => {

  const { pacient, }: { pacient: FormatPacient } = route.params;
  const { user } = useContext(Context);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfName = `Recibo de prestação de serviço ${pacient?.person?.first_name} - ${pacient?.person?.cpf}.pdf`;

  const schema = yup.object({
    price: yup.string().required("Campo obrigatorio"),
    number_of_sessions: yup.string().matches(/^\d+$/, { message: "Número de sessões invalida" }).required("Campo obrigatorio"),
  });

  const { control, formState: { errors }, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      price: "",
      number_of_sessions: ""
    },
    resolver: yupResolver(schema)
  })
  //const PDF_URI = `https://fono-api.vercel.app/service-term/${pacient.pac_id}?price=${watch("price")}&number_of_sessions=${watch("number_of_sessions")}`;
  const { location } = useContext(ContextGlobal);

  const PDF_URI = `https://fono-api.vercel.app/service-term/${pacient?.pac_id}?price=${watch("price")}&number_of_sessions=${watch("number_of_sessions")}&lat=${location.latitude}&lon=${location.longitude}`;
 console.log(PDF_URI)
  function onDownloadProgress({
    totalBytesWritten,
    totalBytesExpectedToWrite,
  }: FileSystem.DownloadProgressData) {
    const percentage = (totalBytesWritten / totalBytesExpectedToWrite) * 100
    setProgressPercentage(percentage)
  }

  const handleError = error => console.log("error");
  async function getPdf() {
    try {
      setIsDownloading(true)
      console.log(pdfName)
      const fileUri = FileSystem.documentDirectory + pdfName

      const downloadResumable = FileSystem.createDownloadResumable(
        PDF_URI,
        fileUri,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Substitua your_token_here pelo seu token de autenticação
          },
        },
        onDownloadProgress
      )

      const downloadResponse = await downloadResumable.downloadAsync()

      if (downloadResponse?.uri) {
        await fileSave(downloadResponse.uri, pdfName)
        setProgressPercentage(0)
        reset()
        setIsDownloading(false)
      }
    } catch (error) {
      Alert.alert("Download", "Não foi possível realizar o download.")
      console.error(error)
    }
  }

  async function fileSave(uri: string, filename: string) {
    if (Platform.OS === "android") {
      const directoryUri = FileSystem.cacheDirectory + filename
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      await FileSystem.writeAsStringAsync(directoryUri, base64File, {
        encoding: FileSystem.EncodingType.Base64,
      })
      await Sharing.shareAsync(directoryUri)
    } else {
      Sharing.shareAsync(uri)
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <View >
        <CustomText fontFamily='Poppins_300Light' style={{ textAlign: "center", fontSize: 17, paddingHorizontal: 0 }}>
          Recibo de prestação de serviço do paciente 
        </CustomText>
        <CustomText fontFamily='Poppins_300Light' style={{ textAlign: "center", fontSize: 17, color:colorSecundary}}>
         {pacient.person.first_name}
        </CustomText>
      </View>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, name, value } }) => (
            <TextInput  keyboardType='numeric'    activeOutlineColor={colorSecundary} autoFocus label="Preço" mode='outlined' value={value?.trim()} onChangeText={onChange} />
          )}
          name='price'
        />
        <ErrorMessage errors={errors} name="price" />


        <Controller
          control={control}
          render={({ field: { onChange, name, value } }) => (
            <TextInput  keyboardType='number-pad'    activeOutlineColor={colorSecundary} label="Número de sessões" mode='outlined' value={value?.trim()} onChangeText={onChange} />
          )}
          name='number_of_sessions'
        />
        <ErrorMessage errors={errors} name="number_of_sessions" />



      </View>
      <View style={{ padding: 12 }}>
        <Button buttonColor={colorPrimary} textColor='white'
          loading={!!progressPercentage} onPress={handleSubmit(getPdf, handleError)} mode='text'>
          Gerar Recibo
        </Button>
      </View>
    </View>
  )
}

export default ServiceProvisionReceipt
