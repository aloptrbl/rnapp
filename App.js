import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './app/config/routes'
import store from './app/redux/store';

console.disableYellowBox = true;
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }


    render() {
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}