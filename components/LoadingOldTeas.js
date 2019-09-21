import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const LoadingOldTeas = () => {
    return (
        <View
            style={{
                position: 'relative',
                paddingVertical: 20,
                marginTop: 10,
                marginBottom: 10
            }}>
            <ActivityIndicator animating size="large"/>
        </View>
    );
};

export default LoadingOldTeas;