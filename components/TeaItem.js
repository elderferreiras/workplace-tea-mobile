import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Voting from "./Voting";

const TeaItem = (props) => {
    return (
        <View style={styles.teaContainer}>
            <Text style={styles.timestamp}>Posted on September 19, 2019</Text>
            <Text style={styles.tea}>
                {props.content}
            </Text>
            <View style={styles.controlsContainer}>
                <Voting up={props.up ? props.up : 0}
                        down={props.down ? props.down : 0}/>
                <View style={styles.commentsContainer}>
                    <Text>{props.comments.length} {props.comments.length === 1? ' Comment' : ' Comments'}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    teaContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    tea: {
        fontSize: 18,
        fontFamily: Fonts.normal
    },
    timestamp: {
        fontSize: 12,
        color: Colors.grey,
        fontStyle: 'italic'
    },
    controlsContainer: {
        flexDirection: 'row',
        flex: 1,
        marginVertical: 10
    },
    commentsContainer: {
        width: '50%',
        alignItems: 'flex-end'
    }
});

export default TeaItem;