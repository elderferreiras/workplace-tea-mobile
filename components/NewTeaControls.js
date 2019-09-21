import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

const NewTeaControls = (props) => {
    const textStyles = [styles.counter];

    if (props.tea.content.length === 250) {
        textStyles.push(styles.bold);
    } else {
        textStyles.push(styles.normal);
    }

    return (
        <View style={styles.controls}>
            <View style={styles.countContainer}>
                <Text style={textStyles}>{props.tea.content.length}/250</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    controls: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    countContainer: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.accent,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    counter: {
        fontSize: 16
    },
    normal: {
        fontFamily: Fonts.normal
    },
    bold: {
        fontFamily: Fonts.bold
    }
});

export default NewTeaControls;