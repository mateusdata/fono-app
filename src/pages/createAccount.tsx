import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import PrimaryButton from '../components/primaryButton'
import { TextInput } from 'react-native-paper'
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateAccount = ({ navigation }: any) => {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView>

            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", gap: 15, alignItems: "center" }}>
                <Text style={{
                    fontFamily: "Poppins_800ExtraBold",
                    fontSize: 25,
                    marginBottom: 0,
                    marginTop: 0,
                    color: "#4d4d4f"
                }}>
                    Criar conta
                </Text>
                <View style={{ width: "90%", gap: 8 }}>
                    <TextInput
                        mode="outlined"
                        label="nome"
                        placeholder="nome"
                        style={{
                            height: 52,
                            fontFamily: "Poppins_300Light",
                            borderRadius: 150
                        }}
                        activeOutlineColor='#376fe8'

                    />
                    <TextInput
                        mode="outlined"
                        label="email"
                        placeholder="email"
                        secureTextEntry
                        style={{ height: 52 }}

                        activeOutlineColor='#376fe8'

                    />
                    <TextInput
                        mode="outlined"
                        label="CRFA"
                        placeholder="CRFA"
                        style={{
                            height: 52,
                            fontFamily: "Poppins_300Light",
                            borderRadius: 150
                        }}
                        activeOutlineColor='#376fe8'

                    />

                    <TextInput
                        mode="outlined"
                        label="Senha"
                        placeholder="Senha"
                        secureTextEntry
                        style={{ height: 52 }}

                        activeOutlineColor='#376fe8'

                    />
                    <PrimaryButton name="Criar conta" handleButton={() => navigation.navigate("Login")} />
                    <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "gray" }}>Lembrou sua enha</Text>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Fazer login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default CreateAccount