// Libraries
import React, { Component, PropTypes } from 'react';
import Option from './option.js';

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            user: props.user
        }
    }
    // Edit existing user
    onEditUser() {
        this.currentUser = Object.assign({}, this.state.user);
        this.setState({ editable: true });
    }
    onCancelEdit() {
        this.setState({ editable: false, user: this.currentUser });
    }
    onSaveEdit() {
        const {user} = this.state;
        this.props.onSave(user.id, user)
        this.setState({ editable: false });
    }
    handleChange(value, fieldName) {
        const newUser = Object.assign({}, this.state.user, { [fieldName]: value });
        console.log(newUser)
        this.setState({ user: newUser })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user });
    }
    render() {
        const {user} = this.state;
        const {onRemove} = this.props;
        const options = [];
        for (let i = 15; i <= 85; i++) {
            options.push(i);
        }
        return (
            <tr id={user.id} className={this.state.editable ? 'editable' : ''}>
                <td className="name">
                    <input value={user.name} onChange={(ev) => this.handleChange(ev.target.value, 'name')} readOnly={!this.state.editable} />
                </td>
                <td className="gender">
                    <select value={user.gender} className="selectArrow" onChange={(ev) => this.handleChange(ev.target.value, 'gender')} disabled={!this.state.editable}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </td>
                <td className="age">
                    <select value={user.age} className="selectArrow" onChange={(ev) => this.handleChange(ev.target.value, 'age')} disabled={!this.state.editable}>
                        {options.map((option, index) =>
                            <Option key={index}
                                option={option}
                                />
                        )}
                    </select>
                </td>
                <td className="edit">
                    {!this.state.editable ?
                        <div className="editUser">
                            <button title="Edit User" onClick={this.onEditUser.bind(this)}><span className="glyphicon glyphicon-pencil"></span></button><span></span>
                        </div> :
                        <div className="editUser">
                            <button title="Save Changes" className="glyphicon glyphicon-pencil btnSaveEdit" onClick={this.onSaveEdit.bind(this)}></button>
                            <span></span>
                        </div>
                    }
                </td>
                <td className="delete">
                    <div className="deleteUser">
                        <button title="Delete User" onClick={onRemove.bind(this, user.id)}><span className="glyphicon glyphicon-remove"></span></button>
                    </div>
                </td>
            </tr>
        )
    }
}
Row.propTypes = {
    user: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}
export default Row;