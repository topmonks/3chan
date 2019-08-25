import React, { useEffect, useState } from 'react';
import './Board.css';
import PostForm from '../../components/PostForm';
import JustPost from '../../components/JustPost';

export default function Board(props) {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        if (!props.ready) {
            console.log('not ready');
            return;
        }
        console.log('set th ready');
        props.box.onThreadListUpdate(threads => {
            console.log('ThreadList updated', threads);
            setThreads((threads || []).map(t => t.message));
        });
        props.box.getThreads({ includeReplies: 3 }).then(threads => {
            console.log('ThreadList', threads);
            setThreads(threads);
        });
    }, [props.ready, props.box]);

    const handleSubmit = data => props.box.createThread(data);

    return (
        <div>
            <h1 className="Board-name">3chan</h1>
            <hr />
            <PostForm submit={handleSubmit} />
            <hr />
            {!props.ready && 'Loading...'}
            {(threads || []).map(thread => (
                <div key={thread.id}>
                    <JustPost isThread {...thread} />
                    {thread.replies.map((post, i) => (
                        <JustPost
                            key={`post-${thread.id}-${i}`}
                            noreply
                            {...post}
                        />
                    ))}
                    <hr />
                </div>
            ))}
        </div>
    );
}
