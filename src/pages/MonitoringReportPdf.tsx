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
const MonitoringReportPdf = ({ route }: any) => {

    const { pacient, }: { pacient: FormatPacient } = route.params;
    const { user } = useContext(Context);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const pdfName = `Relatório de acompanhamento ${pacient.person.first_name} - ${pacient.person.cpf}.pdf`;

    const schema = yup.object({
        diagnoses: yup.string().required("Campo obrigatório"),
        structural_assessment: yup.string().required("Campo obrigatório"),
        functional_assessment: yup.string().required("Campo obrigatório"),
        swallowing_assessment: yup.string().required("Campo obrigatório"),
        general_guidelines: yup.string().required("Campo obrigatório"),
        conclusion: yup.string().required("Campo obrigatório"),
        next_steps: yup.string().required("Campo obrigatório"),
    });

    const { control, formState: { errors }, reset, watch, handleSubmit } = useForm({
        defaultValues: {
            diagnoses: "",
            structural_assessment: "",
            functional_assessment: "",
            swallowing_assessment: "",
            general_guidelines: "",
            conclusion: "",
            next_steps: ""

        },
        resolver: yupResolver(schema)
    })
    const name = 10
    const PDF_URI = `https://fono-api.vercel.app/follow-up-report/${pacient.pac_id}?diagnoses=${watch("diagnoses")}&structural_assessment=${watch("structural_assessment")}&functional_assessment=${watch("functional_assessment")}&swallowing_assessment=${watch("swallowing_assessment")}&general_guidelines=${watch("general_guidelines")}&conclusion=${watch("conclusion")}&next_steps=${watch("next_steps")}`;
    ;

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
        <ScrollView style={{ padding: 10, }}>
            <CustomText fontFamily='Poppins_300Light' style={{ textAlign: "center", fontSize: 17, paddingHorizontal: 0 }}>
            Relatório de acompanhamento do paciente   {pacient.person.first_name}
            </CustomText>

            <View>
                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Diagnóstico" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='diagnoses'
                />
                <ErrorMessage errors={errors} name="diagnoses" />

                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Avaliação Estrutural" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='structural_assessment'
                />
                <ErrorMessage errors={errors} name="structural_assessment" />

                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Avaliação Funcional" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='functional_assessment'
                />
                <ErrorMessage errors={errors} name="functional_assessment" />

                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Avaliação de Deglutição" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='swallowing_assessment'
                />
                <ErrorMessage errors={errors} name="swallowing_assessment" />

                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Orientações Gerais" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='general_guidelines'
                />
                <ErrorMessage errors={errors} name="general_guidelines" />

                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Conclusão" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='conclusion'
                />
                <ErrorMessage errors={errors} name="conclusion" />

                <Controller
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                        <TextInput activeOutlineColor={colorSecundary} label="Próximos Passos" mode='outlined' value={value?.trim()} onChangeText={onChange} />
                    )}
                    name='next_steps'
                />
                <ErrorMessage errors={errors} name="next_steps" />
            </View>

            <View style={{ padding: 0, paddingBottom: 5 }}>
                <Button buttonColor={colorPrimary} textColor='white'
                    loading={!!progressPercentage} onPress={handleSubmit(getPdf, handleError)} mode='text'>
                    Gerar relatório
                </Button>
            </View>
        </ScrollView>
    )
}

export default MonitoringReportPdf