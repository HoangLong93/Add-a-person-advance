// Libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jQuery';

//css
import './css/main.scss';

// import Confirm from './js/deleteUser.js';

const users = [
        {
            id: "1",
            name: "John Doe",
            gender: "Male",
            age: 32
        },
        {
            id: "2",
            name: "Diana Barry",
            gender: "Female",
            age: 28
        },
        {
            id: "3",
            name: "Bruce Wayne",
            gender: "Male",
            age: 46
        },
        {
            id: "4",
            name: "Jane Porter",
            gender: "Female",
            age: 19
        },
        {
            id: "5",
            name: "Lucy Steele",
            gender: "Female",
            age: 31
        },
        {
            id: "6",
            name: "Oliver Twist",
            gender: "Male",
            age: 56
        },
        {
            id: "7",
            name: "Donald Duck",
            gender: "Male",
            age: 76
        },
    ]
// class AddUser extends React.Component{
//     render(){
//         return(
//             <div className="addPerson">
//                 <h2>Add a person</h2>
//                 <input type="textbox" name="add"/>
//                 <select name="selectGender">
//                     <option selected disabled>Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                 </select>
//                 <select name="selectAge" className="selectAge">
//                     <option selected disabled>Age</option>
//                 </select>

//                 <button>+</button>
//             </div>
//         )

//     }
// }

class UserList {
	constructor(users) {
		this.users = users
	}
	find(id) {
		return this.users.findIndex(user => user.id === id);
	}
	remove(id) {
		const index = this.find(id);
		this.users.splice(index, 1)
	}
	save(id, info) {
		const index = this.find(id);
		this.users[index] = info;
	}
	add(info) {

	}
}

class Confirm extends Component{
    abort(){

    }
    confirm(){
        
    }
    render(){
        return(
            <div className="remove-container">
                <div className="confirmRemove">
                    <h3>
                        Remove person
                    </h3>
                    <p>
                        Are you sure you want to remove this entry?
                    </p>             
                    <button
                        role="abort"
                        type="button"
                        onClick={this.abort.bind(this)}
                    >
                    CANCEL
                    </button>
                    <button
                        role="confirm"
                        type="button"
                        ref="confirm"
                        onClick={this.confirm.bind(this)}
                    >
                    YES
                    </button>                           
                </div>
            </div> 
        );
    }
};
                
class Table extends Component {
    constructor(props) {
		super(props);
		this.userList = new UserList(props.users)
		this.state = {
			users: props.users
		}
	}
    onSave(id, info) {
		this.userList.save(id, info)
		this.setState({ users: this.userList.users })
	}
	onRemovePlayer(id) {
        ReactDOM.render(<Confirm />, document.getElementById('container'));
		this.userList.remove(id)
		this.setState({ users: this.userList.users })
	}
    render(){
        return(
            <table>
                <tbody>
                    {this.props.users.map((user, index) =>
						<Row
							key={index}
							user={user}
							onSave={this.onSave.bind(this)}
							onRemove={this.onRemovePlayer.bind(this)}
							/>
					)}
                </tbody>
            </table>
        )
    }           
};

class Row extends Component{   
    constructor(props) {
		super(props);
		this.state = {
			editable: false,
			user: props.users
		}
	}
    onEdit() {
		this.setState({ editable: !this.state.editable });
	}
	onChange(ev) {
	}
    render(){
        // const {} = this.state;
		const {user,onRemove} = this.props;
        return(
            <tr id={user.id} className={this.state.editable ? 'editable' : ''}>
                <td className="name">
                    <input defaultValue={user.name} onChange={this.onChange.bind(this)} readOnly/>
                </td>
                <td className="gender">
                    <select defaultValue={user.gender} disabled>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </td>
                <td className="age">
                    <select id="selectAge" className="selectAge" value={user.age} disabled>
                        
                    </select>
                </td>
                <td className="edit">
                    <div className="editUser" onClick={this.onEdit.bind(this)}>
                        <button></button><span></span>
                    </div>
                </td>
                <td className="delete">
                    <button className="deleteUser" onClick={() => onRemove(user.id)}></button>
                </td>
            </tr>
        )
    }
}

                
ReactDOM.render(< Table users={users} />, document.getElementById('container'))
                