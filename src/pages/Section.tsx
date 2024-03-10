import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import axiosInstance from '../config/axiosInstance'

const Section = () => {
    useEffect(() => {
        const fetchData = async () => {
           try {
            const response  = await axiosInstance.get("/info-exercise/2")
            alert(JSON.stringify(response.data))
           } catch (error) {    
            alert(JSON.stringify(error))
           }
        }
        fetchData()
    }, [])
    return (
        <View>
            <Text>seão atual</Text>
        </View>
    )
}

export default Section
