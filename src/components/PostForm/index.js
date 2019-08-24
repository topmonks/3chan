import React from 'react';
import './PostForm.css';

export default function PostForm(props) {
    return (
        <form classNameName="PostForm">
            <table className="postForm hideMobile" id="postForm">
                <tbody>
                    <tr data-type="Name">
                        <td>Name</td>
                        <td>
                            <input
                                name="name"
                                type="text"
                                tabindex="1"
                                placeholder="Anonymous"
                            />
                            <input type="submit" value="Post" tabindex="6" />
                        </td>
                    </tr>

                    <tr data-type="Comment">
                        <td>Comment</td>
                        <td>
                            <textarea
                                name="com"
                                cols="48"
                                rows="4"
                                wrap="soft"
                                tabindex="4"
                            />
                        </td>
                    </tr>

                    <tr data-type="File">
                        <td>File</td>
                        <td>
                            <input
                                id="postFile"
                                name="upfile"
                                type="file"
                                tabindex="7"
                            />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">
                            <div id="postFormError" />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
    );
}
