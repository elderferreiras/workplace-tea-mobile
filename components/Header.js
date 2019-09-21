import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey
    },
    headerTitle: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: Fonts.bold
    }
});

export default Header;
