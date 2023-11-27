import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MyAccount = () => {
  return (
    <View style={{flex:1}}>
        <View style={{flex:1, alignItems:"center", marginTop:40}}>
        <Image source={{uri:"https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/24630_7E9A5B3C65889D88.jpg?w=1024"}} style={{width:100, height:100, resizeMode:"contain", borderRadius:50}} />

          <Text style={{color:"black", fontSize:25}}> Agenlina Valerios Alves </Text>
          <Text style={{color:"black", fontSize:18}}> agenlina@gmail.com </Text>
       
          <TouchableOpacity style={{backgroundColor:"#d1dfff", width:"100%", padding:10, borderRadius:8, marginTop:5, paddingHorizontal:50}}>
          <Text style={{color:"#36B3B9", fontSize:18}}> Indique  e ganhe 10% de bonus </Text>
          </TouchableOpacity>
        </View>


        <View style={{alignItems:"center", width:"100%", flex:1}}>
          <TouchableOpacity style={{alignItems:"flex-start", justifyContent:"flex-start", backgroundColor:"#d1dfff", padding:15, width:340, borderRadius:6, marginTop:10}}>
          <Text style={{fontSize:15}} > Suas informações  </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems:"flex-start", justifyContent:"flex-start", backgroundColor:"#d1dfff", padding:15, width:340, borderRadius:6, marginTop:10}}>
          <Text style={{fontSize:15}} > Minha assinatura </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems:"flex-start", justifyContent:"flex-start", backgroundColor:"#d1dfff", padding:15, width:340, borderRadius:6, marginTop:10}}>
          <Text style={{fontSize:15}} > Indique e ganhe </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems:"flex-start", justifyContent:"flex-start", backgroundColor:"#d1dfff", padding:15, width:340, borderRadius:6, marginTop:10}}>
          <Text style={{fontSize:15}} > Endereço </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{alignItems:"flex-start", justifyContent:"flex-start", backgroundColor:"#d1dfff", padding:15, width:340, borderRadius:6, marginTop:10}}>
          <Text style={{fontSize:15}} > Sugestão </Text>
          </TouchableOpacity>
          </View>
    </View>
  )
}

export default MyAccount