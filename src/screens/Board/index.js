import React, { useEffect, useState } from 'react';
import './Board.css';
import PostForm from '../../components/PostForm';
import Thread from '../../components/Thread';

export default function Board(props) {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        if (!props.ready) {
            console.log("not ready");
            return
        }
        console.log("set th ready");
        props.box.onThreadListUpdate(threads => {
            console.log("ThreadList updated", threads);
            setThreads(threads.map(t => t.message));
        })
        props.box.getThreads().then(threads => {
            console.log("ThreadList", threads);
            setThreads(threads.map(t => t.message));
        });
    }, [props.ready]);

    const handleSubmit = data => props.box.createThread(data);

    return (
        <div>
            <h1 className="Board-name">Board Name</h1>
            <hr />
            <PostForm submit={handleSubmit}/>
            <hr />
            {threads.map(thread => (
                <div key={thread.id}>
                    <Thread box={props.box} thread={thread} />
                    <hr />
                </div>
            ))}
        </div>
    );
}
