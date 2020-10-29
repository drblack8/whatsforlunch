import React from 'react'
import Comments from './Comments'

const ImageCard = (props) => {


    return (
        <>
            <div id='card'>
                <div id='c-user'>user photo and username</div>
                <div id='c-media'><img alt='' id='c-img' src='https://i.pinimg.com/originals/58/44/28/5844285eddc375e333bc5e02227e893f.jpg'></img></div>
                <div id='c-actions'>like, post/comment page </div>
                <div id='c-comments'><Comments /></div>
            </div>
        </>
    )
}

export default ImageCard
