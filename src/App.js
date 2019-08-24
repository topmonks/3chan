import React, { Component } from 'react';
import Box from '3box';
import logo from './logo.svg';
import './App.css';
import { Link, Router } from '@reach/router';
import Thread from './screens/Thread';
import Board from './screens/Board';
import NotFound from './screens/NotFound';

const GlobalThreadAddress = "/orbitdb/zdpuB2VvLGjjdfdfRQYp9e4iBYhANthhg3EDZhsDnBgC5DL8x/3box.thread.global.threadList";

export default class App extends Component {
    state = { syncing: true, account: "none" }

    async componentDidMount() {
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.ethereum.on('accountsChanged', accounts => this.createBox(accounts));
        const accounts = await window.ethereum.enable();
        this.createBox(accounts);
    }

    async profileSynced() {
        console.log("synced");
        const space = await this.box.openSpace("global");
        this.thread = await space.joinThreadByAddress(GlobalThreadAddress);
        console.log(this.thread);
        const threads = await this.thread.getPosts();
        console.log("threads", threads);
        this.setState({ syncing: false, threads });
    }

    async createBox(accounts) {
        console.log("Loading new accounts");
        if (this.box) {
            await this.box.logout();
        }
        this.box = await Box.openBox(accounts[0], window.web3.currentProvider)
        this.setState({ account: accounts[0] });
        this.box.onSyncDone(() => this.profileSynced());
    }

    async createGlobalThread() {
        const space = await this.box.openSpace("global");
        const thread = await space.joinThread("threadList");
        console.log(space, thread);
        console.log("thread address", thread.address);
    }

    render() {
        const { syncing, account } = this.state;
        return (
            <div className="App">
                <Link className="App-link" to="/">
                    Home
                </Link>
                <button href="#" onClick={() => this.createGlobalThread()}>create global thread</button>
                { account ? <span>Account: {account}</span> : "" }
                { syncing ? <span className="App-blinker">Syncing...</span> : ""}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <main>
                    <Router>
                        <Board path="/" box={this.box} />
                        <Thread path="/thread/:threadId" />
                        <NotFound default />
                    </Router>
                </main>
            </div>
        );
    }
}
