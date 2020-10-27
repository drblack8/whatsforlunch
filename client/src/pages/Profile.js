import React from 'react';
import '../style/profile.css'

function Profile(){
    return (
        <>
            <div id='profile-wrap'>
                <div id='user-card'>
                    <div id='user-photo'>
                        <img id='user-pic' src='https://i.pinimg.com/originals/13/76/10/137610fb11df66ba8aa2b496fc17d6d7.jpg' alt=''></img>
                    </div>
                    <div id='user-info'></div>
                </div>
                <div id='user-content'>
                    <div id='user-post'>
                        <img id='demo-post' src='https://www.chicagotribune.com/resizer/rokWHg3OWbgljv40wHD3ocd21kI=/800x600/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/QJ3L4OIW6NEFXHPK2EENBEOLTE.jpg' alt='' ></img>
                    </div>
                    <div id='user-post'>this a post</div>
                    <div id='user-post'>this a post</div>
                    <div id='user-post'>this a post</div>
                    <div id='user-post'>this a post</div>
                </div>
            </div>
        </>
    )
}

export default Profile;