import React, { useState } from 'react';
import './PostForm.css';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result)
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
}

async function getFileData(file) {
    if (!file) return null;
    const data = await getBase64(file);
    return {
        name: file.name,
        size: file.size,
        data,
    }
}

export default function PostForm(props) {
    const [name, setName] = useState("Anonymous");
    const [comment, setComment] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async event => {
        if (event) event.preventDefault();
        const fileData = await getFileData(file);
        props.submit({
            author: name,
            comment,
            createdAt: new Date().toUTCString(),
            file: fileData,
        });
    };

    return (
        <form className="PostForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr data-type="Name">
                        <td>Name</td>
                        <td>
                            <input
                                name="name"
                                type="text"
                                tabIndex="1"
                                placeholder="Anonymous"
                                value={name}
                                onChange={v => setName(v.target.value)}
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
                                value={comment}
                                onChange={v => setComment(v.target.value)}
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
                                onChange={v => setFile(v.target.files[0])}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
