import React from 'react';
import {View, TextInput, Button} from 'react-native';

const teaForm = (props) => {
    return (
      <View>
          <TextInput onChangeText={props.changed} value={props.tea.content}/>
          <Button title="Send" onPress={props.submit}/>
      </View>
    );
};

export default teaForm;