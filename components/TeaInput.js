import React, {useEffect} from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';

const teaForm = (props) => {
    return (
        <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
                <TextInput
                    autoFocus={true}
                    placeholder="What's the tea?"
                    onChangeText={props.changed}
                    multiline={true}
                    style={styles.input}
                    value={props.tea.content}
                    maxLength={250}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'flex-start'
    },
    input: {
        ...Platform.select({
            ios: {
                marginTop: 10,
                padding: 20
            },
            android: {
                padding: 20
            }
        }),
        fontSize: 18
    }
});

export default teaForm;