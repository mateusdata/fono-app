import React, { useContext, useState } from 'react'
import { Alert, Pressable, TouchableOpacity, View } from 'react-native'
import {
  MaterialIcons, Ionicons,
  SimpleLineIcons, MaterialCommunityIcons,
  Foundation
} from '@expo/vector-icons';
import CustomText from '../components/customText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../context/AuthProvider';
import { Sheet, setupNativeSheet } from '@tamagui/sheet';
import { Button, Text } from 'react-native';

const MyInformation = ({navigation}) => {
  const { logOut, user } = useContext(Context);
  const [open, setOpen] = useState(false);

  const deletePlan = () =>
  setOpen(true)
    


  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", paddingTop: 10 }}>
      <Pressable onPress={()=>navigation.navigate("ChangeName")} android_ripple={{ color: "gray" }} style={{
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", borderBottomWidth: 0.5,
        borderColor: "gray", paddingBottom: 5, width: "90%"
      }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 15, marginTop: 10 }}>
          <Ionicons name="create-outline" size={28} color="#474747" />
          <CustomText fontFamily='Poppins_400Regular' style={{ fontSize: 17 }}>Nome de exibição</CustomText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={18} color="#474747" />
      </Pressable>

      <Pressable onPress={()=>navigation.navigate("ChangeEmail")} android_ripple={{ color: "gray" }} style={{
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", borderBottomWidth: 0.5,
        borderColor: "gray", paddingBottom: 5, width: "90%"
      }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 15, marginTop: 10 }}>
          <Ionicons name="at" size={28} color="#474747" />
          <CustomText fontFamily='Poppins_400Regular' style={{ fontSize: 17 }}>Email</CustomText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={18} color="#474747" />
      </Pressable>

      <Pressable onPress={()=>navigation.navigate("ChangeCredential")} android_ripple={{ color: "gray" }} style={{
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", borderBottomWidth: 0.5,
        borderColor: "gray", paddingBottom: 5, width: "90%"
      }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 15, marginTop: 10 }}>
          <Ionicons name="settings-outline" size={28} color="#474747" />
          <CustomText fontFamily='Poppins_400Regular' style={{ fontSize: 17 }}>Senha</CustomText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={18} color="#474747" />
      </Pressable>
      <Pressable onPress={() => { deletePlan() }} android_ripple={{ color: "gray" }} style={{
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", borderBottomWidth: 0.5,
        borderColor: "gray", paddingBottom: 5, width: "90%"
      }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 15, marginTop: 10 }}>
          <Ionicons name="md-trash-outline" size={28} color="#f46e6e" />
          <CustomText fontFamily='Poppins_400Regular' style={{ fontSize: 17 }}>Cancelar plano</CustomText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={18} color="#474747" />
      </Pressable>
      <Sheet  snapPoints={[35 , 50]}  open={open}>
      <Sheet.Overlay  onPress={()=> setOpen(false)}/>
      <Sheet.Handle style={{top:5, height:6, backgroundColor:"white"}}/>
      <Sheet.Frame >
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
      <CustomText style={{ color: 'black', fontSize: 20, textAlign:"center" }}>Tem certeza de que deseja cancelar o plano?</CustomText>
      {open && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity onPress={() => {
             AsyncStorage.removeItem("plan");
             logOut();
          }} style={{ backgroundColor: '#ff7f7f', padding: 10, width: '45%', alignItems: 'center' }}>
            <CustomText style={{ color: '#fff', fontSize: 18 }}>Sim</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpen(false)} style={{ backgroundColor: '#808080', padding: 10, width: '45%', alignItems: 'center' }}>
            <CustomText style={{ color: '#fff', fontSize: 18 }}>Não</CustomText>
          </TouchableOpacity>
        </View>
      )}
    </View>
      </Sheet.Frame>
    </Sheet>
    </View>
  )
}

export default MyInformation