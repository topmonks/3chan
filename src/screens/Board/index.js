import React, { useEffect, useState } from 'react';
import './Board.css';
import PostForm from '../../components/PostForm';
import JustPost from '../../components/JustPost';

// Mocked example, chould be async fn
const loadThreads = () => {
    const mockedThreads = [
        {
            id: 'abc',
            author: 'Anonymous',
            comment: 'Some thread comment',
            file: {
                name: 'YoMom.jpg',
                url: 'https://i.4cdn.org/wsg/1565253243630s.jpg',
                // poster: '' // non image files need to have poster image
            },
            createdAt: Date.UTC(2019, 5, 13, 7, 33),
            replies: [
                {
                    id: 'gdd',
                    author: 'Anonymous',
                    comment: 'cool',
                    createdAt: Date.UTC(2019, 5, 13, 9, 58),
                },
                {
                    id: '342',
                    author: 'junkycoder',
                    comment: 'Yah it realy is',
                    createdAt: Date.UTC(2019, 5, 13, 10, 0),
                },
            ],
        },
        {
            id: 'eha',
            author: 'Anonymous',
            comment: 'Without attached file',
            file: null,
            createdAt: Date.UTC(2019, 4, 1, 23, 21),
            replies: [],
        },
    ];

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockedThreads);
        }, 600);
    });
};

export default function Board(props) {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        loadThreads().then(threads => setThreads(threads));
    }, []);

    return (
        <div>
            <h1 className="Board-name">Board Name</h1>
            <hr />
            <PostForm />
            <hr />
            {threads.map(thread => (
                <div key={thread.id}>
                    <JustPost isThread {...thread} />
                    {thread.replies.length > 0 &&
                        thread.replies.map(reply => (
                            <JustPost key={reply.id} {...reply} />
                        ))}
                    <hr />
                </div>
            ))}
        </div>
    );
}
