import React, {useEffect, useState, useContext} from 'react';
import '../style/profile.css'
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../auth.js'
import wheel from '../style/images/wedge.gif'
import { useLocation } from 'react-router-dom';
import userPic from '../style/images/empty-user.png';


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
    const url = useLocation().pathname.split('/')[2]
    
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
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
    }
    async function fetchFollows() {
        const response = await fetch('/api/social/');
        const responseData = await response.json();
        setFollows(responseData.social);
    }
    async function fetchData(){
        const res = await fetch('/api/posts/feed')
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

    return (
        <div className="user-profile-page-container">
            {loading && <div id="wheel" className="loading-wheel-container hidden">
                  <img src={wheel}/>
                </div> }
            {!loading && ( users.map( user => ( `/users/${user.username}` === window.location.pathname &&
                <div id='profile-wrap' key={user.id}>
                    <div id='user-card'>
                        <div id='user-photo'>
                            <img id='user-pic' src={userPic} alt=''></img>
                        </div>
                        <div id='user-info'>
                            <div id={user.id} className='username'>
                                <h1>{user.username}</h1>
                                {!myProfile && <button disabled={followed} onClick={handleFollow} className={`add-follow ${followed ? 'disabled-button' : null}`} id={user.id}>{followed ? 'Followed' : 'Follow'}</button>}
                            </div>
                            <div id='follows-posts'>
                                <span>
                                    <span>{howManyPosts(posts, user.id)}</span> posts
                                </span>
                                <span>
                                    <span>{howManyFollowers(follows, user.id)}</span>followers
                                </span>
                                <span>
                                    <span>{howManyFollows(follows, user.id)}</span>following
                                </span>
                            </div>
                        </div>
                    </div>
                        <div id='user-content'>
                                {posts.map((post) => ( user.id === post.user_id &&
                                    <div id='user-post' key={post.image_url} >
                                            <a id='user-post' href={`/posts/${post.id}`} >
                                                <img id='demo-post' src={post.image_url} alt='' />
                                            </a>
                                    </div>
                                ))}
                        </div>
                    </div>)))}
        </div>
    )
}

export default Profile;
