import React, { useContext } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import {
  MaterialIcons, Ionicons,
  SimpleLineIcons, MaterialCommunityIcons,
  Foundation
} from '@expo/vector-icons';
import { Button, YStack } from 'tamagui';
import CustomText from '../components/customText';
import { Context } from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from 'react-native-paper';
const MyAccount = ({ navigation }) => {
  const { logOut, user } = useContext(Context);

  return (
    <YStack backgroundColor='$color1' style={{ flex: 1,borderWidth:0 }}>
      <YStack space="$3" style={{ borderColor: 'yellow', borderWidth: 0, alignItems: "center", marginTop: 0, marginBottom: 40 }}>
        <YStack style={{ width: '100%', alignItems: 'center', marginTop: 5 }}>
         {true  && <>
          <Avatar.Text size={80} label={user?.nick_name[0]?.toUpperCase()} />
          <CustomText style={{ fontSize: 22, marginTop: 10 }} fontFamily='Poppins_400Regular'> {user?.nick_name.charAt(0).toUpperCase() + user?.nick_name.slice(1)}</CustomText>
         </>}
        </YStack>

      </YStack>

      <View style={{ borderColor: 'red', borderWidth: 0, alignItems: "center", width: "100%", flex: 1 }}>
        <Button onPress={() => navigation.navigate("MyInformation")} backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 0, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
            <MaterialIcons name="info-outline" size={23} color="#474747" />
            <Text style={{ minWidth: 850, fontSize: 19, color: "#474747" }} >Conta</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" />
        </Button>

        {false && <Button backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 0, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
            <SimpleLineIcons name="user-female" size={23} color="#474747" />
            <Text style={{ minWidth: 850, fontSize: 19, color: "#474747" }} >Indique </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" />
        </Button>
        }
        <Button onPress={() => navigation.navigate("Help")} backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 0, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
            <MaterialCommunityIcons name="help-rhombus-outline" size={23} color="#474747" />
            <Text style={{ minWidth: 850, fontSize: 19, color: "#474747" }} >Ajuda</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" />
        </Button>

        <Button  onPress={() => navigation.navigate("Feedback")} backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 0, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
            <SimpleLineIcons name="directions" size={23} color="#474747" />
            <Text style={{ minWidth: 850, fontSize: 19, color: "#474747" }} >Sugestão</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" />
        </Button>
      

        <Button onPress={logOut} backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 0, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', gap: 10, borderColor: 'red', borderWidth: 0, width: 130 }}>
            <SimpleLineIcons name="logout" size={23} color="#474747" />
            <Text style={{ minWidth: 850, fontSize: 19, color: "black" }} >Sair da conta</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={15} color="#474747" />
        </Button>
      </View>
    </YStack>
  )
}

export default MyAccount