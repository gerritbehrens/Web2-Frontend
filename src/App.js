import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import TopMenue from './components/TopMenue';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';
import UserManagementPage from './components/UserManagementPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const mapStateToProps = state => {
  return state
}

class App extends Component {

  render() {

    const token = this.props.accessToken

    let workspace

    if (token) {
      workspace = <PrivatePage />
    }
    else {
      workspace = <PublicPage />
    }

    return (
      <div className="App">
        <Router>
          <TopMenue />
          <Routes>
            <Route path="/" element={workspace} />
            <Route path="/usermanagement" element={<UserManagementPage />} />
          </Routes>
        </Router >
      </div>

    );
  }

}



export default connect(mapStateToProps)(App);
