import React, { useEffect, useState, Fragment } from 'react';
import './Thread.css';
import PostForm from '../../components/PostForm';
import JustPost from '../../components/JustPost';

export default function Thread(props) {
    const [boxThread, setBoxThread] = useState({});
    const [threadData, setThreadData] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!props.ready) {
            console.log('not ready');
            return;
        }
        console.log('fetch thread', props.threadId);
        props.box.getThreadById(props.threadId).then(async data => {
            console.log('found thread', data);
            setThreadData(data);
            const thread = await props.box.joinThread(data.address, true);
            thread.onUpdate(async () => {
                const posts = await thread.getPosts();
                await Promise.all(
                    posts.map(async post => {
                        post.message.you = await props.box.isYou(post.author);
                    }),
                );
                console.log(`thread ${props.threadId} updated`, posts);
                setPosts(posts.map(p => p.message));
            });
            setBoxThread(thread);
            const posts = await thread.getPosts();
            await Promise.all(
                posts.map(async post => {
                    post.message.you = await props.box.isYou(post.author);
                }),
            );
            console.log(`loaded posts for ${props.threadId}`, posts);
            setPosts(posts.map(p => p.message));
        });
    }, [props.ready, props.box, props.threadId]);

    const handleSubmit = async data => {
        console.log(`posting to ${props.threadId}`, data);
        console.log(boxThread);
        console.log(await boxThread.post(data));
    };

    const postTags = () => (
        <Fragment>
            <JustPost isThread {...threadData} noreply you={threadData.you} />
            {posts.map((post, i) => (
                <JustPost
                    key={`post-${threadData.id}-${i}`}
                    {...post}
                    noreply
                    you={post.you}
                />
            ))}
        </Fragment>
    );

    const showFileDetail = props.detail === 'file';
    if (showFileDetail) {
        const { data } = threadData.file || {};
        return (
            <div className="FileDetail">
                {props.ready ? <img src={data} alt="detail" /> : 'Loading...'}
            </div>
        );
    }

    return (
        <div>
            <h1 className="Board-name">3chan</h1>
            <hr />
            <PostForm submit={handleSubmit} />
            <hr />
            {props.ready ? postTags() : 'Loading...'}
        </div>
    );
}
