import React, { Component} from 'react';
import {Text, View} from 'react-native';

class TeaItem extends Component {
    render() {
        return (
            <View>
                <Text>
                    {this.props.content}
                </Text>
            </View>
        );
    }
}

export default TeaItem;