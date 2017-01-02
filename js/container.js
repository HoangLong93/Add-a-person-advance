// Libraries
import React, { Component, PropTypes } from 'react';

// Import Components
import UserList from './userList.js';
import Table from './table.js';
import Confirm from './confirm.js';
import AddPlayerForm from './addPlayerForm.js'

class Container extends Component{
	constructor(props) {
		super(props);
		this.userList = new UserList(props.users)
		this.state = {
			users: props.users,
			isConfirmModalOpen:false,
			nextUserId:parseInt(props.users[props.users.length-1].id) + 1,
			pageSize: 5			
		}
	}
	// Add new User
	AddUser(info){
		this.userList.add(info);
		this.setState({users:this.userList.users,nextUserId:this.state.nextUserId + 1})
	}
	// Save changes on each user
    onSave(id, info) {
		this.userList.save(id, info)
		this.setState({ users: this.userList.users })
	}
	// Remove user
	onRemoveUser(id) {
		this.setState({isConfirmModalOpen: true});
		this.currentUserID = id;
	}
	abort(){
		delete this.currentUserID;
		this.setState({isConfirmModalOpen: false});
	}
	confirm(){
		this.userList.remove(this.currentUserID)
		this.setState({ users: this.userList.users,isConfirmModalOpen: false })
	}
	render(){
    	return(
    		this.state.isConfirmModalOpen ? 			
			<div className="main">
    		<Confirm abort={this.abort.bind(this)} confirm={this.confirm.bind(this)} />
			</div> :			
			<div className="main">
			<AddPlayerForm AddUser={this.AddUser.bind(this)} nextUserId={this.state.nextUserId}/>
			<Table 	users={this.state.users}
					onSave={this.onSave.bind(this)}
					onRemove={this.onRemoveUser.bind(this)}
					pageSize={this.state.pageSize}
			/>
			</div>
    	)
    }
}
Container.propTypes={
    users: PropTypes.array.isRequired,
}
export default Container;