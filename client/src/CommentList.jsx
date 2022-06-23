import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ comments }) => {

    // const getComments = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }

    // useEffect(() => {
    //     getComments()
    // }, []);

    const renderedComments = comments.map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        )
    })

    return (
        <div className="">
            {renderedComments}
        </div>
    )
}