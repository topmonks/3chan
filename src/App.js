import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Router } from '@reach/router';
import Thread from './screens/Thread';
import Board from './screens/Board';
import NotFound from './screens/NotFound';

import Data from './library/3box.js';

export default class App extends Component {
    state = { syncing: true, account: "none" }

    async componentDidMount() {
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.ethereum.on('accountsChanged', accounts => this.createBox(accounts));
        const accounts = await window.ethereum.enable();
        this.setState({ account: accounts[0] });
        this.createBox(accounts);
    }

    async createBox(accounts) {
        console.log("Loading new accounts");
        if (this.box) {
            console.log("Logging out first");
            await this.box.logout();
        }
        this.setState({ account: accounts[0] });
        this.box = await Data.init(accounts[0], window.web3.currentProvider);
        this.box.sync().then(async () => {
            console.log("sync done");
            this.setState({ syncing: false });
        });
    }

    render() {
        const { syncing, account } = this.state;
        const handleCgt = this.box ? () => this.box.createGlobalThread() : (() => {})
        return (
            <div className="App">
                <Link className="App-link" to="/">
                    Home
                </Link>
                { account ? <span>Account: {account}</span> : "" }
                { syncing ? <span className="App-blinker">Syncing...</span> : ""}
                <button onClick={handleCgt}>cgt</button>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <main>
                    <Router>
                        <Board path="/" box={this.box} ready={!syncing}/>
                        <Thread path="/thread/:threadId" box={this.box} ready={!syncing}/>
                        <NotFound default />
                    </Router>
                </main>
            </div>
        );
    }
}
