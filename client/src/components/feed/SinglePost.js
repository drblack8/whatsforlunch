import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FeedPost from './FeedPost'
import '../../style/singlepost.css'
import AuthContext from '../../auth.js';

const SinglePost = (props) => {
    const history = useHistory()
    const postId = props.match.params.id
    const [post, setPost] = useState(null)
    const { currentUserId } = useContext(AuthContext)

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        const data = await fetch(`/api/posts/get/${postId}`)
        if (data.ok) {
            const singlePost = await data.json()
            setPost(...singlePost)
        }
    }
    
    const handleRemovePost = async () => {
        const data = await fetch(`/api/posts/delete/${postId}`)
        if (data.ok) {
            history.push('/feed')
        }
    }


    return (
        <>
            <div className="single-post-page-container">
                {post && <FeedPost single={true} post={post} numberOfPosts={5}/> }
            </div>
            {post && currentUserId === post.user_id && (
                <div className="post-page-delete-button" onClick={handleRemovePost}>
                    <span>Remove Post</span>
                </div>)}
        </>
    );
};

export default SinglePost