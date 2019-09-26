import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

const TeaScreen = () => {
    return (
        <View>
            <Text>Tea screen!</Text>
        </View>
    );
};

TeaScreen.navigationOptions = {
    headerTitle: 'Hot Tea',
    headerTintColor: Colors.secondary,
    headerTitleStyle: {
        fontFamily: Fonts.bold,
        color: Colors.secondary,
        textAlign: 'center'
    }
};

const styles = StyleSheet.create({});

export default TeaScreen;