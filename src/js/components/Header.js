import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var Menu = (() => {
			if(this.props.currentPath === '/about'){
				return (
					<div className="menu"><Link to="/" activeClassName="active">トップへ</Link></div>
				);
			}else{
				return (
					<div className="menu"><Link to="/about" activeClassName="active">このサイトについて</Link></div>
				);
			}
		})();


		return (
			<header className="globalHeader">
				<h1>Tower of Metab<span className="description">メタブ一覧表示ツール</span></h1>
				{Menu}
			</header>
		);
	}
}