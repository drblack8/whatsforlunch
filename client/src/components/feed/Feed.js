import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/feed';
import AuthContext from '../../auth.js';
import '../../style/feed.css'

const Feed = () => {
    const dispatch = useDispatch()
    const { feed } = useSelector(store => store.Feed)
    const { currentUserId } = useContext(AuthContext)


    useEffect(() => {
        if (feed.length > 0) return
        dispatch(getFeed(currentUserId))
    }, [])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
            {feed.length > 0 && feed.map(post => 
                <div key={post.image_url} className="feed-post-container">
                    <div className="feed-post-poster-div">
                        <p className="feed-post-poster">{post.user_id}</p>
                    </div>
                    <div className="feed-post-image-div">
                        <img className="feed-post-image" src={post.image_url}/>
                    </div>
                    <div className="feed-post-desc-div">
                        <p className="feed-post-desc"><stong className="feed-post-desc-user">{post.user_id}</stong>{post.desc}</p>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Feed