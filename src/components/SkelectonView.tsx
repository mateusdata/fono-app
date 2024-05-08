import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Skelecton from './Skelecton'
import * as  Animatable from "react-native-animatable"
import MyLoader from './myLoader'
import LoadingComponent from './LoadingComponent'

const SkelectonView = () => {
    const [visible, setVisible] = useState(true)
    useEffect(()=>{
        setTimeout(() => {
            setVisible(false)
        }, 200);
    },[visible])
    if(visible){
        return null
    }
    return (
        <>
            { true ? 
                <Animatable.View animation={"bounceInLeft"} style={{ padding: 10 }}>
                    <Skelecton width="100%" />
                    <Skelecton width="100%" />
                    <Skelecton width="100%" />
                    <Skelecton width="100%" />
                    <Skelecton width="100%" />
                </Animatable.View>
                :
                <LoadingComponent />
            }
        </>
    )
}

export default SkelectonView
