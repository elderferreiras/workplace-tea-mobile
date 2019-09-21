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
        justifyContent: 'flex-end'
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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