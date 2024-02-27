import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CustomText from '../components/customText';

const PolicyAndPrivacy = () => {
    return (
        <ScrollView style={styles.container}>
            <CustomText  fontFamily='Poppins_600SemiBold' style={styles.title}>Política de Privacidade do Fonotherapp</CustomText>
            <CustomText style={styles.text}>
                Política de Privacidade Suplementar dos Canais do Fonotheapp Data de Vigência: 2 de agosto de 2023 Esta Política de Privacidade
                Suplementar dos Canais do Fonotheapp ajuda a explicar nossas práticas relacionadas a informações quando você usa os Canais do
                Fonotheapp (“Canais”). Os termos “Fonotheapp”, “nosso(a)”, “nós”, “nos” ou “conosco” referem-se ao Fonotheapp LLC.
                {'\n\n'}
                Esta Política de Privacidade dos Canais complementa a Política de Privacidade do Fonotheapp, que se aplica ao uso de todos
                os nossos Serviços, incluindo os Canais. Quaisquer termos em letras maiúsculas usados, mas não definidos nesta Política de
                Privacidade dos Canais, têm os significados estabelecidos na Política de Privacidade do Fonotheapp.
                {'\n\n'}
                Se houver qualquer conflito
                entre esta Política de Privacidade dos Canais e a Política de Privacidade do Fonotheapp, esta Política de Privacidade dos Canais
                prevalecerá exclusivamente em relação ao seu uso dos Canais e apenas na medida do conflito.
                {'\n\n'}
                Os Termos de Serviço Suplementares dos Canais do Fonotheapp e as Diretrizes dos Canais do Fonotheapp são aplicáveis ao seu
                uso dos Canais.
                O que esta Política de Privacidade dos Canais abrange? Os Canais são um recurso opcional de transmissão unidirecional dentro
                do Fonotheapp, separado dos nossos serviços de mensagens privadas, que permite criar um Canal (do qual você é um “Administrador”) para compartilhar atualizações com outras pessoas (“Conteúdo do Canal”). Você também pode visualizar e interagir com o Conteúdo do Canal e seguir Canais específicos como seguidor (“Seguidor”). Os não seguidores (“Visualizadores”) também podem ver e interagir com o Conteúdo do Canal.
                {'\n\n'}
                Os Canais são públicos, o que significa que qualquer pessoa pode descobrir, seguir e visualizar seu Canal. Dada a natureza pública
                e o tamanho ilimitado dos públicos dos Canais, o Conteúdo do Canal ficará visível para qualquer usuário e pelo Fonotheapp. Isso também significa que o Conteúdo do Canal está entre as informações que o Fonotheapp coleta e usa para promover a segurança, proteção e integridade nos Canais, conforme descrito nesta Política de Privacidade dos Canais, nos Termos Suplementares e nas Diretrizes dos Canais do Fonotheapp.
                {'\n\n'}
                É importante ressaltar que o uso dos Canais do Fonotheapp não afeta a privacidade das suas mensagens pessoais do Fonotheapp, que
                continuam a ser criptografadas de ponta a ponta, conforme descrito na Política de Privacidade do Fonotheapp.
                {'\n\n'}
                No futuro, podemos lançar recursos adicionais de Canais, como novas formas de pesquisar Canais e Conteúdo do Canal, configurações
                adicionais de público e privacidade para Canais e Canais criptografados de ponta a ponta. Se você já estiver usando Canais quando
                atualizarmos os recursos e as configurações, informaremos você sobre esses recursos conforme apropriado.
                {'\n\n'}
                Informações que coletamos A Política de Privacidade do Fonotheapp descreve as informações que coletamos nos nossos Serviços. Quando
                você usa os Canais, também coletamos.
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

export default PolicyAndPrivacy;
