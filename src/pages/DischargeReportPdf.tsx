import React, { useContext, useEffect, useState } from 'react'
import { Alert, Platform, ScrollView, Text, View } from 'react-native'
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
const DischargeReportPdf = ({ route }: any) => {

  const { pacient, }: { pacient: FormatPacient } = route.params;
  const { user } = useContext(Context);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfName = `Relatório de alta  ${pacient.person.first_name} - ${pacient.person.cpf}.pdf`;

  const schema = yup.object().shape({
    medical_diagnoses: yup.string().required("Campo obrigatório"),
    how_it_was_discovered: yup.string().required("Campo obrigatório"),
    first_session_findings: yup.string().required("Campo obrigatório"),
    therapeutic_plan: yup.string().required("Campo obrigatório"),
    patients_progress: yup.string().required("Campo obrigatório"),
    current_condition: yup.string().required("Campo obrigatório"),
    referrals: yup.string().required("Campo obrigatório")
  });


  const { control, formState: { errors }, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      medical_diagnoses: "",
      how_it_was_discovered: "",
      first_session_findings: "",
      therapeutic_plan: "",
      patients_progress: "",
      current_condition: "",
      referrals: ""
    },
    resolver: yupResolver(schema)
  })
  const name = 10
  const PDF_URI = `https://fono-api.vercel.app/discharg-report/1?medical_diagnoses=${watch("medical_diagnoses")}&how_it_was_discovered=${watch("how_it_was_discovered")}&first_session_findings=${watch("first_session_findings")}&therapeutic_plan=${watch("therapeutic_plan")}&patients_progress=${watch("patients_progress")}&current_condition=${watch("current_condition")}&referrals=${watch("referrals")}`;

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


  const nomeChaves: {[key: string]: string} = {
    medical_diagnoses: "Diagnósticos",
    how_it_was_discovered: "Como foi descoberto",
    first_session_findings: "Avaliação Inicial",
    therapeutic_plan: "Plano Terapêutico",
    patients_progress: "Progresso dos Pacientes",
    current_condition: "Condição Atual",
    referrals: "Encaminhamentos"
  };


  return (
    <ScrollView style={{ padding: 10 }}>
      <View >
        <CustomText fontFamily='Poppins_300Light' style={{ textAlign: "center", fontSize: 17, paddingHorizontal: 0 }}>
          Relatório de alta do paciente
        </CustomText>
        <CustomText fontFamily='Poppins_300Light' style={{ textAlign: "center", fontSize: 17, color: colorSecundary }}>
          {pacient.person.first_name}
        </CustomText>
      </View>

      <View>
        {Object.keys(schema.fields).map((key) => (
          <React.Fragment key={key}>
            {schema.fields.hasOwnProperty(key) && (
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    activeOutlineColor={colorSecundary}
                    label={nomeChaves[key]}
                    mode='outlined'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name={key as keyof typeof schema.fields}
              />
            )}
            <ErrorMessage errors={errors} name={key} />
          </React.Fragment>
        ))}
      </View>



      <View style={{ padding: 12 }}>
        <Button buttonColor={colorPrimary} textColor='white'
          loading={!!progressPercentage} onPress={handleSubmit(getPdf, handleError)} mode='text'>
          Gerar Recibo
        </Button>
      </View>
    </ScrollView>
  )
}

export default DischargeReportPdf
