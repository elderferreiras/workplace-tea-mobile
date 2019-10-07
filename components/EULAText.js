import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Fonts from "../constants/Fonts";

const EULAText = (props) => {
    return <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontFamily: Fonts.normal,
        fontSize: 12
    }
});

export default EULAText;