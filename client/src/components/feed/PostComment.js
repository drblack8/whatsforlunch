import React from 'react';
import like from '../../style/images/like.png';
import liked from '../../style/images/liked.png';

const PostComment = ({props}) => {
    const { comment } = props

    const handledLike = (e) => {
        const isLiked = e.target.getAttribute('src')
        if (isLiked == like){
            e.target.setAttribute('src', liked)
        }else {
            e.target.setAttribute('src', like)
        }
    }

    return (
        <div className="feed-post-comments">
            <div className="feed-post-comments">
                <a className="feed-post-profile-link" href={`/users/${comment.username}`}>
                    <p className="feed-post-desc-user">{comment.username}</p>
                </a>
                <p>{comment.content}</p>
            </div>
                <img className="feed-comment-image" src={like} onClick={handledLike} id='heart'/>
        </div>
    );
};

export default PostComment;