import React from 'react';

import { Text, View, TouchableOpacity, Alert  } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteLogActivity, toggleLove } = actions;
const { normalize } = theme;

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onOption(buttonIndex){
        const { logactivity, index } = this.props;
        const quote = logactivity[index];
if (buttonIndex === 0) this.onDelete();
    }

    showActionSheet = () => {
        this.ActionSheet.show()
      }

    onDelete(){
        const { logactivity, index } = this.props;
        const quote = logactivity[index];

        this.props.deleteLogActivity(quote, (error) =>  alert(error.message))
    }


    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.showActionSheet}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={'md-more'}
                            type='ionicon'
                            color='#fff'
                            size={normalize(20)}
                        />
                    </View>
                </TouchableOpacity>
                <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Action'}
          options={['Delete', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => { this.onOption(index)}}
        />
            </View>
        )
    }


    render() {
        const { user, logactivity, index } = this.props;
        const quote = logactivity[index];
        const { username, timestamp } = quote;

        return (
            <View style={[styles.container]}>
                <View style={[styles.wrapper, {backgroundColor: "black", borderColor: "white"}]}>

                    <View style={[styles.quote]}>
                        <Text style={[styles.text]}>
                            Name: {username ? username : null}
                        </Text>
                        {this.renderOptionButton()}
                    </View>

                    <View style={styles.bottom}>

                        <View style={styles.left}>
                            <Text style={[styles.publishedAt]}>
                                {timestamp? moment(timestamp).fromNow() : null}
                            </Text>
                        </View>
                        
                    </View>
                </View>

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

export default connect(mapStateToProps, { deleteLogActivity, toggleLove })(Quote);