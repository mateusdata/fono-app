import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Vibration  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomText from '../components/customText';

const LeadingPage = () => {
  const [s, setS]= useState(true);
  useEffect(()=>{
    setS(!s)
    Vibration.vibrate();
  },[]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "100%" }}>
        <ScrollView>
          <View>

          </View>
        </ScrollView>

        <View style={{  width: "100%", alignItems:"center" }}>
          <Pressable android_disableSound={false} onPress={() => {  }} android_ripple={{color:"white", foreground:false}} style={{
            backgroundColor: "blue", borderRadius: 12,
            padding: 5, alignItems: "center", justifyContent: "center",
            width: "90%",height:48, 
          }}>
            <CustomText fontFamily='Poppins_400Regular' style={{color:"white", fontSize:22}}>
              Assine
            </CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};



export default LeadingPage;
