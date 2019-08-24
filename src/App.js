import React, { Component } from 'react';
import Box from '3box';
import logo from './logo.svg';
import './App.css';
import { Link, Router } from '@reach/router';
import Thread from './screens/Thread';
import Board from './screens/Board';
import NotFound from './screens/NotFound';

export default class App extends Component {
    async componentDidMount() {
        this.box = await Box.openBox("0x64191784F22aAa37E2591dd18CCD0b58965aA792", window.web3.currentProvider)
        this.box.onSyncDone(() => this.profileSynced());
    }

    async profileSynced() {
        const spaces = await this.box.listSpaces();
        console.log(spaces);
    }

    render() {
        return (
            <div className="App">
                <Link className="App-link" to="/">
                    Home
                </Link>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <main>
                    <Router>
                        <Board path="/" />
                        <Thread path="/thread/:threadId" />
                        <NotFound default />
                    </Router>
                </main>
            </div>
        );
    }
}
