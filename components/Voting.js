import React from 'react';
import {SimpleLineIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {StyleSheet, View, Text} from "react-native";

const Voting = (props) => {
    return (
        <View style={styles.buttonContainer}>
            <SimpleLineIcons.Button
                name="like"
                color={Colors.grey}
                style={styles.button}
                iconStyle={styles.iconStyle}
                backgroundColor={Colors.white} onPress={() => {}}>
                <Text>{props.up}</Text>
            </SimpleLineIcons.Button>

            <SimpleLineIcons.Button
                name="dislike"
                color={Colors.grey}
                style={styles.button}
                iconStyle={styles.iconStyle}
                backgroundColor={Colors.white} onPress={() => {}}>
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

export default Voting;