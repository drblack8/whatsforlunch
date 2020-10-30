import React from 'react';

const PostComment = ({props}) => {
    const { comment } = props

    return (
        <div className="feed-post-comments">
            <p className="feed-post-desc">
                <a className="feed-post-profile-link" href={`/users/${comment.username}`}>
                    <stong className="feed-post-desc-user">{comment.username}</stong>
                </a>
                {comment.content}
            </p>
        </div>
    );
};

export default PostComment;