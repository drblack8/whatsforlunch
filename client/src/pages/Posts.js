import React, {useEffect, useState, useContext} from 'react';
import FeedPost from '../components/feed/FeedPost'
import Comments from '../components/Comments'
// import PostComment from '../components/PostComment'
import '../style/card.css'


import like from '../style/images/like.png';
import liked from '../style/images/liked.png';
// import AuthContext from '../../auth.js';
// import PostComment from './PostComment';
import bubble from '../style/images/bubble.png'
import CommentInput from '../components/feed/CommentInput';

const ImageCard = (props) => {
    const [users, setUsers] = useState([]);
    // const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);



    useEffect(() =>{
        async function fetchUsers() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        // async function fetchComments() {
        //     const response = await fetch(`/api/comments/${currentUserId}`);
        //     const responseData = await response.json();
        //     setComments(responseData.comment);
        // }
        async function fetchData(){
            const res = await fetch('/api/posts/feed')
            console.log(res)
            const resData = await res.json()
            setPosts(resData.posts)
        }
        // setLoading(false);
        fetchUsers()
        // fetchComments()
        fetchData();
    }, [])

    const handledLike = (e) => {
        const isLiked = e.target.getAttribute('src')
        if (isLiked == like){
            e.target.setAttribute('src', liked)
        }else {
            e.target.setAttribute('src', like)
        }
    }

    const bubbleClick = (e) => {
        document.getElementById('comment-input' + e.target.id).focus()
    }

    return (
        <>
            <div>this is a post</div>
            {posts.map( post => (`/posts/${post.id}` === window.location.pathname &&
            <div id='card'>
            <div key={post.image_url} className="feed-post-container">
            <div className="feed-post-poster-div">
                <p className="feed-post-poster">{post.date.split(" ").slice(0,3).join(" ")}</p>
            </div>
            <div className="feed-post-image-div">
                <img className="feed-post-image" src={post.image_url}/>
            </div>
            <div className="feed-post-likes-container">
                <img onClick={handledLike} id='heart' className="feed-post-likes-heart" src={like}/>
                {/* <p className="feed-post-comment-count" >{comments && comments[i] ? comments[i].length : null}</p> */}
                <img id={post.id}className="feed-post-bubble" onClick={bubbleClick} src={bubble}/>
            </div>
            {/* <div className="feed-post-desc-div">
                <p className="feed-post-desc">
                    <a className="feed-post-profile-link" href={`/users/${post.username}`}>
                        <stong className="feed-post-desc-user">{post.username}</stong>
                    </a>
                    {post.desc}
                </p>
                {comments && comments.length > 0 ? (comments[i].map(comment => (
                    <PostComment props={{comment}}/>
                ))): null}
            </div> */}
            <CommentInput props={{post}} />
        </div>
            </div>))}
        </>
    )
}

export default ImageCard
