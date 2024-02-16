import * as React from 'react';
import { Button, RadioButton } from 'react-native-paper';
import CustomText from '../components/customText';
import { ScrollView, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import axiosInstance from '../config/axiosInstance';

const StructuralAnalysis = ({ navigation }) => {
  const { control, watch, handleSubmit } = useForm();
  const [analysis, setAnalysis] = React.useState<any>([]);
  const onSubmit = (data) => {
    navigation.navigate("FunctionalAnalysis")
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/info-questionnaire/4")
        setAnalysis(response.data);
        console.log(analysis.sections)
      } catch (error) {
        console.log("error")
      }
    }
    fetchData();
  }, [])

  return (
    <View style={{ padding: 15, flex: 1 }}>

      <ScrollView style={{ flex: 0.9, marginBottom: 20 }}>
        <Controller rules={{ required: "Obrigatorio" }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={{ borderWidth: 0 }}>
              {analysis?.sections?.map((item:any, index:number) => (
                <View key={index} style={{ borderBottomWidth: 1 }}>
                  <Text style={{ paddingBottom: 15 }}>{item.name}</Text>
                  {item?.questions?.map((item:any, index:number) => (
                    <View key={index}>
                      <RadioButton.Group onValueChange={onChange} value={value}>
                        <CustomText fontFamily='Poppins_500Medium'>{item.name}</CustomText>
                        {item?.alternatives?.map((item:any, labelIndex:number) => (
                          <RadioButton.Item  key={labelIndex} color='green' label={item} value={`${index} - ${labelIndex}`} />
                        ))}
                      </RadioButton.Group>
                    </View>
                  ))}

                </View>

              ))}
            </View>
          )}
          name="temControleOral"
          defaultValue=""
        />

      </ScrollView>
      <View style={{ borderWidth: 0, justifyContent: "flex-end", alignItems: "flex-end", }}>
        <Button style={{ width: "100%" }} buttonColor='#36B3B9' mode='contained' onPress={handleSubmit(onSubmit)}>Proximo</Button>
      </View>
    </View>
  );
};

export default StructuralAnalysis;
