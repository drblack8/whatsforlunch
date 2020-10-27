import React from 'react';
import PhotoUpload from './PhotoUpload';
import '../../css/post-page.css'


const UploadPage = () => {
    return (
        <>
            <div className="upload-page-container">
                <div className="upload-form-container">
                    <div>
                        <PhotoUpload />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadPage