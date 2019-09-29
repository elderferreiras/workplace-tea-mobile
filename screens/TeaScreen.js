import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Alert, Platform
} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {getDate} from "../helpers/utils";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Comments from "../components/Comments";
import HeaderButton from "../components/HeaderButton";
import FloatingButton from "../components/FloatingButton";
import NewCommentScreen from "./NewCommentScreen";
import {validate} from "../utility/utility";
import randomGenerator from 'random-username-generator';
import axios from 'axios';
import {reportInappropriateContent} from "../store/actions";

const TeaScreen = (props) => {
    const id = props.navigation.getParam('id');

    const [openModal, setOpenModal] = useState(false);
    const [comment, setComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const cancel = () => {
        setOpenModal(false);
    };

    const open = () => {
        setOpenModal(true);
    };

    const commentChangeHandler = (value) => {
        setComment(value);
    };


    const submitCommentHandler = (event) => {
        event.preventDefault();
        if (comment.length && comment.length <= 500) {
            setSubmittingComment(true);
            if (isCommentValid(comment)) {
                cancel();

                axios.get('https://api.ipify.org/?format=json').then(res => {
                    if (res.data.ip.length) {
                        createComment(res.data.ip);
                    } else {
                        loadFakeComment();
                    }
                }).catch(err => {
                    createComment();
                }).finally(res => {
                    setComment('');
                    setSubmittingComment(false);
                });
            } else {
                loadFakeComment();
                cancel();
            }

        } else {
            Alert.alert(
                "Empty comment",
                'Silence speaks volumes, but not here... type something.',
                [{text: 'Dismiss', style: 'cancel'}]
            );
        }
    };

    const createComment = (ip = null, content = comment) => {
        props.createComment(
            content,
            randomGenerator.generate().toLowerCase(),
            id,
            ip
        );
    };

    const loadFakeComment = () => {
        props.loadInappropriateComment(comment, props.tea, randomGenerator.generate().toLowerCase());
        setComment('');
        setSubmittingComment(false);
    };

    const isCommentValid = (content) => {
        return validate(content, {
            empty: true,
            profanity: true,
            consecutive: true,
            ascii: true,
            tea: props.tea
        });
    };

    useEffect(() => {
        props.getTea(id);
    }, [id]);

    let tea = <ActivityIndicator size="large" color={Colors.primary}/>;

    if (props.tea && !props.loading) {
        tea = (
            <View style={styles.screen}>
                <View style={styles.teaContainer}>
                    <Text style={styles.timestamp}>
                        Posted on {getDate(props.tea.createdAt)}
                    </Text>

                    <Text style={styles.tea}>
                        {props.tea.content}
                    </Text>

                    <View style={styles.controlsContainer}>
                        <View style={styles.buttonContainer}>
                            <AntDesign
                                name='like2'
                                color={Colors.grey}
                                style={styles.button}
                                size={18}
                                iconStyle={styles.iconStyle}>
                                <Text> {props.tea.up}</Text>
                            </AntDesign>

                            <AntDesign
                                name='dislike2'
                                color={Colors.grey}
                                style={styles.button}
                                size={18}
                                iconStyle={styles.iconStyle}>
                                <Text> {props.tea.down}</Text>
                            </AntDesign>
                        </View>

                        <View style={styles.commentsIcon}>
                            <FontAwesome name="comment-o" size={18} color={Colors.grey}>
                                <Text style={styles.commentText}> {props.tea.comments.items.length}</Text>
                            </FontAwesome>
                        </View>
                    </View>
                </View>

                <ScrollView style={styles.commentsContainer}>
                    <View style={styles.commentsWrapper}>
                        <Comments comments={props.tea.comments.items} submitting={submittingComment}/>
                    </View>
                </ScrollView>
                <FloatingButton open={open} icon="comment-plus-outline"/>

                <NewCommentScreen visible={openModal}
                                  submit={submitCommentHandler}
                                  change={commentChangeHandler}
                                  comment={comment}
                                  cancel={cancel}/>
            </View>
        );
    }

    return tea;
};

TeaScreen.navigationOptions = (data) => {
    return {
        headerTitleStyle: {
            fontFamily: Fonts.semiBold,
            color: Platform.OS === 'android'? Colors.white : Colors.primary
        },
        headerTintColor: Platform.OS === 'android'? Colors.white : Colors.primary,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Flag content"
                    iconName="flag"
                    onPress={() => {
                        Alert.alert(
                            'Report Inappropriate Content',
                            'We rely on Workplace Tea community members to report content that they find inappropriate. Are you sure you want to report this content?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Yes', onPress: () => {
                                        reportInappropriateContent(data.navigation.getParam('id'));
                                    }
                                },
                            ],
                            {cancelable: false},
                        );
                    }}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.accent,
        flex: 1
    },
    teaContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    inputContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    commentsContainer: {
        paddingVertical: 10,
        borderTopColor: Colors.grey,
        borderTopWidth: 1
    },
    commentsWrapper: {
        marginBottom: 20
    },
    controlsContainer: {
        flexDirection: 'row',
        marginVertical: 10
    },
    commentsIcon: {
        width: '50%',
        alignItems: 'flex-end'
    },
    tea: {
        fontSize: 20,
        fontFamily: Fonts.bold
    },
    commentText: {
        padding: 20,
        margin: 20,
    },
    timestamp: {
        fontSize: 14,
        color: Colors.grey,
        fontStyle: 'italic'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'flex-start'
    },
    button: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginRight: 5
    },
    iconStyle: {
        marginRight: 5
    }
});


const mapStateToProps = (state) => {
    return {
        tea: state.teaReducer.tea,
        loading: state.teaReducer.loading,
        error: state.teaReducer.error,
        blocked: state.teasReducer.blocked
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTea: (id) => dispatch(actions.fetchTea(id)),
        createComment: (content, author, teaId, ip) => dispatch(actions.createComment(content, author, teaId, ip)),
        isIPBlocked: () => dispatch(actions.isIPBlocked()),
        blockIP: (ip) => dispatch(actions.blockIP(ip)),
        loadInappropriateComment: (comment, tea, author) => dispatch(actions.loadInappropriateComment(comment, tea, author))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeaScreen);