import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, ScrollView, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function Videos() {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoPress = (uri) => {
    setSelectedVideo(uri);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1}}>
        {[0,0,0,0].map((item, index)=>(
          <Pressable key={index} onPress={() => handleVideoPress(`https://fono-api-solitary-surf-9909.fly.dev/public/v${index+1}.mp4`)}>
            <Video
              ref={video}
              style={styles.video1}
              source={{
                uri: `https://fono-api-solitary-surf-9909.fly.dev/public/v${index+1}.mp4`,
              }}
              resizeMode={ResizeMode.STRETCH}
              isLooping={true}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              usePoster={true}
            />
          </Pressable>
        ))}
      </ScrollView>
      <Modal
      style={{width:900, height:50}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View >
          <View style={styles.modalView}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: selectedVideo,
              }}
              useNativeControls
              resizeMode={ResizeMode.STRETCH}
              isLooping={true}
              onPlaybackStatusUpdate={status => setStatus(() => status)}
              usePoster={true}
              shouldPlay={true}
            />
            <Button title="Fechar" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: "100%",
    height: 600,
  },
  video1: {
    alignSelf: 'flex-start',
    width: 120,
    height: 100,
    borderRadius:15,
    padding:15, 
    marginVertical:5,
    margin:10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
