import React from 'react';
import './JustPost.css';
import { timestampToLocalDateTime } from '../../library/format';
import classNames from 'classnames';

export default function JustPost({
    isThread = false,
    comment,
    author,
    createdAt,
    file,
}) {
    return (
        <div
            className={classNames(
                'JustPost',
                isThread ? 'JustPost--thread' : 'JustPost--reply',
            )}
        >
            <div className="JustPost__Meta PostMeta">
                <input type="checkbox" />
                <span className="PostMeta__Author">{author}</span>
                <span className="PostMeta_DateTime">
                    {timestampToLocalDateTime(createdAt)}
                </span>
            </div>
            {file && (
                <div className="JustPost__File PostFile">
                    File:{' '}
                    <span className="PostFile__Name">
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {file.name}
                        </a>
                    </span>
                    <div className="PostFile__Poster">
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={file.poster || file.url}
                                alt={file.name}
                            />
                        </a>
                    </div>
                </div>
            )}
            <blockquote className="JustPost__Comment">{comment}</blockquote>
        </div>
    );
}
