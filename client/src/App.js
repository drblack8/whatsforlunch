import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile'
import NavBar from './components/nav/NavBar'
import UploadPage from './components/PhotoUpload/UploadPage';
import AuthContext from './auth'
import Feed from './components/feed/Feed'
import { ProtectedRoute } from './Routes';
import './style/app.css'
import wheel from './style/images/wedge.gif'
import Start from './pages/Start'
import SinglePost from './components/feed/SinglePost'

function App() {
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    currentUsername,
    setCurrentUsername,
    setCurrentUserId,
  };

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
        if (authData.current_user_id) {
          setCurrentUserId(authData.current_user_id)
          setCurrentUsername(authData.currentUsername)
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
        <img src={wheel} />
      </div>}
      {!loading && (
        <AuthContext.Provider value={authContextValue}>
          <BrowserRouter>
            {currentUserId && <NavBar />}
            <Switch>
              <ProtectedRoute path="/feed" exact={true} component={Feed} currentUsername={currentUsername} currentUserId={currentUserId} />
              <ProtectedRoute path={`/users/:username`} component={Profile} currentUserId={currentUserId}/>
              <ProtectedRoute path="/posts/new" exact={true} component={UploadPage} currentUserId={currentUserId}/>
              <ProtectedRoute path="/posts/:id" component={SinglePost} currentUserId={currentUserId}/>
              <ProtectedRoute path="/" exact={true} component={Feed} currentUsername={currentUsername} currentUserId={currentUserId}/>
              <Route  path="/*" exact={true} component={currentUserId ? Feed : Start} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    )}
    </>
  );
}

export default App;