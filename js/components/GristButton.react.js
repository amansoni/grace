/**
 * LoadingButton.react.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React, { Component, PropTypes } from 'react';
import axios from "axios";

export default class GristButton extends Component {

	constructor(props){
		super(props);
		this.props = props;
		// this.props.buttonClicked.bind()
	}

	handleClick(event) {
		event.preventDefault()
		var el = event.target
		console.log('grist.startMode.value ' + this.props.targetPath);
		this.props.buttonClicked(this.props.targetPath);
	}

	render(props) {
		return (
			<a href="#"  onClick={this.props.buttonClicked.bind(this)} key={this.props.targetPath} className="nav--dashboard--li">
				<li>{this.props.displayText}</li>
			</a>
		)
	}
}

GristButton.propTypes = {
	displayText: React.PropTypes.string.isRequired,
	targetPath: React.PropTypes.string.isRequired,
	buttonClicked: React.PropTypes.func
}
		
// 	}
//   }

  	// getGristPage(targetPath){
	// 	return axios.post(getGristPath())
	// 	.then(function(arr){
	// 		console.log(arr)
	// 		return arr;
	// 	})
	// }

	// TODO:// read from configuration setting
	// getGristPath(){
	// 	return axios.get('https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php');
	// }
		// var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php'

		// axios.get(url, {
        //     headers: { 'Access-Control-Allow-Origin' : '*' },
        // }).then(res => { 
        //     console.log('res');
        //     console.log(res);

        // }).catch(error => {
        //     console.log('error');
        //     console.log('erro', error);
		// })
		// state.startMode = this.props.targetPath;
		// var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-portal/java-tool/java-tool.php?clinicianClientID=annon&patient-id=71463&SID=2jgmuv40n0ut6i4ek1tfgkc3p0&ll=1&ACAS=1';
		
		// callOtherDomain();

		// var invocation = new XMLHttpRequest();
		// var url = 'http://bar.other/resources/public-data/';
		  
		// function callOtherDomain() {
		//   if(invocation) {    
		// 	invocation.open('GET', url, true);
		// 	invocation.onreadystatechange = handler;
		// 	invocation.send(); 
		//   }
	

		// var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php'

		// const proxyOptions = {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Access-Control-Allow-Origin': '*'
		// 	},
		//    };

		// axios.get(url, proxyOptions)
		// .then(response => resolve(response))
		// .catch(error => resolve(error.response)); 
		
		// axios.request('POST', {
		// 	data: {
		// 		'clinclientid' : 'testClient1',
		// 		'metaPatientName' : 'Abc',
		// 		'metaExtendedSettingsJSTool' : grist.startMode.value,
		// 		'SID' : '3u2knifpk7gh1j74jhhd2o2543'
		// 	},
		// 	url: url,
		// 	headers: {
		// 		'Access-Control-Allow-Origin': '*'
		// 	},
		//   }).then(function(response){
		// 	console.log(response);
		// })

	// 	console.log('Request done')
	// }