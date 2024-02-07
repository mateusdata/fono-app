import * as React from 'react';
import { Button, RadioButton } from 'react-native-paper';
import CustomText from '../components/customText';
import { ScrollView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';

const StructuralAnalysis = ({navigation}) => {
  const { control, watch, handleSubmit } = useForm();
  const onSubmit = (data) => {
    navigation.navigate("FunctionalAnalysis")
    console.log(data)
  };

  return (
    <View style={{ padding: 15, flex: 1 }}>
            <StatusBar translucent={true} backgroundColor='white' style='dark' />

      <ScrollView style={{ flex: 0.9, marginBottom: 20 }}>
        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Tem controle oral?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="temControleOralSim" />
              <RadioButton.Item color='green'label="Não" value="temControleOralNao" />
            </RadioButton.Group>
          )}
          name="temControleOral"
          defaultValue=""
        />

        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Há escape anterior?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="haEscapeAnteriorSim" />
              <RadioButton.Item color='green'label="Não" value="haEscapeAnteriorNao" />
            </RadioButton.Group>
          )}
          name="haEscapeAnterior"
          defaultValue=""
        />

        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Deglute pastoso?</CustomText>
              <RadioButton.Item color='green' label="Sim" value="deglutePastosoSim" />
              <RadioButton.Item color='green'label="Não" value="deglutePastosoNao" />
            </RadioButton.Group>
          )}
          name="deglutePastoso"
          defaultValue=""
        />
        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Deglute pastoso?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="deglutePastosoSim" />
              <RadioButton.Item color='green'label="Não" value="deglutePastosoNao" />
            </RadioButton.Group>
          )}
          name="deglutePastoso2"
          defaultValue=""
        />
        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Apresenta disfagia?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="disfagiaSim" />
              <RadioButton.Item color='green'label="Não" value="disfagiaNao" />
            </RadioButton.Group>
          )}
          name="disfagia"
          defaultValue=""
        />

        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Possui alteração vocal?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="alteracaoVocalSim" />
              <RadioButton.Item color='green'label="Não" value="alteracaoVocalNao" />
            </RadioButton.Group>
          )}
          name="alteracaoVocal"
          defaultValue=""
        />

        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Apresenta dificuldade na articulação das palavras?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="dificuldadeArticulacaoSim" />
              <RadioButton.Item color='green'label="Não" value="dificuldadeArticulacaoNao" />
            </RadioButton.Group>
          )}
          name="dificuldadeArticulacao"
          defaultValue=""
        />

        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Tem dificuldade na leitura e escrita?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="dificuldadeLeituraEscritaSim" />
              <RadioButton.Item color='green'label="Não" value="dificuldadeLeituraEscritaNao" />
            </RadioButton.Group>
          )}
          name="dificuldadeLeituraEscrita"
          defaultValue=""
        />

        <Controller rules={{required:"Obrigatorio"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Apresenta problemas de audição?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="problemasAudicaoSim" />
              <RadioButton.Item color='green'label="Não" value="problemasAudicaoNao" />
            </RadioButton.Group>
          )}
          name="problemasAudicao"
          defaultValue=""
        />


        {/* Adicione mais grupos de perguntas aqui */}
        {/* ... */}
      </ScrollView>
      <View style={{ borderWidth: 0, justifyContent: "flex-end", alignItems: "flex-end", }}>
        <Button style={{ width: "100%" }}buttonColor='#36B3B9' mode='contained' onPress={handleSubmit(onSubmit)}>Proximo</Button>
      </View>
    </View>
  );
};

export default StructuralAnalysis;
