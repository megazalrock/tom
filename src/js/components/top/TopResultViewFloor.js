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
				<h3>
					<div className="floorNum">
						<a href={this.props.data.entry_url} target="_blank" title={this.props.data.title}>{this.props.index + 1}階<span className="bookmarkCount">{this.props.data.count}users</span></a>
					</div>
					
				</h3>
				{Bookmarks}
			</div>
		);
	}
}