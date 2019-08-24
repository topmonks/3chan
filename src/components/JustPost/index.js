import React from 'react';
import './JustPost.css';
import { Link } from '@reach/router';
import { timestampToLocalDateTime } from '../../library/format';
import classNames from 'classnames';

function bytesToSize(bytes) {
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return '0 Byte';
   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export default function JustPost({
    isThread = false,
    id,
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
                [<Link to={`/thread/${id}`}>Reply</Link>]
            </div>
            {file && (
                <div className="JustPost__File PostFile">
                    File:{' '}
                    <span className="PostFile__Name">
                        <a
                            href='#a'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {file.name}
                        </a>
                        &nbsp;({bytesToSize(file.size)})
                    </span>
                    <div className="PostFile__Poster">
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={file.data}
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
