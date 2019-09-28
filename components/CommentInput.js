import React from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';

const commentForm = (props) => {
    return (
        <KeyboardAvoidingView>
            <View style={styles.content}>
                <View>
                    <TextInput
                        autoFocus={true}
                        placeholder="Leave a comment..."
                        onChangeText={props.changed}
                        multiline={true}
                        style={styles.input}
                        value={props.comment}
                        maxLength={250}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between'
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

export default commentForm;