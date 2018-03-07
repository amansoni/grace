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
import axios from "axios";

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

class Dashboard extends Component {

  gristButtonClicked(startMode) {
    console.log('tool' + startMode);
    console.log(startMode);
    
    var session =localStorage.getItem( 'SID' ); 
    
    var gristURL = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php?SID=' + session;
    gristURL += '&clinclientid=' + 'testClient1';
    gristURL += '&metaPatientName=' + '';
    gristURL += '&metaExtendedSettingsJSTool={"startMode":' + startMode + '}';
    //  "testClient1", metaPatientName: "Abc", metaExtendedSettingsJSTool: {"startMode":1}, SID:' + session;
    console.log(gristURL);

    axios.get(gristURL).then(res => { 
            console.log('res');
            console.log(res['data']);
            divGrist.innerHTML = res['data'];

        }).catch(error => {
            console.log('error');
            console.log('erro', error);
    })

  }

  componentDidMount(){

    console.log('Dashboard - componentDidMount');
    // const data = this.props.data;
    // const SID = data.SID
		// console.log(SID)
    // const startMode = data.startMode;
		// console.log(startMode)
    
    console.log('Drupal');
    // Drupal Login
    // var url = 'https://eas-grist06.aston.ac.uk/user/login?_format=json';
    var drupaldata =  '{"name":"amansoni", "pass":"3A5-gr15t04_drupal8"}';
    axios.post('https://eas-grist06.aston.ac.uk/user/login?_format=json', drupaldata)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    console.log('GRIST');
    var session = 'ic4bfrnps41jog58g8spcfet24';
    // GRIST Session
    var gristdata = '?u=trust-su-drupal&p=delta4force&metaClinID=';
    axios.post('https://www.secure.egrist.org/login-headless.php' + gristdata)
    .then(function (response) {
      console.log('session');
      console.log(response);
      session = response['data'];
      console.log(session);
    })
    .catch(function (error) {
      console.log('session error');
      console.log(error);
    });

    this.state = {
      SID: session,
      startMode: 1
    }
    console.log('this.state');
    console.log(this.state);
    localStorage.setItem( 'SID', session );
    localStorage.setItem( 'startMode', 1 );
  }

    // var gristURL = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php';
    // var spadata = '{clinclientid: "testClient1", metaPatientName: "Abc", metaExtendedSettingsJSTool: {"startMode":1}, SID:' + session;
    // console.log('tool');
    // console.log(spadata);

    // var gristURL = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php?SID=' + session;
    // gristURL += '&clinclientid=' + 'testClient1';
    // gristURL += '&metaPatientName=' + '';
    // gristURL += '&metaExtendedSettingsJSTool={"startMode":' + '1}';
    // //  "testClient1", metaPatientName: "Abc", metaExtendedSettingsJSTool: {"startMode":1}, SID:' + session;

    // axios.get(gristURL).then(res => { 
    //         console.log('res');
    //         console.log(res['data']);
    //         divGrist.innerHTML = res['data'];

    //     }).catch(error => {
    //         console.log('error');
    //         console.log('erro', error);
    // })

    // "","u=$trustid&p=$password&metaClinID=$clinicianName"

    // trust-su-drupal | delta4force | ne3pab6Muf4EQuS
// | trust_id        | password    | privileged_password | drupal_group_nid | salt       | default_tool | default_assessment_mode | default_population | default_launch_type |
// +-----------------+-------------+---------------------+------------------+------------+--------------+-------------------------+--------------------+---------------------+
// | trust-su-drupal | delta4force | ne3pab6Muf4EQuS     |               19 | salty salt | grist-java   | self-assessment         | service-user       | private             |
    /** Drupal 8 Login
     * curl --header "Content-type: application/json" --request POST \
--data '{"name":"amansoni", "pass":"3A5-gr15t04_drupal8"}' \
https://eas-grist06.aston.ac.uk/user/login?_format=json
*/
    // var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php'

    // var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-portal/java-tool/java-tool.php?clinicianClientID=annon&patient-id=71463&SID=crmi1u4o33piell0aubib8eiv1&ll=1&ACAS=1'
    // var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-portal/java-tool/java-tool.php?clinicianClientID=annon&patient-id=71463&SID=2jgmuv40n0ut6i4ek1tfgkc3p0&ll=1&ACAS=1';
    // if (isEmpty(SID)){
    //   const startModeObj = '{"startMode":' + startMode + '}'
    //   axios.post(url, {
    //     clinclientid: 'testClient1',
    //     metaPatientName: 'Abc',
    //     metaExtendedSettingsJSTool : startModeObj,
    //     SID: '3u2knifpk7gh1j74jhhd2o2543'
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // callOtherDomain();
    // var invocation = new XMLHttpRequest();
    // // var url = 'http://bar.other/resources/public-data/';
      
    // function callOtherDomain() {
    //   if(invocation) {    
    //     invocation.open('GET', url, true);
    //     invocation.onreadystatechange = handler;
    //     invocation.send(); 
    //   }
    // }
		// axios.get(url, {
    //         headers: { 'Access-Control-Allow-Origin' : '*' },
    //     }).then(res => { 
    //         console.log('res');
    //         console.log(res['data']);
    //         divGrist.innerHTML = res['data'];

    //     }).catch(error => {
    //         console.log('error');
    //         console.log('erro', error);
		// })
    // state.startMode = this.props.targetPath;
    // <form id="grist" ref="grist" action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php" method="get" accept-charset="UTF-8">
    /*
        // <form id="grist" ref="grist" action="" method="get" accept-charset="UTF-8">
        // <input type="hidden" name="clinclientid" value="testClient1"/>
        //     <input type="hidden" name="metaPatientName" value="Abc"/>
        //     <input type="hidden" name="metaExtendedSettingsJSTool" id='startMode' ref='startMode' value='{"startMode":1}'/>
        //     <input type="hidden" name="SID" value="3u2knifpk7gh1j74jhhd2o2543" />
        // </form>
*/    

  render() {
    return (
      <div>
        <div>
        <nav>
            <ul className="nav--dashboard--ul">
              <li className="nav--dashboard--li">New Assessment</li>
              <GristButton targetPath="1" displayText="My state of mind" buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="2" displayText="What's happening in my life right now"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="3" displayText="What my health is like today"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="4" displayText="My safety"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="5" displayText="My wellbeing"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="6" displayText="Overview of everything: past and present"  buttonClicked={this.gristButtonClicked}/>

              <li className="nav--dashboard--li">My Profile</li>
              <GristButton targetPath="7" displayText="My personal details"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="8" displayText="My life journey"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="9" displayText="My health and care"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="10" displayText="My involvement with life and others"  buttonClicked={this.gristButtonClicked}/>
              <GristButton targetPath="11" displayText="My personality and way of thinking"  buttonClicked={this.gristButtonClicked}/>
            </ul>         
          </nav>
        </div>
        <input type="hidden" name="startmode" id="startmode" />>
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
