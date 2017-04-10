// Libraries
import React, { Component, PropTypes } from 'react';

// Import Components
import Table from './table.js';
import Confirm from './confirm.js';
import AddUserForm from './addUserForm.js';
import axios from 'axios';

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			isConfirmModalOpen: false,
			// change number of users display per pages
			pageSize: 5
		}
	}

	componentDidMount() {
		this.getUserList();
	}
	getUserList() {
		axios({
			method: 'get',
			url: 'http://localhost:3000/users'
		}).then(res => {
			this.setState({users: res.data})
		}).catch(err => {
			console.error('Augh, there was an error!', err);
		})
	}
	// Add new User
	AddUser(info) {
		axios({
			method: 'post',
			url: 'http://localhost:3000/user',
			data: {
				name: info.name,
				gender: info.gender,
				age: info.age
			}
		}).then((res) => {
			this.getUserList();

		}).catch((err) => {
			console.log(err);
		})
	}
	// Save changes on each user
	onSave(id, info) {
		axios({
			method: 'put',
			url: 'http://localhost:3000/update/' + id,
			data: {
				name: info.name,
				gender: info.gender,
				age: info.age
			}
		}).then((res) => {
			// this.getUserList();

		}).catch((err) => {
			console.log(err);
		})
	}
	// Remove user
	onRemoveUser(id) {
		this.setState({ isConfirmModalOpen: true });
		this.currentUserID = id;
	}
	abort() {
		delete this.currentUserID;
		this.getUserList();
		this.setState({ isConfirmModalOpen: false });
	}
	confirm() {
		axios({
			method: 'delete',
			url: 'http://localhost:3000/delete/' + this.currentUserID,			
		}).then((res) => {
			this.getUserList();
		}).catch((err) => {
			console.log(err);
		})
		this.setState({ isConfirmModalOpen: false })
	}
	render() {
		const {users, pageSize} = this.state;
		return (
			this.state.isConfirmModalOpen ?
				<div className="main">
					<Confirm abort={this.abort.bind(this)} confirm={this.confirm.bind(this)} />
				</div> :
				<div className="main">
					<AddUserForm AddUser={this.AddUser.bind(this)} />
					<Table users={users}
						onSave={this.onSave.bind(this)}
						onRemove={this.onRemoveUser.bind(this)}
						pageSize={pageSize}
					/>
				</div>
		)
	}
}
Container.propTypes = {
}
export default Container;