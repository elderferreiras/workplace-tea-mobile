import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import debounce from 'lodash.debounce';
import * as actions from '../store/actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {validate} from "../utility/utility";
import Teas from './Teas';
import TeaInput from './TeaInput';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tea: {
                content: "",
                count: 0,
                valid: false
            }
        };

        window.onscroll = debounce(this.loadTeas, 100);
    }

    componentDidMount() {
        this.props.isIPBlocked();

        if (!this.props.hasEverything && !this.props.next) {
            this.props.fetchTeas();
        }
    }

    loadTeas = () => {
        if (window.location.pathname !== '/' || this.props.loading || this.props.starting || this.props.next === null) return;

        const height = window.innerHeight + window.pageYOffset;

        if ((height) >= document.body.offsetHeight - 200) {
            if (this.props.next !== this.props.previous) {
                this.props.fetchTeas();
            }
        }
    };

    teaSubmitHandler = (event) => {
        event.preventDefault();

        if (this.state.tea.content.length) {
            if (this.isTeaValid(this.state.tea.content)) {
                axios.get('https://api.ipify.org/?format=json').then(res => {
                    if (res.data.ip.length) {
                        this.props.saveTea(this.state.tea.content, res.data.ip);
                    } else {
                        this.loadFakeTea();
                    }
                }).finally(res => {
                    this.setState({
                        tea: {
                            content: "", count: 0, valid: false
                        }
                    });
                }).catch(err => {
                    this.props.saveTea(this.state.tea.content);
                });
            } else {
                this.loadFakeTea();
            }
        }
    };

    loadFakeTea = () => {
        this.props.loadInappropriateTea(this.state.tea.content);
        this.setState({
            tea: {
                content: "", count: 0, valid: false
            }
        });
    };

    isTeaValid = (content) => {
        return validate(content, {
            minLength: 0,
            maxLength: 250,
            profanity: true,
            whiteSpace: true,
            singleWord: true,
            consecutive: true,
            specialCharacters: true,
            ascii: true,
            teas: this.props.teas
        });
    };

    teaChangeHandler = (value) => {
        let tea = {...this.state.tea};

        tea.valid = value.length >= 0 && value.length <= 250;
        tea.content = value;
        tea.count = value.length;

        this.setState({
            tea: tea
        });
    };

    render() {
        let teas = <Text>Loading...</Text>;

        if(this.props.teas && !this.props.starting) {
            teas = <Teas teas={this.props.teas}
                         loading={this.props.loading}
                         hasEverything={this.props.hasEverything} />;
        }

        return (
            <View style={styles.screen}>
                <View>
                    <TeaInput tea={this.state.tea} submit={this.teaSubmitHandler} changed={this.teaChangeHandler}/>
                </View>
                <View style={styles.posts}>
                    {teas}
                </View>
            </View>
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
        padding: 80
    },
    posts: {
        paddingTop: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
