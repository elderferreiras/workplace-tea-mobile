import React from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {View,StyleSheet} from "react-native";

const NewTeaButton = (props) => {
    return (
        <View style={styles.floatingButtonContainer}>
            <FontAwesome.Button name="edit" backgroundColor="black" onPress={props.open.bind(this)}>
                Post Tea
            </FontAwesome.Button>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    }
});

export default NewTeaButton;