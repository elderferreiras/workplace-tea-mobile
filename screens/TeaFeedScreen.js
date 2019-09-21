import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import * as actions from '../store/actions';
import {connect} from 'react-redux';
import TeaItem from "../components/TeaItem";
import Colors from "../constants/Colors";
import Loading from "../shared/Loading";

class TeaFeedScreen extends Component {
    componentDidMount() {
        this.props.isIPBlocked();

        if (!this.props.hasEverything && !this.props.next) {
            this.props.fetchTeas();
        }
    }

    render() {
        let teas = <Loading/>;

        if (this.props.teas && !this.props.starting) {
            teas = <FlatList data={this.props.teas}
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
    }
}

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
