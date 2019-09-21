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
import MainButton from '../shared/MainButton';
import Colors from "../constants/Colors";

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
                    <MainButton onPress={props.cancel} style={styles.cancelButton}
                                textStyle={styles.cancelButtonText}>Cancel</MainButton>
                    <MainButton onPress={teaSubmitHandler}>Send</MainButton>
                </View>
                <TeaInput tea={tea} changed={teaChangeHandler} inputRef={props.inputRef}/>
            </Modal>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row'
    },
    buttonContainer: {
        ...Platform.select({
            ios: {
                paddingHorizontal: 10,
                paddingTop: 40,
                paddingBottom: 10
            },
            android: {
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 10
            },
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey
    },
    cancelButton: {
        backgroundColor: '#dedfe2'
    },
    cancelButtonText: {
        color: '#89898a'
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
