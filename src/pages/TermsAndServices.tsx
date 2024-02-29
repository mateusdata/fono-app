import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CustomText from '../components/customText';

const TermsAndServices = () => {
    return (
        <ScrollView style={styles.container}>
            <CustomText fontFamily='Poppins_600SemiBold' style={styles.title}>Termos e Serviços do Fonotherapp</CustomText>
            <CustomText style={styles.text}>
                Sobre os nossos Serviços Princípios de segurança e privacidade. Desde que fundamos o Fonotheapp, nós desenvolvemos nossos
                Serviços com base em sólidos princípios de segurança e privacidade.
                {'\n\n'}

                Conectar você a outras pessoas. Possibilitamos e sempre
                tentamos aprimorar maneiras para que você se comunique com outros usuários do Fonotheapp por meio de mensagens, ligações de
                voz e vídeo, envio de imagens e vídeos, exibição do Status e compartilhamento de sua localização com outras pessoas, quando
                você desejar. Podemos fornecer uma plataforma prática que permite enviar e receber dinheiro de outros usuários em nossa plataforma.
                {'\n\n'}
                O Fonotheapp trabalha com parceiros, provedores de serviço e empresas afiliadas para encontrar meios de conectar você aos
                serviços deles. Formas de melhorar nossos Serviços.

                {'\n\n'}
                Analisamos como você usa o Fonotheapp, a fim de aprimorar nossos Serviços,
                inclusive ajudando empresas que usam o Fonotheapp a mensurar a eficácia e a distribuição dos seus serviços e mensagens.
                {'\n\n'}

                O Fonotheapp usa as informações que detém e também trabalha com parceiros, provedores de serviços e empresas afiliadas
                com essa finalidade. Comunicação com Empresas. Nós possibilitamos e sempre tentamos aprimorar maneiras para que usuários,
                empresas e outras organizações se comuniquem entre si por meio dos nossos Serviços para fazer e receber pedidos, transações,
                informações sobre consultas, alertas para envio e entrega de pedidos, atualizações sobre produtos, serviços e marketing. Proteção,
                segurança e integridade.
                {'\n\n'}
                Trabalhamos para garantir a proteção, segurança e integridade dos nossos Serviços. Inclusive para lidar
                adequadamente com pessoas abusivas e violações aos nossos Termos.
                {'\n\n'}
                Trabalhamos para proibir o uso indevido de nossos Serviços,
                como condutas nocivas, as violações de nossos Termos e políticas, e abordamos situações em que podemos ajudar a oferecer
                suporte ou proteger nossa comunidade. Se soubermos de pessoas ou atividades assim, nós tomaremos as medidas necessárias,
                seja removendo tais pessoas ou atividades, ou entrando em contato com as autoridades de aplicação da lei. Essa remoção
                será feita de acordo com a seção “Rescisão” abaixo.
                {'\n\n'}
                Possibilitar acesso aos nossos Serviços. Para operar nossos Serviços
                globais, precisamos armazenar e distribuir conteúdo e informações em data centers e sistemas em todo o mundo, inclusive
                fora de seu país de residência. O uso desta infraestrutura global é necessário e essencial para fornecermos nossos Serviços.
                Essa infraestrutura pode pertencer ou ser operada por nossos provedores de serviço, incluindo empresas afiliadas.
                {'\n\n'}
            </CustomText>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
    },
});

export default TermsAndServices;
