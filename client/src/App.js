import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import UserList from './components/UsersList';
import NavBar from './components/nav/NavBar'
import UploadPage from './components/PhotoUpload/UploadPage';

function App() {

  return (
    <BrowserRouter>
        <NavBar /> 
        <Switch>
            <Route path="/users" component={UserList} />
            <Route path="/profile" component={Profile} />
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/posts/new" component={UploadPage} />
            <Route path="/" component={Feed} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
