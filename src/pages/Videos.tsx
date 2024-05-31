import React from 'react';
import { View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const VideoPlayer = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }}>
    <Video
      style={{
        width: '100%',
        height: 300
      }}
      source={require('./video.mp4')}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      shouldPlay
    />
  </View>
);

export default VideoPlayer;
