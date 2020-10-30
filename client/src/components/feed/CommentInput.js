import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../auth.js';

const CommentInput = ({props}) => {
    const [ comment, setComment ] = useState('')
    const { post } = props
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext)

    const commentChange = (e) => {
        setComment(e.target.value)
    }

    const handleComment = async (e) => {
        const postId = e.target.id
        const data = await fetchWithCSRF('/api/comments/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: comment,
                user_id: currentUserId,
                post_id: parseInt(postId),
            })
        })
        if(data.ok) {
            setComment('')
        }
    }

    return (
        <div className="feed-post-comment-container">
                <input value={comment} id={`comment-input${post.id}`} type="text" placeholder="Add a comment..." onChange={commentChange}></input>
                <a id={post.id} className="feed-post-comment-button" onClick={handleComment}>Post</a>
            </div>
    );
};

export default CommentInput