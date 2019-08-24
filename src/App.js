import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Router } from '@reach/router';
import Thread from './screens/Thread';
import Dashboard from './screens/Dashboard';
import NotFound from './screens/NotFound';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Link className="App-link" to="/">
                        Home
                    </Link>
                </header>
                <main>
                    <Router>
                        <Dashboard path="/" />
                        <Thread path="/thread/:threadId" />
                        <NotFound default />
                    </Router>
                </main>
            </div>
        );
    }
}
