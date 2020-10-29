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
    const { currentUserId } = useContext(AuthContext)
    const { posts } = useSelector(state => state);

    useEffect(() => {
        if (feed.length > 0) return
        dispatch(getFeed(currentUserId))
    }, [posts])

    const handledLike = (e) => {
        e.target.setAttribute('src', liked)
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
                        <input type="text" placeholder="Add a comment..."></input>
                        <a className="feed-post-comment-button">Post</a>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Feed