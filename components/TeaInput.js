import React, { useEffect } from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';

const teaForm = (props) => {
    useEffect(() => {
        props.inputRef.current.focus();
    }, [props.inputRef]);

    return (
        <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="What's the tea?"
                    onChangeText={props.changed}
                    multiline={true}
                    style={styles.input}
                    value={props.tea.content}
                    ref={props.inputRef}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },
    input: {
        padding: 20,
        fontSize: 18
    }
});

export default teaForm;