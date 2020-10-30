import React, {useEffect, useState, useContext} from 'react';
import Comments from '../components/Comments'

const ImageCard = (props) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
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
        // setLoading(false);
        fetchUsers()
        fetchData();
    }, [])

    return (
        <>
            {posts.map( post => (`/posts/${post.id}` === window.location.pathname &&
            <div id='card'>
                {console.log(post.id)}
                <div id='c-user'>user photo and username</div>
                <div id='c-media'><img alt='' id='c-img' src='https://i.pinimg.com/originals/58/44/28/5844285eddc375e333bc5e02227e893f.jpg'></img></div>
                <div id='c-actions'>like, post/comment page </div>
                <div id='c-comments'><Comments /></div>
            </div>))}
        </>
    )
}

export default ImageCard
