import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import TopMenue from './components/TopMenue';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/Authentification/PrivatePage';
import UserManagement from './components/User/UserPage'
import ForumPage from './components/ForumThread/ForumThreadPage'
import MessagePage from './components/Message/MessagePage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Forbidden from "./components/Authentification/Forbidden";

const mapStateToProps = state => {
  return state
}

class App extends Component {

  render() {

    const token = this.props.accessToken

    let workspace
    let userManagement
    let forumPage = <ForumPage />
    let messagePage = <MessagePage />

    if (token) {
      workspace = <PrivatePage />
    }
    else {
      workspace = <PublicPage />
    }

    if(token){
      userManagement = <UserManagement />
    }
    else{
      userManagement = <Forbidden />
    }

    return (
      <div className="App">
        <Router>
          <TopMenue />
          <Routes>
            <Route path="/" element={workspace} />
            <Route path="/userManagement" element={userManagement} />
            <Route path="/forumPage" element={forumPage} />
            <Route path="/forumMessages" element={messagePage} />
          </Routes>
        </Router >
      </div>

    );
  }

}



export default connect(mapStateToProps)(App);
