import React from 'react';
import './Board.css';
import PostForm from '../../components/PostForm';

export default function Board(props) {
    return (
        <div>
            <h1 className="Board-name">Board Name</h1>
            <hr />
            <PostForm />
            <hr />
        </div>
    );
}
