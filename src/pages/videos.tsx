import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function Videos() {
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  return (
    <View style={styles.container}>
     {
      <ScrollView style={{flex:1}}>
      {[0,0,0,0].map((item, index)=>(
         <Video
         key={index}
         ref={video}
         style={styles.video}
         source={{
           uri: `https://fono-api-solitary-surf-9909.fly.dev/public/v${index+1}.mp4`,
         }}
         useNativeControls
         resizeMode={ResizeMode.STRETCH}
         isLooping={true}
         onPlaybackStatusUpdate={status => setStatus(() => status)}
         usePoster={true}
       />
      ))}
      </ScrollView>
     }
      <View style={styles.buttons}>

      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
