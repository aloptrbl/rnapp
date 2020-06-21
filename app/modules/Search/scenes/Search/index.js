import React from 'react';

var {View, StyleSheet, Alert, Text, FlatList, Image, TouchableOpacity} = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ActionSheet from 'react-native-actionsheet'
import styles from "./styles"
import Quote from "../../components/Quote"
import {actions as auth, theme} from "../../../Search/index"
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const {getLogActivity, deleteLogActivity} = auth;
const image = "https://cdn4.iconfinder.com/data/icons/seo-web-blue-1/100/seo__web_blue_1_25-512.png";
const {color} = theme;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getLogActivity((error) => alert(error.message))
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    renderItem({item, index}) {
        return <Quote index={index}/>
        // return <TouchableOpacity onLongPress={()=> this.props.deleteLogActivity(item.key, (error) =>  alert(error.message))}><View style={{backgroundColor: '#e74c3c', margin: 5, padding: 25, borderRadius: 5}}>
        // <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Name:</Text>
        // <Text style={{color:'white', fontWeight: 'bold', fontSize: 15}}>{item.username}</Text>
        // <Text style={{textAlign:'right',color: 'white'}}>{item.timestamp ? item.timestamp : null}</Text>
        // </View></TouchableOpacity>
    }

    onSignOut = () => {
        this.props.signOut()
            .then(() => Actions.reset("Auth"))
            .catch((error) => {
                Alert.alert('Oops!', error.message);
            })
    }

    render() {
        return (
            <View style={styles.container}>
            <FlatList
            ref="listRef"
            data={this.props.logactivity}
            renderItem={this.renderItem}
            initialNumToRender={5}
            keyExtractor={(item, index) => index.toString()} />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        logactivity: state.searchReducer.logactivity
   
    }
}

export default connect(mapStateToProps, {getLogActivity, deleteLogActivity})(Search);