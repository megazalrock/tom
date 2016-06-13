import _ from 'lodash';
import util from '../../util.js';
import React from 'react';
import TopResultViewFloor from './TopResultViewFloor';
export default class TopResultView extends React.Component{
	constructor(props){
		super(props);
	}

	getAreaText(floors){
		var floorNum = floors.length;
		var space = (() => {
			var result = 0;
			floors.forEach((floor) => {
				result += floor.count;
			});
			return result;
		})();
		var text = floorNum + '階建て 延べ床面積' + space + '㎡';
		return text;
	}

	render(){
		var Floors = this.props.floors.map((floor, index) => {
			return (
				<TopResultViewFloor key={floor.eid} data={floor} index={index}/>
			);
		});

		if(!this.props.floors.length){
			Floors = () => {
				return (
					<div className="floor empty">empty</div>
				);
			};
		}

		var ResultView = () => {
			if(!_.isEmpty(this.props.floors)){
				return (
					<div className="resultView">
						<h2>
							<a href={this.props.floors[0].entry_url} target="_blank" className="bookmarkCount">
								<span className="count">{this.props.floors[0].count}</span>
								<span className="users">users</span>
							</a>
							<span className="title">
								<a href={this.props.floors[0].url} target="_blank">{this.props.floors[0].title}</a>
							</span>
						</h2>
						<div className="area">
							{this.getAreaText(this.props.floors)}
						</div>
						<div className="floors">
							{Floors}
						</div>
					</div>
				);
			}else{
				return null;
			}
		};

		return ResultView();
	}
}