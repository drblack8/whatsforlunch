import React, { useEffect, useState, useContext } from 'react';
import { uploadFile } from 'react-s3';
import  { configuration } from '../../config/index.js'
import '../../style/post-page.css'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import AuthContext from '../../auth'
import wheel from '../../style/images/wedge.gif'
import hotdog from '../../style/images/hotdogupload.png'

const config = {
    bucketName: 'whats4lunch-images',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: configuration.aws.accessKey,
    secretAccessKey: configuration.aws.secretKey,
}

const PhotoUpload = () => {
    const [caption, setCaption] = useState('')
    const [ready, setReady] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [crop, setCrop] = useState({unit: "%", width: 50, height: 50, x: 25, y: 25, aspect: 1 / 1})
    const [imageRef, setImageRef] = useState()
    const [croppedImage, setCroppedImage] = useState()
    const [src, setSrc] = useState()
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);


    //crop magic
    // https://levelup.gitconnected.com/crop-images-on-upload-in-your-react-app-with-react-image-crop-5f3cd0ad2b35
    const onImageLoaded = image => {
        setCrop(crop);
        setImageRef(image)
        getCroppedImg(image, crop)
    }

    const onCropChange = (crop) => {
        setCrop(crop);
    }

    const onCropComplete = crop => {
        if (imageRef && crop.width && crop.height) {
            getCroppedImg(imageRef, crop)
        }
    }

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        var originWidth = crop.width * scaleX;
        var originHeight = crop.height * scaleY;
        // maximum width/height
        var maxWidth = 1200, maxHeight = 1200 / (16 / 9);
        var targetWidth = originWidth,
          targetHeight = originHeight;
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // set canvas size
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
          image, 
          crop.x * scaleX, 
          crop.y * scaleY, 
          crop.width * scaleX, 
          crop.height * scaleY, 
          0, 
          0, 
          targetWidth, 
          targetHeight 
        );
            
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
            dataURLtoFile(reader.result, getRandomString(20))
            }
        })
    }

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        setCroppedImage(new File([u8arr], filename, {type:mime}))
    }
    //end magic

    useEffect(() => {
        if (!selectedFile) {
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const upload = async() => {
        const wheelDiv = document.getElementById('wheel')
        wheelDiv.setAttribute("class", "loading-wheel-container")
        const data = await uploadFile(croppedImage, config)
        if (data.location) {
            const post = await fetchWithCSRF('/api/posts/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_url:data.location, user_id:currentUserId, desc:caption }),
            })
            if (post.ok){
                setReady(false)
                setCaption('')
                wheelDiv.setAttribute("class", "loading-wheel-container hidden")
            }
        }
    }

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setReady(true)
        setSelectedFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setSrc(fileReader.result)
        }   
        fileReader.readAsDataURL(e.target.files[0])
        return
    }

    return (
        <>
            <div id="wheel" className="loading-wheel-container hidden">
                <img src={wheel}/>
            </div>
            <div className="upload-form">
                {!ready ? (
                <div className="upload-button">
                <input
                    accept="image/*"
                    className="upload-file-input"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={onSelectFile}
                />
                <label className="upload-button-label" htmlFor="raised-button-file">
                    <img className="upload-photo" src={hotdog}/>
                    <Button variant="raised" component="span" className="upload-button">
                    </Button>
                </label> 
                </div>
                ): src && (
                    <ReactCrop
                      src={src}
                      crop={crop}
                      onImageLoaded={onImageLoaded}
                      onComplete={onCropComplete}
                      onChange={onCropChange}
                      className="react-crop"
                     /> 
                )}
                <div className="upload-text-area-div">
                    <TextField multiline={true} onChange={handleCaption} value={caption} placeholder="Write a caption"></TextField>
                </div>
                <div>
                    <Button variant="contained" color="primary" id="upload-button" onClick={upload} disabled={!ready}>
                        Post
                    </Button>
                </div>
            </div>
        </>
    );
};

export default PhotoUpload;