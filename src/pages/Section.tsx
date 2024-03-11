import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import api from '../config/Api'
import { ResizeMode, Video } from 'expo-av'

const Section = () => {
    const [url, setUrl] = useState<string>("")
    const baseUsl = "https://fono-api-solitary-surf-9909.fly.dev/videos/"
    useEffect(() => {
        const fetchData = async () => {
           try {
            const response  = await api.get("/info-exercise/8")
            //alert(JSON.stringify(response.data))
            setUrl(response.data.video_urls[0])
           } catch (error) {    
            alert(JSON.stringify(error))
           }
        }
        fetchData()
    }, [])
    return (
        <View>
            <Text>seão atual {url}</Text>
            <Text selectable >url { baseUsl+"/"+url}</Text>

           
            <Video
                ref={null}
                style={{
                    alignSelf: 'center',
                    width: 275,
                    height: 350,
                    borderRadius: 20,
                    padding: 20,
                    marginVertical: 10,
                    margin: 15,
                    backgroundColor: '#f5f5f5',
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                source={{uri:`${baseUsl}/${url}`}}
                useNativeControls={false}
                resizeMode={ResizeMode.COVER}
                isLooping={true}
                usePoster={true}
                shouldPlay={true}
                isMuted={false}

              />
        </View>
    )
}

export default Section
//     source={{uri:`${api}/${url}`}}