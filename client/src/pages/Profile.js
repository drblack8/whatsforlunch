import React, {useEffect, useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import '../style/profile.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AuthContext from '../auth.js'
// import { NavLink } from 'react-router-dom';
import wheel from '../style/images/wedge.gif'



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

function Profile(){
        // User/Post vars and state
        // const [user, setUser] = useState({});
        const [users, setUsers] = useState([]);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const classes = useStyles();
        // Post/User fetch----------------------------------------------->
        const { currentUserId, fetchWithCSRF } = useContext(AuthContext);

        useEffect(() =>{
            // async function fetchUser() {
            //     const response = await fetch(`/api/users/${currentUserId}`);
            //     const responseData = await response.json();
            //     setUser(responseData.user);
            // }
            async function fetchUsers() {
                const response = await fetch('/api/users/');
                const responseData = await response.json();
                setUsers(responseData.users);
            }
            async function fetchData(){
                const res = await fetch('/api/posts/feed')
                console.log(res)
                const resData = await res.json()
                setPosts(resData.posts)
            }
            setLoading(false);
            fetchUsers()
            // fetchUser();
            fetchData();
        }, [currentUserId])
        // console.log(user, 'user')
    //--------------------------------------------------------->
    // const handleFollow = () => {
    //     fetchWithCSRF(`/api/users/${currentUserId}`, {
    //         method: "POST",
    //         body: JSON.stringify(body),
    //         headers: {
    //           'Content-Type': 'application/json',
    //         }
    //       })
    //         .then((res) => res.json())
    //         .catch((err) => console.log("ERROR: ", err))
    // }

    return (
        <>

            {loading && <div id="wheel" className="loading-wheel-container hidden">
                  <img src={wheel}/>
                </div> }
            {!loading && ( users.map( user => ( `/users/${user.username}` === window.location.pathname &&
            <div id='profile-wrap'>
               
                <div id='user-card'>
                    <div id='user-photo'>
                        <img id='user-pic' src='https://i.pinimg.com/originals/13/76/10/137610fb11df66ba8aa2b496fc17d6d7.jpg' alt=''></img>
                    </div>
                    <div id='user-info'>
                        <div id='username'><h1>{user.username}</h1><Button  id='add-follow'>Follow</Button></div>
                        <div id='follows-posts'>5 posts 1 followers 200 following</div>
                        <div id='bio'>Owner and CEO of Weenie Hut Jr</div>
                    </div>
                </div>
                <div id='user-content'>
                    <GridList cellHeight={275} className={classes.gridList} cols={6}>
                        {posts.map((post) => ( user.id === post.user_id &&
                            <GridListTile id='user-post' key={post.image_url} >
                                <Button id='user-post' >
                                    <img id='demo-post' src={post.image_url} alt='' />
                                </Button>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                </div>)))}
        </>
    )
}

export default Profile;
