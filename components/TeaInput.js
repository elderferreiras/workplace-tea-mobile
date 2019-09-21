import React, {useEffect} from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Modal} from 'react-native';
import NewTeaControls from "./NewTeaControls";

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

            <NewTeaControls tea={props.tea}/>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'flex-start'
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