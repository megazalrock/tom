import _ from 'lodash';
import util from '../../util.js';
import React from 'react';

export default class TopResultViewFloorItem extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var item = this.props.data;
		var hatebUrl = 'http://b.hatena.ne.jp/';
		var userPageUrl = hatebUrl + item.user + '/';
		var isCommmentEmpty = _.isEmpty(item.comment);
		var isIdCall = new RegExp(util.idCallRegExp).test(item.comment);
		var getComment = () => {
			var comment = _.escape(item.comment);
			comment = comment.replace(new RegExp(util.urlRegExp, 'gi'), '<a href="$1" target="_blank">$1</a>');
			comment = comment.replace(new RegExp(util.idCallRegExp, 'g'), '<a href="' + hatebUrl + '$2/" class="idCallId" target="_blank">$1</a>');
			return {
				__html: comment
			};
		};
		var Tags = item.tags.map((tag) => {
			return (
				<a href={userPageUrl + tag} target="_blank" className="tag" key={item.user + '_' + tag}>{tag}</a>
			);
		});
		var Permalink = (() => {
			if(!isCommmentEmpty){
				return (
					<a href={hatebUrl + 'entry/' + this.props.eid + '/comment/' + item.user} className="permalink" target="_blank">リンク</a>
				);
			}
		})();
		return (
			<div className={'item' + (isIdCall ? ' idCall' : '')}>
				<div className="userImage">
					<a href={userPageUrl} target="_blank">
						<img src={['http://cdn1.www.st-hatena.com/users', item.user.slice(0, 2), item.user, 'profile_l.gif'].join('/')} width="32" height="32" alt={item.user}/>
					</a>
				</div>
				<div className="userText">
					<div className="userComment">
						<a href={userPageUrl} className="userName" target="_blank">{item.user}</a>
						<span className="userCommentText" dangerouslySetInnerHTML={getComment()}></span>
					</div>
					<div className="tags">
						{Tags}
					</div>
					<div className="footer">
						{Permalink}<a href={hatebUrl + item.user + '/' + item.timestamp.replace(/ \d+:\d+:\d+/, '').replace(/\//g, '') + '#bookmark-' + this.props.eid} className="timestamp" target="_blank">{item.timestamp}</a>
					</div>
				</div>
			</div>
		);
	}
}