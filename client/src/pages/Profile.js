import React, {useEffect, useState, useContext} from 'react';
import '../style/profile.css'
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../auth.js'
import wheel from '../style/images/wedge.gif'
import { useLocation } from 'react-router-dom';
import userPic from '../style/images/empty-user.png';
import editProfilePic from '../style/images/edit-user.png';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
}));

const Profile = () => {
    const [users, setUsers] = useState([]);
    const [follows, setFollows] = useState([]);
    const [posts, setPosts] = useState([]);
    const [followed, setFollowed] = useState('cats')
    const [myProfile, setMyProfile] = useState(false)
    const [profileId, setProfileId] = useState(null)
    const [loading, setLoading] = useState(true);
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const [path, setPath] = useState('')
    const url = useLocation().pathname.split('/')[2]

    useEffect(() => {
        setPath(url)
    }, [url])
    
    const fetchFollow = async() => {
        const friend = `${url}-@${currentUserId}`
        const res = await fetch(`/api/social/${friend}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        const resData = await res.json();
        resData.followed ? setFollowed(true) : setFollowed(false);
        resData.id === currentUserId ? setMyProfile(true) : setMyProfile(false);
    }

    async function fetchUsers() {
        const response = await fetch(`/api/users/${url}`);
        const responseData = await response.json();
        setUsers(responseData);
    }
    async function fetchFollows() {
        const response = await fetch('/api/social/');
        const responseData = await response.json();
        setFollows(responseData.social);
    }
    async function fetchData(){
        const res = await fetch(`/api/posts/feed/${currentUserId}`)
        const resData = await res.json()
        setPosts(resData.posts)
    }
    useEffect(() => {
        fetchFollow()
        fetchFollows();
        fetchUsers()
        fetchData();
        setLoading(false);
    }, [followed])

    useEffect(() => {
        fetchFollow()
    }, [path])

    let howManyPosts = (arr, userId) => {
        let newArr = []
        arr.filter(el => {
            if(el.user_id === userId){
                newArr.push(el)
            }
        })
        return newArr.length
    }
    let howManyFollows = (arr, userId) => {
        let newArr = []
        arr.filter(el => {
            if(el.user === userId){
                newArr.push(el)
            }
        })
        return newArr.length
    }
    let howManyFollowers = (arr, userId) => {
        let newArr = []
        arr.filter(el => {
            if(el.following === userId){
                newArr.push(el)
            }
        })
        return newArr.length
    }

    const handleFollow = async (e) => {
        const profId = e.target.id
        setProfileId(profId)
        const data = await fetchWithCSRF(`/api/social/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUserId,
                follow_id: parseInt(profId)
            })
        })
        fetchFollow()
    }

    const handleUnfollow = async (e) => {
        const profId = e.target.id
        setProfileId(profId)
        const data = await fetchWithCSRF(`/api/social/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUserId,
                follow_id: parseInt(profId)
            })
        })
        fetchFollow()
    }

    const handleModal = () => {
        const modal = document.getElementById('profile-modal-container');
        modal.classList.toggle('hide')
    }

    return (
        <div className="user-profile-page-container">
            <div id="profile-modal-container" className="hide">
                <div className="porfile-modal">
                    <PhotoUpload fetchUsers={fetchUsers} handleModal={handleModal} type={"profile"}/>
                    <button onClick={handleModal} className="profile-modal-button">Cancel</button>
                </div>
            </div>
            {loading && <div id="wheel" className="loading-wheel-container hidden">
                  <img src={wheel}/>
                </div> }
            {!loading && (
                <div id='profile-wrap' key={users.id}>
                    <div id='user-card'>
                        <div id='user-photo'>
                            <img id='user-pic' src={users.pic_url ? users.pic_url : userPic} alt=''></img>
                        </div>
                        <div id='user-info'>
                            <div id={users.id} className='username'>
                                {myProfile && (
                                    <div onClick={handleModal} className="upload-profile-pic-div">
                                        <img className="upload-profile-pic-icon" src={editProfilePic} />
                                    </div>
                                )}
                                <h1>{users.username}</h1>
                                {!myProfile && <button onClick={!followed ? handleFollow : handleUnfollow} className={`add-follow`} id={users.id}>{followed ? 'Unfollow' : 'Follow'}</button>}
                            </div>
                            <div id='follows-posts'>
                                <span>
                                    <span>{howManyPosts(posts, users.id)}</span> posts
                                </span>
                                <span>
                                    <span>{howManyFollowers(follows, users.id)}</span>followers
                                </span>
                                <span>
                                    <span>{howManyFollows(follows, users.id)}</span>following
                                </span>
                            </div>
                        </div>
                    </div>
                        <div id='user-content'>
                                {posts.map((post, i) => (
                                    <div key={i} id='user-post' key={post.image_url} >
                                            <a id='user-post' href={`/posts/${post.id}`} >
                                                <img id='demo-post' src={post.image_url} alt='' />
                                            </a>
                                    </div>
                                ))}
                        </div>
                    </div>)}
        </div>
    )
}

export default Profile;
