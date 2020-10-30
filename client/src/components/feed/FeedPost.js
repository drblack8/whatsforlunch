import React, { useState, useContext } from 'react';
import like from '../../style/images/like.png';
import liked from '../../style/images/liked.png';
import AuthContext from '../../auth.js';
import PostComment from './PostComment';
import bubble from '../../style/images/bubble.png'


const FeedPost = ({props}) => {
    const [ comment, setComment ] = useState(null)
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext)
    const {post, comments, i} = props

    const commentChange = (e) => {
        setComment(e.target.value)
    }
    
    const handledLike = (e) => {
        const isLiked = e.target.getAttribute('src')
        if (isLiked == like){
            e.target.setAttribute('src', liked)
        }else {
            e.target.setAttribute('src', like)
        }
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

            }
    }

    const bubbleClick = (e) => {
        document.getElementById('comment-input' + e.target.id).focus()
    }

    return (
        <div key={post.image_url} className="feed-post-container">
            <div className="feed-post-poster-div">
                <p className="feed-post-poster">{post.date.split(" ").slice(0,3).join(" ")}</p>
            </div>
            <div className="feed-post-image-div">
                <img className="feed-post-image" src={post.image_url}/>
            </div>
            <div className="feed-post-likes-container">
                <img onClick={handledLike} id='heart' className="feed-post-likes-heart" src={like}/>
                <p className="feed-post-comment-count" >{comments && comments[i] ? comments[i].length : null}</p>
                <img id={post.id}className="feed-post-bubble" onClick={bubbleClick} src={bubble}/>
            </div>
            <div className="feed-post-desc-div">
                <p className="feed-post-desc">
                    <a className="feed-post-profile-link" href={`/users/${post.username}`}>
                        <stong className="feed-post-desc-user">{post.username}</stong>
                    </a>
                    {post.desc}
                </p>
                {comments && comments.length > 0 ? (comments[i].map(comment => (
                    <PostComment props={{comment}}/>
                ))): null}
            </div>
            <div className="feed-post-comment-container">
                <input id={`comment-input${post.id}`} type="text" placeholder="Add a comment..." onChange={commentChange}></input>
                <a id={post.id} className="feed-post-comment-button" onClick={handleComment}>Post</a>
            </div>
        </div>
    );
};

export default FeedPost