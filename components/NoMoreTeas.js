import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const NoMoreTeas = (props) => {
    return (
        <View style={styles.teaContainer}>
            <Text style={styles.tea}>
                Wow that was a lot of tea, but we're running out of it. Have any tea to spill? Just do it.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    teaContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    tea: {
        fontSize: 18,
        fontFamily: Fonts.normal
    },
    timestamp: {
        fontSize: 12,
        color: Colors.grey,
        fontStyle: 'italic'
    },
    controlsContainer: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 10
    },
    commentsContainer: {
        width: '50%',
        alignItems: 'flex-end'
    }
});

export default NoMoreTeas;