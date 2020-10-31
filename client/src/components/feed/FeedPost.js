import React from 'react';
import like from '../../style/images/like.png';
import liked from '../../style/images/liked.png';
import PostComment from './PostComment';
import bubble from '../../style/images/bubble.png'
import CommentInput from './CommentInput';



const FeedPost = ({post}) => {
    const comments = post.comments

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
        <div key={post.image_url} className="feed-post-container">
            <div className="feed-post-poster-div">
                <p className="feed-post-poster">{post.date.split(" ").slice(0,3).join(" ")}</p>
            </div>
            <div className="feed-post-image-div">
                <img className="feed-post-image" src={post.image_url}/>
            </div>
            <div className="feed-post-likes-container">
                <img onClick={handledLike} id='heart' className="feed-post-likes-heart" src={like}/>
                <p className="feed-post-comment-count" >{comments ? comments.length : null}</p>
                <img id={post.id}className="feed-post-bubble" onClick={bubbleClick} src={bubble}/>
            </div>
            <div id={`desc-div-${post.id}`} className="feed-post-desc-div">
                <p className="feed-post-desc">
                    <a className="feed-post-profile-link" href={`/users/${post.username}`}>
                        <stong className="feed-post-desc-user">{post.username}</stong>
                    </a>
                    {post.desc}
                </p>
                {comments && comments.length > 0 ? (comments.slice(0,2).map(comment => (
                    <PostComment comment={comment}/>
                ))): null}
            </div>
            <CommentInput post={post} />
        </div>
    );
};

export default FeedPost