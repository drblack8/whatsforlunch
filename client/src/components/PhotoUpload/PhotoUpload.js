import React, { useEffect } from 'react';
import { uploadFile } from 'react-s3';
import  { configuration } from '../../config/index.js'
import { changePosted } from '../../store/posts'
import { useSelector, useDispatch } from 'react-redux';

const config = {
    bucketName: 'whats4lunch-images',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: configuration.aws.accessKey,
    secretAccessKey: configuration.aws.secretKey,
}

const PhotoUpload = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state);
    
    useEffect(() => {
        dispatch(changePosted(false))
    }, [])

    const upload = async() => {
        console.log('hey')
        const file = document.getElementById('upload-input').files[0]
        const data = await uploadFile(file, config)
        console.log(data.location)
        // const post = await fetch('api/posts/new', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ imageUrl:data.location, userId, caption }),
        // })
        // if (post.ok){
            //dispatch(changePosted(true))
        // }
    }

    return (
        <>
            <h3>AWS Upload</h3>
            <input id="upload-input" type="file" />
            <div>
                <button id="upload-button" onClick={upload}>
                    Post
                </button>
            </div>
        </>
    );
};

export default PhotoUpload;