import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Voting from "./Voting";
import {FontAwesome} from "@expo/vector-icons";
import {getDate} from "../helpers/utils";

const TeaItem = (props) => {
    let comments = null;
    let timestamp = null;
    let footer = null;

    const containerStyle = [styles.teaContainer];
    const teaStyle = [styles.tea];

    const selectTeaHandler = (id) => {
        props.navigation.navigate({
            routeName: 'Tea', params: {
                id: id
            }
        });
    };

    if (props.comments) {
        comments = (
            <Fragment>
                <Voting up={props.up ? props.up : 0} id={props.id}
                        down={props.down ? props.down : 0}/>
                <View style={styles.commentsContainer}>
                    <Text
                        onPress={() => selectTeaHandler(props.id)}>{props.comments.length} {props.comments.length === 1 ? ' Comment' : ' Comments'}</Text>
                </View>
            </Fragment>);
    }

    if (props.createdAt) {
        timestamp = <Text style={styles.timestamp}>Posted on {getDate(props.createdAt)}</Text>;
    }

    if (props.footer) {
        footer = (
            <View style={styles.footerContainer}>
                <Text style={styles.footer}>{props.footer}</Text>
                <FontAwesome style={styles.footerIcon} name="coffee" size={16} color="black"/>
            </View>
        );

        teaStyle.push({textAlign: 'center'});
    } else {
        containerStyle.push({
            backgroundColor: Colors.white
        });
    }

    return (
        <View style={containerStyle}>
            {timestamp}
            <Text style={teaStyle}>
                {props.content}
            </Text>
            <View style={styles.controlsContainer}>
                {comments}
            </View>
            {footer}
        </View>
    );
};

const styles = StyleSheet.create({
    teaContainer: {
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
    },
    footerContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        marginBottom: 20,
        justifyContent: 'center'
    },
    footer: {
        fontSize: 18,
        fontFamily: Fonts.bold
    },
    footerIcon: {
        paddingLeft: 5
    }
});

export default TeaItem;