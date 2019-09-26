import React, {useEffect, useState} from 'react';
import {AntDesign} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {StyleSheet, View, Text} from "react-native";
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import * as votingType from '../store/actions/voting';
import { checkVote } from '../utility/utility';

const Voting = (props) => {
    const { up, down } = props;
    const [likeIcon, setLikeIcon] = useState('like2');
    const [dislikeIcon, setDislikeIcon] = useState('dislike2');
    const [colorUp, setColorUp] = useState(Colors.grey);
    const [colorDown, setColorDown] = useState(Colors.grey);

    useEffect(()  => {
       checkVote(props.id).then(vote => {
           if(vote === votingType.UP) {
               setColorUp(Colors.black);
               setColorDown(Colors.grey);
               setLikeIcon('like1');
               setDislikeIcon('dislike2');
           } else if (vote === votingType.DOWN) {
               setColorDown(Colors.black);
               setColorUp(Colors.grey);
               setDislikeIcon('dislike1');
               setLikeIcon('like2');
           }
       });
    }, [up, down]);

    return (
        <View style={styles.buttonContainer}>
            <AntDesign.Button
                name={likeIcon}
                color={colorUp}
                style={styles.button}
                iconStyle={styles.iconStyle}
                backgroundColor={Colors.white}
                onPress={() => props.countUpVote(props.id, props.up, props.down)}>
                <Text>{props.up}</Text>
            </AntDesign.Button>

            <AntDesign.Button
                name={dislikeIcon}
                color={colorDown}
                style={styles.button}
                iconStyle={styles.iconStyle}
                backgroundColor={Colors.white}
                onPress={() => props.countDownVote(props.id, props.up, props.down)}>
                <Text>{props.down}</Text>
            </AntDesign.Button>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'flex-start'
    },
    button: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginRight: 5
    },
    iconStyle: {
        marginRight: 5
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        countUpVote: (id, countUp, countDown) => dispatch(actions.countUpVote(id, countUp, countDown)),
        countDownVote: (id, countUp, countDown) => dispatch(actions.countDownVote(id, countUp, countDown))
    };
};

export default  connect(null, mapDispatchToProps)(Voting);