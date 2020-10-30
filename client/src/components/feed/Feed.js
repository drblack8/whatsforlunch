import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/feed';
import AuthContext from '../../auth.js';
import '../../style/feed.css'
import FeedPost from './FeedPost';

const Feed = () => {
    const dispatch = useDispatch()
    const { feed, comments } = useSelector(store => store.Feed)
    const { currentUserId } = useContext(AuthContext)
    const { posts } = useSelector(state => state);

    useEffect(() => {
        if (feed.length > 0) return
        dispatch(getFeed(currentUserId))
    }, [posts])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
            {feed.length > 0 && feed.map((post, i) =>
                <FeedPost key={i} props={{post, comments, i}}/>
            )}
            </div>
        </div>
    )
}

export default Feed
