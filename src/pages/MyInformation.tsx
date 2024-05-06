import React, { useContext, useState } from 'react'
import { Alert, Pressable, View } from 'react-native'
import { MaterialIcons, Ionicons} from '@expo/vector-icons';
import CustomText from '../components/customText';
import { Context } from '../context/AuthProvider';


const MyInformation = ({ navigation }) => {
  const { logOut, user } = useContext(Context);
  const [open, setOpen] = useState(false);

  const deletePlan = () =>
    setOpen(true)



  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", paddingTop: 10 }}>
      <Pressable onPress={() => navigation.navigate("ChangeName")} android_ripple={{ color: "gray" }} style={{
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

      <Pressable onPress={() => navigation.navigate("ChangeEmail")} android_ripple={{ color: "gray" }} style={{
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

      <Pressable onPress={() => navigation.navigate("ChangeCredential")} android_ripple={{ color: "gray" }} style={{
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

      <Pressable onPress={() => navigation.navigate("ChangeGovLicense")} android_ripple={{ color: "gray" }} style={{
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between", borderBottomWidth: 0.5,
        borderColor: "gray", paddingBottom: 5, width: "90%"
      }}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 15, marginTop: 10 }}>
          <Ionicons name="settings-outline" size={28} color="#474747" />
          <CustomText fontFamily='Poppins_400Regular' style={{ fontSize: 17 }}>CRFA</CustomText>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={18} color="#474747" />
      </Pressable>
      
    </View>
  )
}

export default MyInformation