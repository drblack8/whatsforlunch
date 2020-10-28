import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Profile from './pages/Profile'
import LoginForm from './components/LoginForm';
import UserList from './components/UsersList';
import NavBar from './components/nav/NavBar'
import UploadPage from './components/PhotoUpload/UploadPage';
import AuthContext from './auth'
import Feed from './components/feed/Feed'
import { ProtectedRoute, AuthRoute } from './Routes';

function App() {
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId
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
                console.log(authData)
                setCurrentUserId(authData.current_user_id)
            }
        }
        setLoading(false)
    }
    restoreCSRF();
  }, []);

  return (
    <>
    {loading && <h1>Loading...</h1> }
    {!loading && (
      <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
          <NavBar />
          <Switch>
              <Route path="/login" component={LoginForm} />
              <ProtectedRoute path="/feed" exact={true} component={Feed} currentUserId={currentUserId}/>
              <ProtectedRoute path="/users" exact={true} component={UserList} currentUserId={currentUserId} />
              <Route path="/profile" exact={true} component={Profile} currentUserId={currentUserId}/>
              <Route path="/users"><UserList /></Route>
              <Route path="/posts/new" component={UploadPage} />
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
