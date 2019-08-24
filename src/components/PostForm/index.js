import React, { useState } from 'react';
import './PostForm.css';

export default function PostForm(props) {
    const [values, setValues] = useState({ name: '', com: '', file: '' });
    const handleChangeValue = name => ({ target: { value } }) => {
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSubmit = event => {
        if (event) event.preventDefault();
        console.log('Use values', values);
    };

    return (
        <form className="PostForm" onSubmit={handleSubmit}>
            <table className="postForm hideMobile" id="postForm">
                <tbody>
                    <tr data-type="Name">
                        <td>Name</td>
                        <td>
                            <input
                                name="name"
                                type="text"
                                tabIndex="1"
                                placeholder="Anonymous"
                                value={values.name}
                                onChange={handleChangeValue('name')}
                            />
                            <input type="submit" value="Post" tabIndex="6" />
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
                                tabIndex="4"
                                value={values.com}
                                onChange={handleChangeValue('com')}
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
                                tabIndex="7"
                                value={values.file}
                                onChange={handleChangeValue('file')}
                            />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            <div id="postFormError" />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
    );
}
