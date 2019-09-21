import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import * as actions from '../store/actions';
import {connect} from 'react-redux';
import TeaItem from "../components/TeaItem";
import Colors from "../constants/Colors";
import Loading from "../shared/Loading";

const TeaFeedScreen = (props) => {
    useEffect(() => {
        props.isIPBlocked();

        if (!props.hasEverything && !props.next) {
            props.fetchTeas();
        }
    }, []);

    let teas = <Loading/>;

    if (props.teas && !props.starting) {
        teas = <FlatList data={props.teas}
                         keyExtractor={(tea, index) => tea.id}
                         renderItem={tea => <TeaItem
                             id={tea.item.id}
                             key={tea.item.id}
                             content={tea.item.content}
                             createdAt={tea.item.createdAt}
                             up={tea.item.up}
                             down={tea.item.down}
                             comments={tea.item.comments.items}
                         />}/>
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen} animationType="slide">
                <View style={styles.teaContainer}>
                    {teas}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = state => {
    return {
        teas: state.teasReducer.teas,
        starting: state.teasReducer.starting,
        next: state.teasReducer.next,
        previous: state.teasReducer.previous,
        loading: state.teasReducer.loading,
        hasEverything: state.teasReducer.hasEverything,
        blocked: state.teasReducer.blocked
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTeas: (init) => dispatch(actions.fetchTeas(init)),
        saveTea: (content, ip) => dispatch(actions.submitTea(content, ip)),
        isIPBlocked: () => dispatch(actions.isIPBlocked()),
        blockIP: (ip) => dispatch(actions.blockIP(ip)),
        loadInappropriateTea: (content) => dispatch(actions.loadInappropriateTea(content))
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accent
    },
    teaContainer: {
        width: '100%',
        paddingTop: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeaFeedScreen);
