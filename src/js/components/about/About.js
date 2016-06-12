import React from 'react';
export default class About extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="about">
				<h2>このサイトについて</h2>
				<p>
					メタブタワーを登って一覧表示するためのサービスです。<br />
					以前のバージョンではsettionStrageに一時的に結果を保存していましたが、現在のバージョンでは保存していません。
				</p>
				<h2>作者</h2>
				<p>
					MegazalRock (Otto Kamiya)<br />
					<a href="https://twitter.com/megazal_rock" target="_blank">@megazal_rock</a><br />
					<a href="http://profile.hatena.ne.jp/megazalrock/" target="_blank">id:megazalrock</a>
				</p>
			</div>
		);
	}
}