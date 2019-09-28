import React from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import CommentInput from "../components/CommentInput";
import NewTeaButtons from "../components/NewTeaButtons";

const NewCommentScreen = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Modal visible={props.visible} animationType="slide">
                <NewTeaButtons submit={props.submit} cancel={props.cancel}/>
                <CommentInput comment={props.comment} changed={props.change}/>
            </Modal>
        </TouchableWithoutFeedback>
    );
};

export default NewCommentScreen;
