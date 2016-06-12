import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<footer className="globalFooter">
				&copy; MegazalRock (Otto Kamiya)
			</footer>
		);
	}
}