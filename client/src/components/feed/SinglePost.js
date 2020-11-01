import React, { useEffect, useState } from 'react';
import FeedPost from './FeedPost'
import '../../style/singlepost.css'

const SinglePost = (props) => {
    const id = props.match.params.id
    const [post, setPost] = useState(null)

    useEffect(() => {
        getPost()
    })

    const getPost = async () => {
        const data = await fetch(`/api/posts/get/${id}`)
        if (data.ok) {
            const singlePost = await data.json()
            setPost(...singlePost)
        }
    }


    return (
        <div className="single-post-page-container">
            {post && <FeedPost single={true} post={post} numberOfPosts={5}/> }
        </div>
    );
};

export default SinglePost