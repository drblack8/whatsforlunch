import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Profile from './pages/Profile'
import Post from './pages/Posts'
import LoginForm from './components/LoginForm';
import UserList from './components/UsersList';
import NavBar from './components/nav/NavBar'
import UploadPage from './components/PhotoUpload/UploadPage';
import AuthContext from './auth'
import Feed from './components/feed/Feed'
import { ProtectedRoute, AuthRoute } from './Routes';
import './style/app.css'
import wheel from './style/images/wedge.gif'
import Start from './pages/Start'

function App() {
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId,
  };

    const logoutUser = async ()=> {
        const response = await fetchWithCSRF('/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if(response.ok){
            setCurrentUserId(null)
        }
    }
  
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    async function fetchPosts(){
      const res = await fetch('/api/posts/feed')
      console.log(res)
      const resData = await res.json()
      setPosts(resData.posts)
    }
    fetchUsers()
    fetchPosts()
  }, [])

  useEffect(() => {
    
    const wheelDiv = document.getElementById('wheel')
    wheelDiv.setAttribute("class", "loading-wheel-container")
    async function restoreCSRF() {
      const response = await fetch('/api/csrf/restore', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const authData = await response.json();
        setFetchWithCSRF(() => {
          return (resource, init) => {
            if (init.headers) {
              init.headers['X-CSRFToken'] = authData.csrf_token;
            } else {
              init.headers = {
                'X-CSRFToken': authData.csrf_token
              }
            }
            return fetch(resource, init);
          }
        });
        if(authData.current_user_id){
          setCurrentUserId(authData.current_user_id)
        }
      }
      setLoading(false)
    }
    
    restoreCSRF();
    wheelDiv.setAttribute("class", "loading-wheel-container hidden")
  }, []);
  
  return (
    <>
    {loading && <div id="wheel" className="loading-wheel-container hidden">
                  <img src={wheel}/>
                </div> }
    {!loading && (
      <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
          {currentUserId && <NavBar />}
          <Switch>
              <Route path="/login" component={Start} />
              <ProtectedRoute path="/feed" exact={true} component={Feed} currentUserId={currentUserId}/>
              {users.map((user) => {
                return <Route key={user.id} path={`/users/${user.username}`} component={Profile}/>
              })}
              {posts.map((post) => {
                return <Route key={post.id} path={`/posts/${post.id}`} component={Post}/>
              })}
              {/* <Route path="/users"><UserList /></Route> */}
              <ProtectedRoute path="/posts/new" exact={true} component={UploadPage} currentUserId={currentUserId}/>
              <ProtectedRoute path="/" exact={true} component={Feed} currentUserId={currentUserId}/>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    )}

    </>
  );
}

export default App;

/* <nav>
<ul>
<li><NavLink to="/" activeclass="active">Home</NavLink></li>
<li><NavLink to="/login" activeclass="active">Login</NavLink></li>
<li><a onClick={logoutUser} href="#" activeclass="active">Logout</a></li>
<li><NavLink to="/users" activeclass="active">Users</NavLink></li>
</ul>  */
