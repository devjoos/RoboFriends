import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import Scroll from '../components/Scroll'
import Searchbox from '../components/Searchbox'
import './App.css' 
import { setSearchField, requestRobots } from '../actions.js'

const mapStateToProps = state => {
	return { 
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error }
}

const mapDispatchToProps = (dispatch) => {
	return { onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {

componentDidMount() {
	this.props.onRequestRobots()
}


	
	render() {
		const { searchField } = this.props;
		const filteredRobots = this.props.robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase())
	})
		if (this.props.isPending) {
			return <h1>Loading</h1>
		} else {
		return (
		<div className='tc'>
		<h1 className='f1'>RoboFriends</h1>
		<Searchbox searchChange={this.props.onSearchChange}/>
		<Scroll>
		<CardList robots={filteredRobots}/>
		</Scroll>
		</div>
		)
		} 
	}	
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

