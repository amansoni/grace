/**
 * LoadingButton.react.js
 *
 * Wraps the loading indicator in a tag with the .btn--loading class
 */

import React, { Component } from 'react';
import axios from "axios";

export default class GristButton extends Component {

	constructor(props){
		super(props);
		this.props = props;
		console.log('GristButton constructor' + props.string)
		console.log(props)
	}

	getGristPage(targetPath){
		return axios.post(getGristPath())
		.then(function(arr){
			console.log(arr)
			return arr;
		})
	}

	// TODO:// read from configuration setting
	getGristPath(){
		return axios.get('https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php');
	}

	handleClick(event) {
		// event.preventDefault()
		var el = event.target
		// startMode.value = '{"startMode":' + this.props.targetPath + '}'
		grist.startMode.value = '{"startMode":' + this.props.targetPath + '}'
		console.log(grist.startMode.value)
		var url = 'https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php'

		axios.get(url, {
            headers: { 'Access-Control-Allow-Origin' : '*' },
        }).then(res => { 
            console.log('res');
            console.log(res);

        }).catch(error => {
            console.log('error');
            console.log('erro', error);
		})
		
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

		console.log('Request done')
	}

	render(props) {
		console.log(props)	
		return (
			<a href="#"  onClick={this.handleClick.bind(this)} key={this.props.targetPath} className="nav--dashboard--li">
				<li>{this.props.displayText}</li>
			</a>
		// <a href='#' onClick={this.handleClick.bind(this)} key={this.props.targetPath}>{this.props.displayText}</a>
		// <input type="submit" onClick={this.handleClick.bind(this)} value={this.props.displayText} />
		)
	}
}

GristButton.propTypes = {
	displayText: React.PropTypes.string.isRequired,
	targetPath: React.PropTypes.string.isRequired
  }
  
//   <form id="grist" action="https://www.secure.egrist.org/panel/mhexperts/mh-dss-assess-light-launch.php" method="get" accept-charset="UTF-8">
//   <input type="hidden" name="clinclientid" value="testClient1"/>
//   <input type="hidden" name="metaPatientName" value="Abc"/>
//   <input type="hidden" name="metaExtendedSettingsJSTool" value='{"startMode":1}'/>
//   <input type="hidden" name="SID" value="3u2knifpk7gh1j74jhhd2o2543" />
// </form>