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
        borderBottomColor: '#9c9c9c',
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default TeaItem;