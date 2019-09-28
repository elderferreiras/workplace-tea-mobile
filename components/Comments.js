import React, {Fragment} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import CommentItem from "./CommentItem";
import DefaultText from "./DefaultText";
import Colors from "../constants/Colors";

const Comments = (props) => {
    let comments = (
        <View style={styles.container}>
            <DefaultText>No comments yet.</DefaultText>
        </View>
    );

    let loading = null;

    if (props.submitting) {
        loading = <ActivityIndicator size="large" color={Colors.primary}/>;
    }

    if (props.comments.length) {
        comments = props.comments.map(comment =>
            <CommentItem key={comment.id}
                         content={comment.content}
                         author={comment.author}
                         createdAt={comment.createdAt}/>);
    }

    return (
        <Fragment>
            {comments}
            {loading}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontStyle: 'italic',
        alignItems: 'center'
    }
});

export default Comments;