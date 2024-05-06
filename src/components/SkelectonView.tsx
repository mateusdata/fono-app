import React from 'react'
import { View } from 'react-native'
import Skelecton from './Skelecton'
import * as  Animatable from "react-native-animatable"

const SkelectonView = () => {
    return (
        <Animatable.View animation={"bounceInLeft"}   style={{ padding: 10 }}>
            <Skelecton width="100%" />
            <Skelecton width="100%" />
            <Skelecton width="100%" />
            <Skelecton width="100%" />
            <Skelecton width="100%" />
        </Animatable.View>
    )
}

export default SkelectonView
