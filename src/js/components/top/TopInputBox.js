import React from 'react';

export default class TopInputBox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			url: this.props.url
		};
	}

	componentDidMount(){
		this.refs.urlInput.focus();
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			url: nextProps.url
		});
	}

	handleSubmit(){
		this.props.handleOnSubmit(this.state.url);
	}

	handleURLChange(e){
		this.setState({url: e.target.value});
	}

	handleChangeViewMode(e){
		this.props.handleOnChangeViewMode(e.target.value);
	}

	render(){
		return (
			<div className={'inputBox' + (this.props.isLoading ? ' loading' : '')}>
				<div className="urlInput">
					<form>
						<span className="inputTextBox"><input type="url" value={this.state.url} onChange={this.handleURLChange.bind(this)} ref="urlInput" placeholder="http://example.com" /></span>
						<span className="inputSubmitBox"><input type="submit" disabled={this.props.isLoading ? true : false} value={this.props.isLoading ? '読込中' : '登る'} onClick={this.handleSubmit.bind(this)}/></span>
					</form>
				</div>
				<div className="modeInput">
					<label><input type="radio" name="mode" value="all" checked={(this.props.viewMode === 'all' ? true: false)} onChange={this.handleChangeViewMode.bind(this)}/>全てのブクマを表示</label>
					<label><input type="radio" name="mode" value="comment" checked={(this.props.viewMode === 'comment' ? true: false)} onChange={this.handleChangeViewMode.bind(this)}/>コメントのあるブクマのみ</label>
					<label><input type="radio" name="mode" value="idCall" checked={(this.props.viewMode === 'idCall' ? true: false)} onChange={this.handleChangeViewMode.bind(this)}/>IDコールを含むブクマのみ</label>
				</div>
			</div>
		);
	}
}