import React, {useEffect, useState} from 'react';
import {SimpleLineIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {StyleSheet, View, Text} from "react-native";
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import * as votingType from '../store/actions/voting';
import { checkVote } from '../utility/utility';

const Voting = (props) => {
    const { up, down } = props;
    const [colorUp, setColorUp] = useState(Colors.grey);
    const [colorDown, setColorDown] = useState(Colors.grey);

    useEffect(()  => {
       checkVote(props.id).then(vote => {
           if(vote === votingType.UP) {
               setColorUp(Colors.black);
               setColorDown(Colors.grey);
           } else if (vote === votingType.DOWN) {
               setColorDown(Colors.black);
               setColorUp(Colors.grey)
           }
       });
    }, [up, down]);

    return (
        <View style={styles.buttonContainer}>
            <SimpleLineIcons.Button
                name="like"
                color={colorUp}
                style={styles.button}
                iconStyle={styles.iconStyle}
                backgroundColor={Colors.white}
                onPress={() => props.countUpVote(props.id, props.up, props.down)}>
                <Text>{props.up}</Text>
            </SimpleLineIcons.Button>

            <SimpleLineIcons.Button
                name="dislike"
                color={colorDown}
                style={styles.button}
                iconStyle={styles.iconStyle}
                backgroundColor={Colors.white}
                onPress={() => props.countDownVote(props.id, props.up, props.down)}>
                <Text>{props.down}</Text>
            </SimpleLineIcons.Button>
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