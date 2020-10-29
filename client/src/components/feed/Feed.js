import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/feed';
import AuthContext from '../../auth.js';
import '../../style/feed.css'
import like from '../../style/images/like.png'
import liked from '../../style/images/liked.png'

const Feed = () => {
    const dispatch = useDispatch()
    const { feed } = useSelector(store => store.Feed)
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext)
    const { posts } = useSelector(state => state);
    const [ comment, setComment ] = useState(null)
    const [ setCurrentPost, currentPost ] = useState(null)


    useEffect(() => {
        if (feed.length > 0) return
        dispatch(getFeed(currentUserId))
    }, [posts])

    const handledLike = (e) => {
        const isLiked = e.target.getAttribute('src')
        if (isLiked == like){
            e.target.setAttribute('src', liked)
        }else {
            e.target.setAttribute('src', like)
        }
    }

    const commentChange = (e) => {
        setComment(e.target.value)
    }
    const handleComment = async (e) => {
        const poost = e.target.id
        console.log(poost, currentUserId, comment);
            const data = await fetchWithCSRF('/api/comments/new', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    user_id: currentUserId,
                    post_id: parseInt(poost),
                })
            })
            if(data.ok) {
                console.log('WOOOOOOOOOOHOOOOOOOOOO');
            }
    }

    return (
        <div className="feed-page-container">
            <div className="feed-container">
            {feed.length > 0 && feed.map(post =>
                <div key={post.image_url} className="feed-post-container">
                    <div className="feed-post-poster-div">
                        <p className="feed-post-poster">{post.date.split(" ").slice(0,3).join(" ")}</p>
                    </div>
                    <div className="feed-post-image-div">
                        <img className="feed-post-image" src={post.image_url}/>
                    </div>
                    <div className="feed-post-likes-container">
                        <img onClick={handledLike} id='heart' className="feed-post-likes-heart" src={like}/>
                    </div>
                    <div className="feed-post-desc-div">
                        <p className="feed-post-desc">
                            <a className="feed-post-profile-link" href={`/users/${post.username}`}>
                                <stong className="feed-post-desc-user">{post.username}</stong>
                            </a>
                            {post.desc}
                        </p>
                    </div>
                    <div className="feed-post-comment-container">
                        <input type="text" placeholder="Add a comment..." onChange={commentChange}></input>
                        <a id={post.id} className="feed-post-comment-button" onClick={handleComment}>Post</a>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Feed
