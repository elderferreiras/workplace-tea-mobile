import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Colors from "../constants/Colors";

const Loading = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={Colors.primary}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 40
    }
});

export default Loading;