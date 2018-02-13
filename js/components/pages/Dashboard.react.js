/*
 * HomePage
 *
 * The Dashboard is only visible to logged in users
 * Route: /dashboard
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GristButton from '../GristButton.react';


class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
        <form id="grist" ref="grist" action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php" method="get" accept-charset="UTF-8">
        <input type="hidden" name="clinclientid" value="testClient1"/>
            <input type="hidden" name="metaPatientName" value="Abc"/>
            <input type="hidden" name="metaExtendedSettingsJSTool" id='startMode' ref='startMode' value='{"startMode":1}'/>
            <input type="hidden" name="SID" value="3u2knifpk7gh1j74jhhd2o2543" />
          <nav>
            <ul className="nav--dashboard--ul">

              <li className="nav--dashboard--li">New Assessment</li>
              <GristButton targetPath="1" displayText="My state of mind" />
              <GristButton targetPath="2" displayText="What's happening in my life right now" />
              <GristButton targetPath="3" displayText="What my health is like today" />
              <GristButton targetPath="4" displayText="My safety" />
              <GristButton targetPath="5" displayText="My wellbeing" />
              <GristButton targetPath="6" displayText="Overview of everything: past and present" />

              <li className="nav--dashboard--li">My Profile</li>
              <GristButton targetPath="7" displayText="My personal details" />
              <GristButton targetPath="8" displayText="My life journey" />
              <GristButton targetPath="9" displayText="My health and care" />
              <GristButton targetPath="10" displayText="My involvement with life and others" />
              <GristButton targetPath="11" displayText="My personality and way of thinking" />
            </ul>         
          </nav>
          </form>
        </div>
        <div id="divGrist">
        </div>
				
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
