import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';

const videoSource = 'https://fono-api-solitary-surf-9909.fly.dev/videos/cara_de_assustada.mp4';
const posterSource = "https://i.pinimg.com/originals/ff/e1/bb/ffe1bb70f9393f0c115df6a33773f937.gif"


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 5000); // Atraso de 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: "" }}
        style={[styles.video, { backgroundColor: 'transparent' }]}
        resizeMode="cover"
        repeat={true}
        muted={false}
        poster={loading ? posterSource : undefined}
        onLoadStart={handleLoadStart}
        onLoad={handleLoadEnd}
        onError={handleLoadEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  video: {
    borderWidth: 2,
    borderColor: "gray",
    width: "90%",
    height: 200
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});

export default App;
