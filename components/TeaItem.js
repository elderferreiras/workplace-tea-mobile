import React, { Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class TeaItem extends Component {
    render() {
        return (
            <View style={styles.post}>
                <Text>
                    {this.props.content}
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    post: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});

export default TeaItem;