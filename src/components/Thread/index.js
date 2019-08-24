import React, { Fragment, useState, useEffect } from 'react';
import JustPost from '../JustPost';

export default function Thread({ box, thread }) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log(`loading additional posts for ${thread.id}`);
        box.getPosts(thread.address, 3).then(posts => {
            setPosts(posts.map(p => p.message));
            console.log(`thread ${thread.id} posts: `, posts);
        });
    }, []);

    return (
        <Fragment>
            <JustPost isThread {...thread} />
            {posts.map((post, i) => (<JustPost key={`post-${thread.id}-${i}`} post={post}/>))}
        </Fragment>
    )
}

