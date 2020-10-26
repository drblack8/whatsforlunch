import React from 'react';
import '../style/home.css'

function Feed(){
    return (
        <>
            <div id='feed-wrap'>
                <div id='photo-feed'>
                    {/* will make a loop to generate photo cards */}
                    <div id='card'>
                        <div id='c-user'>user photo and username</div>
                        <div id='c-media'><img alt='' id='c-img' src='https://i.pinimg.com/originals/58/44/28/5844285eddc375e333bc5e02227e893f.jpg'></img></div>
                        <div id='c-actions'>like, post/comment page </div>
                        <div id='c-comments'>show comments, add comments</div>
                    </div>
                    <div id='card'>
                        <div id='c-user'>user photo and username</div>
                        <div id='c-media'><img alt='' id='c-img' src='https://i.imgflip.com/2zlo8m.png'></img></div>
                        <div id='c-actions'>like, post/comment page </div>
                        <div id='c-comments'>show comments, add comments</div>
                    </div>
                    <div id='card'>
                        <div id='c-user'>user photo and username</div>
                        <div id='c-media'><img alt='' id='c-img' src='https://cdn.foodbeast.com/wp-content/uploads/2017/09/hot-dog-stk.jpg'></img></div>
                        <div id='c-actions'>like, post/comment page </div>
                        <div id='c-comments'>show comments, add comments</div>
                    </div>
                </div>
                <div id='user-actions'></div>
                {/* <h1>Profile Page</h1> */}
            </div>
        </>
    )
}

export default Feed;