import React, {useState, createRef} from 'react';
import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TouchableOpacity
} from "react-native";
import TeaInput from "../components/TeaInput";
import axios from "axios";
import {validate} from "../utility/utility";
import * as actions from "../store/actions";
import {connect} from "react-redux";

const NewTeaScreen = (props) => {
    const [height, setHeight] = useState();
    const [tea, setTea] = useState({
            content: "",
            count: 0,
            valid: false
        }
    );

    const teaSubmitHandler = () => {
        props.cancel();

        if (tea.content.length) {
            if (isTeaValid()) {
                axios.get('https://api.ipify.org/?format=json').then(res => {
                    if (res.data.ip.length) {
                        props.saveTea(tea.content, res.data.ip);
                    } else {
                        loadFakeTea();
                    }
                }).finally(res => {
                    resetTea();
                }).catch(err => {
                    props.saveTea(this.state.tea.content);
                });
            } else {
                loadFakeTea();
            }
        }
    };

    const loadFakeTea = () => {
        props.loadInappropriateTea(tea.content);
        resetTea();
    };

    const resetTea = () => {
        setTea({
            content: "",
            count: 0,
            valid: false
        });
    };

    const isTeaValid = () => {
        return validate(tea.content, {
            minLength: 0,
            maxLength: 250,
            profanity: true,
            whiteSpace: true,
            singleWord: true,
            consecutive: true,
            specialCharacters: true,
            ascii: true,
            teas: props.teas
        });
    };

    const teaChangeHandler = (value) => {
        let tea = {...tea};

        tea.valid = value.length >= 0 && value.length <= 250;
        tea.content = value;
        tea.count = value.length;

        setTea(tea);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Modal visible={props.visible} animationType="slide">
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.cancel.bind(this)}/>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={teaSubmitHandler} style={styles.sendButton} underlayColor='#fff'>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TeaInput tea={tea} changed={teaChangeHandler} style={{height: height}}/>
                </View>
            </Modal>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingHorizontal: 20
    },
    input: {
        flexDirection: 'row'
    },
    buttonContainer: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 10,
                paddingTop: 40,
            },
            android: {
                paddingHorizontal: 10,
                paddingTop: 10,
            },
        }),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 8,
        color: '#fff',
        backgroundColor: '#0085a1',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0085a1'
    },
    sendButtonText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center'
    }
});


const mapStateToProps = state => {
    return {
        teas: state.teasReducer.teas
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveTea: (content, ip) => dispatch(actions.submitTea(content, ip)),
        loadInappropriateTea: (content) => dispatch(actions.loadInappropriateTea(content))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTeaScreen);
