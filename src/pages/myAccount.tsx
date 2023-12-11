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

const MyAccount = () => {
  const { logOut, user } = useContext(Context);

  return (
    <YStack backgroundColor='$color1' style={{ flex: 1 }}>
      <YStack space="$3" style={{ borderColor: 'yellow', borderWidth: 0, alignItems: "center", marginTop: 40, marginBottom: 40 }}>
        <YStack style={{width:'100%', alignItems:'center', marginTop:5}}>
          <Image source={{ uri: "https://obsessaocompulsiva.files.wordpress.com/2012/08/ian-somerhalder.jpg" }} style={{ width: 100, height: 100, resizeMode: "contain", borderRadius: 50 }} />
          <CustomText fontFamily='Poppins_700Bold'> {user?.name}</CustomText>
          <CustomText fontFamily='Poppins_300Light'> {user?.email.replace(/\s/g, "")}</CustomText>
        </YStack>
        <Button backgroundColor={'$green7Light'}>
            <CustomText fontFamily='Poppins_400Regular'> Indique  e ganhe 10% de bonus </CustomText>
        </Button>
      </YStack>

      <View style={{ borderColor: 'red', borderWidth: 0, alignItems: "center", width: "100%", flex: 1 }}>
        <Button backgroundColor={'#d1dfff'} style={{ width: 340, borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <MaterialIcons name="info-outline" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Suas informações</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
        </Button>

        <Button backgroundColor={'#d1dfff'} style={{ width: 340, borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <Ionicons name="ios-card" size={20} color="black" />
              <Text style={{ fontSize: 13, }} >Minha assinatura</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
        </Button>

        <Button backgroundColor={'#d1dfff'} style={{ width: 340, borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <SimpleLineIcons name="user-female" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Indique e ganhe</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
        </Button>

        <Button backgroundColor={'#d1dfff'} style={{ width: 340, borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Endereço</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
        </Button>

        <Button backgroundColor={'#d1dfff'} style={{ width: 340, borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'blue', borderWidth: 0, width: 130 }}>
              <Foundation name="comments" size={20} color="black" />
              <Text style={{ fontSize: 12, }} >Sugestão</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
        </Button>
        <Button  onPress={logOut} backgroundColor={'#f46961'} style={{ width: 340, borderRadius: 6, marginTop: 10, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', gap: 10, borderColor: 'red', borderWidth: 0, width: 130 }}>
              <Foundation name="eject" size={20} color="white" />
              <Text style={{ fontSize: 12, color:"white" }} >Sair da conta</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={12} color="white" />
        </Button>
      
      </View>
    </YStack>
  )
}

export default MyAccount