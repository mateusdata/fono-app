import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingComponent from '../components/LoadingComponent';

const MyPlanDetails = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPlan, setCurrentPlan] = useState<any>([]);

    // Substitua isso pelo seu objeto de plano atual
    const planoAtual = {
        nome: 'Plano Premium',
        status: 'Ativo',
        valor: 'R$ 29,99',
        duracao: '30 dias'
    };
    useEffect(() => {
        setLoading(true);
        const fetchPlan = async () => {
            try {
                setLoading(true);
                const response = await AsyncStorage.getItem("plan");
                setCurrentPlan(JSON.parse(response))
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchPlan();
    }, []);

    if (loading) {
        return <LoadingComponent />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Plano Atual</Text>
            <Text style={styles.info}>Nome: {currentPlan.type == 1 ? "Plano mensal" : "Plano anual"}</Text>
            <Text style={styles.info}>Status: <Text style={{ color: "green" }}>
                {currentPlan?.isSubscriber ? "Atvo" : "Inativo"}
            </Text>
            </Text>
            <Text style={styles.info}>Valor: {currentPlan.price}</Text>
            <Text style={styles.info}>Duração: {currentPlan.duration}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default MyPlanDetails;
