import * as React from 'react';
import { Button, RadioButton } from 'react-native-paper';
import CustomText from '../components/customText';
import { ScrollView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const FunctionalAnalysis = ({navigation}) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    navigation.navigate("Protokol")
    console.log(data)
  };

  return (
    <View style={{ padding: 15, flex: 1 }}>
      <ScrollView style={{ flex: 0.9, marginBottom: 20 }}>
        <Controller rules={{required:"true"}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>O paciente consegue deglutir alimentos?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="temControleOralSim" />
              <RadioButton.Item color='green'label="Não" value="temControleOralNao" />
            </RadioButton.Group>
          )}
          name="temControleOral"
          defaultValue=""
        />

        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'> disfagia </CustomText>
              <RadioButton.Item color='green'label="Sim" value="haEscapeAnteriorSim" />
              <RadioButton.Item color='green'label="Não" value="haEscapeAnteriorNao" />
            </RadioButton.Group>
          )}
          name="haEscapeAnterior"
          defaultValue=""
        />

        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'> problemas de audição?</CustomText>
              <RadioButton.Item color='green' label="Sim" value="deglutePastosoSim" />
              <RadioButton.Item color='green'label="Não" value="deglutePastosoNao" />
            </RadioButton.Group>
          )}
          name="deglutePastoso"
          defaultValue=""
        />
        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'> dificuldades em mastigação?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="deglutePastosoSim" />
              <RadioButton.Item color='green'label="Não" value="deglutePastosoNao" />
            </RadioButton.Group>
          )}
          name="deglutePastoso1"
          defaultValue=""
        />
        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'> dificuldade em entender</CustomText>
              <RadioButton.Item color='green'label="Sim" value="disfagiaSim" />
              <RadioButton.Item color='green'label="Não" value="disfagiaNao" />
            </RadioButton.Group>
          )}
          name="disfagia"
          defaultValue=""
        />

        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'> ressonância nasal?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="alteracaoVocalSim" />
              <RadioButton.Item color='green'label="Não" value="alteracaoVocalNao" />
            </RadioButton.Group>
          )}
          name="alteracaoVocal"
          defaultValue=""
        />

        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'>Apresenta dificuldade na articulação ?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="dificuldadeArticulacaoSim" />
              <RadioButton.Item color='green'label="Não" value="dificuldadeArticulacaoNao" />
            </RadioButton.Group>
          )}
          name="dificuldadeArticulacao"
          defaultValue=""
        />

        <Controller rules={{required:true}}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              <CustomText fontFamily='Poppins_500Medium'> dificuldades na modulação  de voz?</CustomText>
              <RadioButton.Item color='green'label="Sim" value="dificuldadeLeituraEscritaSim" />
              <RadioButton.Item color='green'label="Não" value="dificuldadeLeituraEscritaNao" />
            </RadioButton.Group>
          )}
          name="dificuldadeLeituraEscrita"
          defaultValue=""
        />

        <Controller rules={{required:true}}
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
        <Button style={{ width: "100%" }} buttonColor='#36B3B9' mode='contained' onPress={handleSubmit(onSubmit)}>Proximo</Button>
      </View>
    </View>
  );
};

export default FunctionalAnalysis;
