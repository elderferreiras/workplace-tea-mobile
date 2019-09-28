import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getContent, getDate} from "../helpers/utils";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

const CommentItem = (props) => {
    return (
        <View style={styles.container}>
            {getContent(props.content)}
            <DefaultText style={styles.footer}>
                Posted by {props.author} on {getDate(props.createdAt)}
            </DefaultText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 10
    },
    footer: {
        fontSize: 14,
        fontStyle: 'italic',
        color: Colors.grey
    }
});

export default CommentItem;