import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/feed';
import AuthContext from '../../auth.js';
import '../../style/feed.css'
import FeedPost from './FeedPost';

const Feed = () => {
    const dispatch = useDispatch()
    const { feed } = useSelector(store => store.Feed)
    const { currentUserId } = useContext(AuthContext)


    useEffect(() => {
        dispatch(getFeed(currentUserId))
    }, [])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
            {feed.length > 0 && feed.map((post, i) =>
                <FeedPost key={i} post={post}/>
            )}
            </div>
        </div>
    )
}

export default Feed
