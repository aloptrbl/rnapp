
import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class Splash extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={{uri: "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/door-512.png"}}/>
                    <Text style={styles.title}>Doris</Text>
                    <Text style={styles.title}>Door Monitoring App</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}