import React from 'react';
import {Platform, StyleSheet, View} from "react-native";
import MainButton from "../shared/MainButton";
import Colors from "../constants/Colors";

const NewTeaButtons = (props) => {
    return (
        <View style={styles.buttonContainer}>
            <MainButton onPress={props.cancel} style={styles.cancelButton}
                        textStyle={styles.cancelButtonText}>Cancel</MainButton>
            <MainButton onPress={props.submit}>Send</MainButton>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonContainer: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 10,
                paddingTop: 40,
                paddingBottom: 10
            },
            android: {
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 10
            },
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey
    },
    cancelButton: {
        backgroundColor: '#dedfe2'
    },
    cancelButtonText: {
        color: '#89898a'
    }
});

export default NewTeaButtons;