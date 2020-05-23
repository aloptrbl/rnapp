import React from 'react';

import { Text, View, TouchableOpacity, Alert  } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteQuote, toggleLove } = actions;
const { normalize } = theme;

class Quote extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);

        this.renderLoveButton = this.renderLoveButton.bind(this);
    }

    onOption(buttonIndex){
        const { quotes, index } = this.props;
        const quote = quotes[index];

                if (buttonIndex === 0) Actions.NewQuote({ edit:true, quote })
                else if (buttonIndex === 1) this.onDelete();
    }

    showActionSheet = () => {
        this.ActionSheet.show()
      }

    onDelete(){
        const { quotes, index } = this.props;
        const quote = quotes[index];

        this.props.deleteQuote(quote, (error) =>  alert(error.message))
    }

    onToggleLove(){
        const { user, quotes, index } = this.props;
        const quote = quotes[index];

        const data = { quote, uid:user.uid };

        this.props.toggleLove(data, (error) =>  alert(error.message))
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
          options={['Edit', 'Delete', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => { this.onOption(index)}}
        />
            </View>
        )
    }

    renderLoveButton(){
        const { user, quotes, index } = this.props;
        const quote = quotes[index];
        const { loves } = quote;

        return(
            <TouchableOpacity onPress={this.onToggleLove}>
                <View style={styles.buttonContainer}>
                    <Icon
                        name={
                            (loves && loves[user.uid]) ?
                                'md-heart'
                                :
                                'md-heart-empty'
                        }
                        type='ionicon'
                        color='#fff'
                        iconStyle={{height:normalize(20)}}
                        size={normalize(20)}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { user, quotes, index } = this.props;
        const quote = quotes[index];
        const { text, author, time, color, userId } = quote;

        return (
            <View style={[styles.container]}>
                <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>

                    <View style={[styles.quote]}>
                        <Text style={[styles.text]}>
                            {text}
                        </Text>
                        {(user.uid === userId) && this.renderOptionButton()}
                    </View>

                    <View style={styles.bottom}>

                        <View style={styles.left}>
                            <Text style={[styles.author]}>
                                {author.name}
                            </Text>
                            <Text style={[styles.publishedAt]}>
                                {moment(time).fromNow()}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            {this.renderLoveButton()}
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
        quotes: state.homeReducer.quotes
    }
}

export default connect(mapStateToProps, { deleteQuote, toggleLove })(Quote);