import React, { useEffect, useState } from 'react';
import './Board.css';
import PostForm from '../../components/PostForm';
import JustPost from '../../components/JustPost';

export default function Board(props) {
    const [threads, setThreads] = useState([]);
    const [replies, setReplies] = useState({});

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
        props.box.getThreads({ includeReplies: 3 }).then(([newThreads, loadingPromises]) => {
            console.log('ThreadList', newThreads);
            setThreads(newThreads);
            loadingPromises.forEach(promise => {
                promise.then(([threadId, posts]) => {
                    setReplies({ ...replies, [threadId]: posts });
                    console.log(`Replies for ${threadId} updated`, posts);
                });
            })
        });
    }, [props.ready, props.box]);

    const handleSubmit = data => props.box.createThread(data);

    console.log({ replies });
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
                    {(replies[thread.id] || []).map((post, i) => (
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
