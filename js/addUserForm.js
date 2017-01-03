// Libraries
import React, { Component, PropTypes } from 'react';
import Option from './option.js';

class AddUserForm extends Component {
    constructor(props) {
        super(props);
        this.defaultValue = {
            gender: 'Gender',
            name: '',
            age: 'Age'
        }
        this.state = {
            user: this.defaultValue,
            enabledAddButton: false,
            isValidate: false,
        }
    }
    // handle value change in Add User Form
    handleChange(value, fieldName) {
        const newUser = Object.assign({}, this.state.user, { [fieldName]: value });
        if (newUser['name'] !== "" && newUser['gender'] !== "Gender" && newUser['age'] !== "Age") {
            this.setState({ user: newUser, enabledAddButton: true, isValidate: true })
        } else {
            this.setState({ user: newUser, enabledAddButton: false, isValidate: true })
        }
    }
    handleAdd() {
        this.props.AddUser(this.state.user);
        this.setState({ user: this.defaultValue, enabledAddButton: false, isValidate: false });
    }
    render() {
        const options = [];
        for (let i = 15; i <= 85; i++) {
            options.push(i);
        }
        return (
            // Add User
            <div className="addPerson">
                <h2>Add a person</h2><br />
                <input type="textbox" id="UserName" placeholder="Name" value={this.state.user.name} onChange={(ev) => this.handleChange(ev.target.value, 'name')} />
                <select id="UserGender" value={this.state.user.gender} onChange={(ev) => this.handleChange(ev.target.value, 'gender')}>
                    <option value="Gender" disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select id="UserAge" value={this.state.user.age} onChange={(ev) => this.handleChange(ev.target.value, 'age')}>
                    <option value="Age" disabled>Age</option>
                    {options.map((option, index) =>
                        <Option key={index}
                            option={option}
                            />
                    )}
                </select>

                <button title="Add User" onClick={this.handleAdd.bind(this)} className={this.state.enabledAddButton ? "btn-success" : "btn-secondary"} disabled={!this.state.enabledAddButton}>+</button>
                <br />
                <div className={this.state.isValidate ? "" : "hidden"}>
                    <div className={`validate validateName ${this.state.user.name === "" ? "" : "hideValidateBlock"}`}>
                        <p>Please enter user name</p>
                    </div>
                    <div className={`validate ${this.state.user.gender === "Gender" ? "" : "hideValidateBlock"}`}>
                        <p>Please choose user gender</p>
                    </div>
                    <div className={`validate ${this.state.user.age === "Age" ? "" : "hideValidateBlock"}`}>
                        <p>Please choose user age</p>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}
AddUserForm.PropTypes = {
    AddUser: PropTypes.func.isRequired,
}

export default AddUserForm;