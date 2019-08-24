import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Router } from '@reach/router';
import Thread from './screens/Thread';
import Board from './screens/Board';
import NotFound from './screens/NotFound';

export default class App extends Component {
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
