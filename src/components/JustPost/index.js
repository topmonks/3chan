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
    noreply = false,
    you = false,
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
                {!noreply
                    ? [
                          <Link key={`l-${id}`} to={`/thread/${id}`}>
                              Reply
                          </Link>,
                      ]
                    : ''}
                {you ? ' (you)' : ''}
            </div>
            {file && (
                <div className="JustPost__File PostFile">
                    File:{' '}
                    <span className="PostFile__Name">
                        <Link to={`/thread/${id}/file`}>{file.name}</Link>
                        &nbsp;({bytesToSize(file.size)})
                    </span>
                    <div className="PostFile__Poster">
                        <Link to={`/thread/${id}/file`}>
                            <img
                                src={file.data}
                                alt={file.name}
                                width="100"
                                height="100"
                            />
                        </Link>
                    </div>
                </div>
            )}
            <blockquote className="JustPost__Comment">{comment}</blockquote>
        </div>
    );
}
