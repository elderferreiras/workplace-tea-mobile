import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const teaForm = (props) => {

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="What's the tea?"
                style={styles.input}
                onChangeText={props.changed}
                multiline={true}
                value={props.tea.content}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        width: '100%',
    },
    input: {
        height: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        marginVertical: 10,
        width: '100%'
    }
});

export default teaForm;