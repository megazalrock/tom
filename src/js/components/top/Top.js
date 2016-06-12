/* global request */
import _ from 'lodash';
import util from '../../util.js';
import React from 'react';
import {browserHistory} from 'react-router';
import TopInputBox from './TopInputBox.js';
import TopResultView from './TopResultView.js';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

const HatebAPI = 'http://b.hatena.ne.jp/entry/jsonlite/';

export default class Top extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			floors: [],
			floorsOrigin:[],
			url: '',
			viewMode: 'comment',
			isLoading: false
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.location.query.url !== nextProps.location.query.url){
			this.onSubmit(nextProps.location.query.url);
		}
	}

	componentDidMount(){
		if(this.props.location.query.url && this.props.location.query.url !== ''){
			this.onSubmit(this.props.location.query.url);
		}
	}

	onSubmit(url){
		var originUrl = this._getOriginUrl(url);
		if(this.state.url === originUrl || this.state.isLoading){
			return false;
		}

		this.setState({
			floors: [],
			isLoading: true
		});

		this.setState({
			url: originUrl
		});

		if(_.isUndefined(this.props.location.query.url) || this.props.location.query.url !== originUrl){
			browserHistory.push({
				search: '?url=' + originUrl
			});
		}

		var floors = [];
		var counter = 0;
		var loop = (url) => {
			counter ++;
			superagent
				.get(HatebAPI)
				.use(jsonp)
				.query({
					url: url
				})
				.end((err, res) => {
					if((!_.isNull(res.body) && res.body.count) && (_.isEmpty(floors) || res.body.url !== _.last(floors).url)){
						floors.push(res.body);
						this.setState({
							floors: this._filterBookmarks(floors, this.state.viewMode),
							floorsOrigin: floors
						});
						loop(res.body.entry_url);
					}else{
						this.setState({
							floors: this._filterBookmarks(floors, this.state.viewMode),
							floorsOrigin: floors,
							isLoading: false
						});
					}
				});
		};
		loop(originUrl);
	}

	onChangeViewMode(viewMode){
		var floors;
		if(_.isEmpty(this.state.floorsOrigin)){
			floors = [];
		}else{
			floors = this._filterBookmarks(this.state.floorsOrigin, viewMode);
		}
		this.setState({
			floors: floors,
			viewMode: viewMode
		});
	}

	_getOriginUrl(url){
		var getUpperUrl = (url) => {
			url = url.replace(/^https?:\/\/b.hatena.ne.jp\/entry\//, '');
			if(/^s\//.test(url)){
				url = 'https://' + url.replace(/^s\//, '');
			}else{
				url = 'http://' + url;
			}
			return url;
		};
		while(/^https?:\/\/b.hatena.ne.jp\/entry\//.test(url)){
			url = getUpperUrl(url);
		}
		return url;
	}

	_filterBookmarks(floors, viewMode){
		var _floors = _.cloneDeep(floors);
		_floors.map((floor) => {
			if(viewMode === 'comment'){
				floor.bookmarks = _.filter(floor.bookmarks, (item) => {
					return item.comment !== '';
				});
			}else if(viewMode === 'idCall'){
				floor.bookmarks = _.filter(floor.bookmarks , (item) => {
					return new RegExp(util.idCallRegExp).test(item.comment);
				});
			}
		});

		return _floors;

		/*if(this.state.viewMode === 'comment'){
			floor.bookmarks = _.filter(floor.bookmarks, (item) => {
				return item.comment !== '';
			});
		}else if(this.state.viewMode === 'idCall'){
			floor.bookmarks = _.filter(floor.bookmarks , (item) => {
				return util.idCallRegExp.test(item.comment);
			});
		}
		return floor;*/
	}


	render(){
		return (
			<div className="index">
				<TopInputBox handleOnSubmit={this.onSubmit.bind(this)} handleOnChangeViewMode={this.onChangeViewMode.bind(this)} viewMode={this.state.viewMode} url={this.state.url} isLoading={this.state.isLoading}/>
				<TopResultView floors={this.state.floors} viewMode={this.state.viewMode}/>
			</div>
		);
	}
}