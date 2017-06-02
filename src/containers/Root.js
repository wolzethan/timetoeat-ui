import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import TimeToEat from './TimeToEat'

const store = configureStore()

export default class Root extends Component {
    render () {
        return (
            <Provider store={store}>
                <TimeToEat />
            </Provider>
        )
    }
}