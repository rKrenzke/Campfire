import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import {Button} from 'reactstrap';
import NavBar from './components/Navbar';
import HomePage from './components/Homepage';
import Search from './components/Search';
import Sites from './components/Sites';
import Admin from './components/Admin';
// import Browse from './components/Browse';


const AUTH = {
  isAuthenticated: false,
};


const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<any>();
  const [isAdmin, setAdminStatus] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      AUTH.isAuthenticated = true;
    }

  }, [sessionToken]);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const adminStatus = () => {
    setAdminStatus(true);
  }

  const userNameFunction = (username: string) => {
    setUserName(username);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    setAdminStatus(false);
    AUTH.isAuthenticated = false;
  };

  return (
    <Router>
      <NavBar updateToken={updateToken} logout={clearToken} isLoggedIn={!!sessionToken} isAdmin={isAdmin} updateStatus={adminStatus} setUserName={userNameFunction}/> 
      <Switch>
        <Route path="/search">
          <Search token={sessionToken}/>
        </Route>
        <Route path="/admin">
          <Admin isAdmin={isAdmin} token={sessionToken}/>
          </Route>
        <Route path="/campTrips">
          <Sites token={sessionToken} user={userName}/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;