import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {View,StyleSheet} from "react-native";
import Colors from "../constants/Colors";

const FloatingButton = (props) => {
    return (
        <View style={styles.floatingButtonContainer}>
            <MaterialCommunityIcons.Button
                name={props.icon}
                backgroundColor={Colors.primary}
                size={36}
                color={Colors.secondary}
                iconStyle={styles.iconStyle}
                style={styles.floatingButton}
                onPress={props.open.bind(this)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30
    },
    floatingButton: {
        borderRadius: 400
    },
    iconStyle: {
        marginRight: 0
    }
});

export default FloatingButton;