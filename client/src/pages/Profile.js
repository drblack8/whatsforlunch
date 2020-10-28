import React, {useEffect, useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import '../style/profile.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AuthContext from '../auth.js'
import { NavLink } from 'react-router-dom';


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
        const [user, setUser] = useState({});
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const classes = useStyles();
        // Post/User fetch----------------------------------------------->
        const { currentUserId } = useContext(AuthContext);
        useEffect(() =>{
            async function fetchUser() {
                const response = await fetch(`/api/users/${currentUserId}`);
                const responseData = await response.json();
                setUser(responseData.user);
            }
            async function fetchData(){
                const res = await fetch('/api/posts/feed')
                console.log(res)
                const resData = await res.json()
                setPosts(resData.posts)
            }
            setLoading(false);
            fetchUser();
            fetchData();
        }, [])
        // console.log(user, 'user')
    //--------------------------------------------------------->

    return (
        <>
            {loading && <h1>Loading...</h1> }
            {!loading && (
            <div id='profile-wrap'>
                <div id='user-card'>
                    <div id='user-photo'>
                        <img id='user-pic' src='https://i.pinimg.com/originals/13/76/10/137610fb11df66ba8aa2b496fc17d6d7.jpg' alt=''></img>
                    </div>
                    <div id='user-info'>
                        <div id='username'><h1>{user.username}</h1><Button id='add-follow'>Follow</Button></div>
                        <div id='follows-posts'>5 posts 1 followers 200 following</div>
                        <div id='bio'>Owner and CEO of Weenie Hut Jr</div>
                    </div>
                </div>
                <div id='user-content'>
                    <GridList cellHeight={275} className={classes.gridList} cols={6}>
                        {posts.map((post) => ( currentUserId === post.user_id &&
                            <GridListTile id='user-post' key={post.image_url} >
                                <Button id='user-post' >
                                    <img id='demo-post' src={post.image_url} alt='' />
                                </Button>
                            </GridListTile>
                        ))}
                    </GridList>                  
                </div>
            </div>)}
        </>
    )
}

export default Profile;