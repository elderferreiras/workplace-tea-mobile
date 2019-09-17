import React from 'react';
import TeaItems from './TeaItems';
import {View,Text} from 'react-native';

const teas = (props) => {

    let teas = <Text>No tea has been spilled yet. Want to be the first to spill it?</Text>;

    if (props.teas.length) {
        teas = <TeaItems items={props.teas}/>;
    }

    return (
        <View>
            {teas}
        </View>
    );
};

export default teas;