import React from 'react';
import { uploadFile } from 'react-s3';
import  { configuration } from './../config/index.js'

const config = {
    bucketName: 'whats4lunch-images',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: configuration.aws.accessKey,
    secretAccessKey: configuration.aws.secretKey,
}

const PhotoUpload = () => {
    const upload = async(e) => {
        console.log(e.target.files[0])
        const data = await uploadFile(e.target.files[0], config)
        console.log(data)
    }

    return (
        <>
            <h3>AWS Upload</h3>
            <input type="file" onChange={upload} />
        </>
    );
};

export default PhotoUpload;