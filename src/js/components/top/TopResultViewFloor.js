import React from 'react';
import TopResultViewFloorItem from './TopResultViewFloorItem';
export default class TopResultViewFloor extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var Item = this.props.data.bookmarks.map((item) => {
			return (
				<TopResultViewFloorItem key={item.user} eid={this.props.data.eid} data={item} />
			);
		});
		var Bookmarks = (()=>{
			if(this.props.data.bookmarks.length){
				return (
					<div className="bookmarks">
						{Item}
					</div>
				);
			}else{
				return null;
			}
		})();
		return (
			<div className="floor">
				<h3><a href={this.props.data.entry_url} target="_blank" title={this.props.data.title}>{this.props.index + 1}階</a></h3>
				{Bookmarks}
			</div>
		);
	}
}