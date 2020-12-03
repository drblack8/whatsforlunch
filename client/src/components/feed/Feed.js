import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/feed';
import AuthContext from '../../auth.js';
import '../../style/feed.css'
import FeedPost from './FeedPost';
import useInfiniteScroll from 'react-infinite-scroll-hook';


const Feed = () => {
    const dispatch = useDispatch()
    const { feed } = useSelector(store => store.Feed)
    const { currentUserId } = useContext(AuthContext)
    const [numberOfPosts, setNumberOfPosts] = useState(5)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        dispatch(getFeed(currentUserId, numberOfPosts))
        setLoading(false)
    }, [])

    const loadMore = () => {
        if (feed.length < 5 || numberOfPosts > feed.length + 20) {
            setHasNextPage(false)
        }
        setLoading(true)
        setNumberOfPosts(numberOfPosts + 5)
        dispatch(getFeed(currentUserId, numberOfPosts))
        setLoading(false)
    }

    const scrollContainer = window //document.querySelector('.feed-page-container')

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        scrollContainer
      });


    return (
        <div className="feed-page-container" ref={infiniteRef}>
            <div className="feed-container" >
                {
                feed.length > 0 && feed.map((post, i) =>
                    <FeedPost key={i} post={post} numberOfPosts={numberOfPosts}/>
                )}
            </div>
        </div>
    )
}

export default Feed
