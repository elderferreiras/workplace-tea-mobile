import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import * as actions from '../store/actions';
import {connect} from 'react-redux';
import TeaItem from "../components/TeaItem";
import Colors from "../constants/Colors";
import Loading from "../shared/Loading";
import LoadingOldTeas from "../components/LoadingOldTeas";

const TeaFeedScreen = (props) => {
    useEffect(() => {
        props.isIPBlocked();

        if (!props.hasEverything && !props.next) {
            props.fetchTeas();
        }
    }, []);

    let teas = <Loading/>;


    const fetchMore = () => {
        if (props.loading || props.starting || props.next === null) return;

        if (props.next !== props.previous) {
            props.fetchTeas();
        }
    };

    const loadingTeas = () => {
        if(props.loading) {
            return <LoadingOldTeas/>
        } else if(props.hasEverything) {
            return <TeaItem
                content="Wow that was a lot of tea, but we're running out of it. Have any tea to spill? Just do it."
                footer={"Workplace Tea"}/>
        } else {
            return null;
        }
    };

    const refreshTeas = () => {
        props.fetchTeas(true);
    };

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
                             comments={tea.item.comments? tea.item.comments.items : null}/>
                         }
                         onEndReachedThreshold={0.5}
                         initialNumToRender={10}
                         onEndReached={fetchMore}
                         onRefresh={refreshTeas}
                         refreshing={props.loading}
                         ListFooterComponent={loadingTeas}/>
    }

    return (
        <View style={styles.screen} animationType="slide">
            <View style={styles.teaContainer}>
                {teas}
            </View>
        </View>
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
        backgroundColor: Colors.accent,
        marginBottom: 50
    },
    teaContainer: {
        paddingTop: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeaFeedScreen);
