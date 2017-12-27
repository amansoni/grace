/*
 * HomePage
 *
 * The Dashboard is only visible to logged in users
 * Route: /dashboard
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul className="nav--dashboard--ul">
            <li className="nav--dashboard--li"><a href="/overview" className="nav--dashboard--li">Overview</a></li>
            <li className="nav--dashboard--li"><a href="/assessment" className="nav--dashboard--li">Assessments</a></li>
            <li className="nav--dashboard--li"><a href="/profile" className="nav--dashboard--li">Profile</a></li>
            <li className="nav--dashboard--li"><a href="/today" className="nav--dashboard--li">Today's Assessment</a></li>
            <li className="nav--dashboard--li"><a href="/diary" className="nav--dashboard--li">Diary</a></li>
            <li className="nav--dashboard--li"><a href="/sensor" className="nav--dashboard--li">Sensors</a></li>
            <li className="nav--dashboard--li"><a href="/actions" className="nav--dashboard--li">Plan &amp; Actions</a></li>
          </ul>         
        </nav>
      </div>
    );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
