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

const MyAccount = () => {
  const { logOut, user } = useContext(Context);

  return (
    <YStack backgroundColor='$color1' style={{ flex: 1 }}>
              <StatusBar translucent={true}  style='dark' />

      <YStack space="$3" style={{ borderColor: 'yellow', borderWidth: 0, alignItems: "center", marginTop: 40, marginBottom: 40 }}>
        <YStack style={{width:'100%', alignItems:'center', marginTop:5}}>
          <Image source={{ uri: "https://obsessaocompulsiva.files.wordpress.com/2012/08/ian-somerhalder.jpg" }} style={{ width: 100, height: 100, resizeMode: "contain", borderRadius: 50 }} />
          <CustomText style={{fontSize:22}} fontFamily='Poppins_400Regular'> {user?.name}</CustomText>
        </YStack>
       
      </YStack>

      <View style={{ borderColor: 'red', borderWidth: 0, alignItems: "center", width: "100%", flex: 1 }}>
        <Button backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <MaterialIcons name="info-outline" size={23} color="#4e4e54" />
              <Text style={{ fontSize: 16,  }} >Suas informações</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </Button>

        <Button backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <Ionicons name="ios-card-outline" size={23} color="#4e4e54" />
              <Text style={{ fontSize: 16,  }} >Minha assinatura</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </Button>

        <Button backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <SimpleLineIcons name="user-female" size={23} color="#4e4e54" />
              <Text style={{ fontSize: 16,  }} >Indique e ganhe</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </Button>

        <Button backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <MaterialCommunityIcons name="help-rhombus-outline" size={23} color="#4e4e54" />
              <Text style={{ fontSize: 16,  }} >Ajuda</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </Button>

        <Button backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
            <SimpleLineIcons name="directions" size={23} color="#4e4e54" />
              <Text style={{ fontSize: 16,  }} >Sugestão</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </Button>
       
        <Button   onPress={()=>{
          AsyncStorage.removeItem("plan");
          logOut();
        }} backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
            <SimpleLineIcons name="trash" size={23} color="#4e4e54" />
              <Text style={{ fontSize : 16, }} >Cancelar conta</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="black" />
        </Button>
        <Button  onPress={logOut} backgroundColor={'white'} style={{ width: "95%", borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'red', borderWidth: 0, width: 130 }}>
            <SimpleLineIcons name="logout" size={23} color="#4e4e54" />
              <Text style={{ fontSize: 16, color:"black" }} >Sair da conta</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={15} color="#4e4e54" />
        </Button>
      </View>
    </YStack>
  )
}

export default MyAccount