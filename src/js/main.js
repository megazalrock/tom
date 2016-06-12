/* global ga */
import 'lodash';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Top from './components/top/Top.js';
import About from './components/about/About.js';

class App extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this._sendGaPageview();
	}

	componentDidUpdate(){
		this._sendGaPageview();
	}
	_sendGaPageview(){
		ga && ga('send', 'pageview', this.props.location.pathname);
	}

	render(){
		return(
			<div className="main">
				<Header currentPath={this.props.location.pathname} />
				{this.props.children}
				<Footer />
			</div>
		);
	}

}

render((
	<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
		<Route path="/" component={App}>
			<IndexRoute component={Top}></IndexRoute>
			<Route path="/?url=/:url" component={Top} />
			<Route path="about" component={About} />
		</Route>
	</Router>),
	document.getElementById('container')
);