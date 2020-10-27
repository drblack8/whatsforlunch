import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import '../style/profile.css'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

function Profile(){
    // Post fetch----------------------------------------------->
    const [posts, setPosts] = useState([]);
    const classes = useStyles();

    useEffect(() =>{
        async function fetchData(){
            const res = await fetch('/api/posts/feed')
            console.log(res)
            const resData = await res.json()
            setPosts(resData.posts)
            // return resData
        }
        fetchData()
    }, [])

    console.log(posts)
    //--------------------------------------------------------->
    return (
        <>
            <div id='profile-wrap'>
                <div id='user-card'>
                    <div id='user-photo'>
                        <img id='user-pic' src='https://i.pinimg.com/originals/13/76/10/137610fb11df66ba8aa2b496fc17d6d7.jpg' alt=''></img>
                    </div>
                    <div id='user-info'>
                        <div id='username'><h1>Hotdog Man</h1><Button id='add-follow'>Follow</Button></div>
                        <div id='follows-posts'>5 posts 1 followers 200 following</div>
                        <div id='bio'>Owner and CEO of Weenie Hut Jr</div>
                    </div>
                </div>
                <div id='user-content'>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {posts.map((post) => (
                            <GridListTile key={post.image_url} >
                                <img src={post.image_url} alt='' />
                            </GridListTile>
                        ))}
                    </GridList>                  
                    {/* <div id='user-post'>
                        <img id='demo-post' src='https://www.chicagotribune.com/resizer/rokWHg3OWbgljv40wHD3ocd21kI=/800x600/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/QJ3L4OIW6NEFXHPK2EENBEOLTE.jpg' alt='' ></img>
                    </div> */}
                    
                </div>
            </div>
        </>
    )
}

export default Profile;