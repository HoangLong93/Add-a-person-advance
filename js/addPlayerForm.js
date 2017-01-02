// Libraries
import React, { Component, PropTypes } from 'react';
import Option from './option.js';

class AddPlayerForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            genderDefaultValue: 'Gender',
            ageDefaultValue: 'Age',
            user:{
                id:props.nextUserId,
            },
            nameText:"",
        }
    }
    // handle value change in Add User Form
    handleChange(value,fieldName){
        const newUser = Object.assign({},this.state.user,{[fieldName]:value});
        this.setState({user: newUser,nameText:value})
    }
    handleAdd(){
        this.props.AddUser(this.state.user);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({user:{id: nextProps.nextUserId}});
    }
    render(){
        const options = [];
        for(let i = 1; i < 100; i++){
            options.push(i);
        }
        return(
            // Add User
            <div className="addPerson">
                <h2>Add a person</h2><br/>
                <input type="textbox" id="UserName" placeholder="Name" onChange={(ev)=>this.handleChange(ev.target.value,'name')}/>
                <select id="UserGender" defaultValue={this.state.genderDefaultValue} onChange={(ev)=>this.handleChange(ev.target.value,'gender')}>
                    <option value="Gender" disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select id="UserAge" defaultValue={this.state.ageDefaultValue} onChange={(ev)=>this.handleChange(ev.target.value,'age')}>
                    <option value="Age" disabled>Age</option>
                    {options.map((option,index) =>
                            <Option key={index}
                                    option={option}
                            />   
                    )}
                </select>
                    
                <button name="Submit" onClick={this.handleAdd.bind(this)} >+</button>
                <br/>
                <div className={`validate validateName ${this.state.user.name === "" || this.state.user.name === undefined ? "" : "hideValidateBlock"}`}>
                    <p>Please enter user name</p>
                </div>
                <div className={`validate ${this.state.user.gender === "Gender" || this.state.user.gender === undefined ? "" : "hideValidateBlock"}`}>
                    <p>Please choose user gender</p>
                </div>
                <div className={`validate ${this.state.user.age === "Age" || this.state.user.age === undefined ? "" : "hideValidateBlock"}`}>
                    <p>Please choose user age</p>
                </div>
                <br/><br/>
            </div>
        )
    }
}
AddPlayerForm.PropTypes = {
    AddUser: PropTypes.func.isRequired,
    nextUserId: PropTypes.number.isRequired
}

export default AddPlayerForm;