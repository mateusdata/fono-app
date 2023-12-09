import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { 
  MaterialIcons, Ionicons, 
  SimpleLineIcons, MaterialCommunityIcons,
  Foundation
} from '@expo/vector-icons';
import { Button, YStack } from 'tamagui';
import CustomText from '../components/customText';

const MyAccount = () => {
  return (
    <YStack backgroundColor='$color1' style={{ flex: 1 }}>
      <YStack space="$3" style={{ borderColor: 'yellow', borderWidth: 0, alignItems: "center", marginTop: 40, marginBottom: 40 }}>
        <YStack style={{width:'100%', alignItems:'center'}}>
          <Image source={{ uri: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/24630_7E9A5B3C65889D88.jpg?w=1024" }} style={{ width: 100, height: 100, resizeMode: "contain", borderRadius: 50 }} />
          <CustomText fontFamily='Poppins_700Bold'> Agenlina Valerios Alves </CustomText>
          <CustomText fontFamily='Poppins_300Light'> agenlina@gmail.com </CustomText>
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
      </View>
    </YStack>
  )
}

export default MyAccount