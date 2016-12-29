// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

//css
import './css/main.scss';

const users = [
    {
        id: 1,
        name: "John Doe",
        gender: "Male",
        age: 32
    },
    {
        id: 2,
        name: "Diana Barry",
        gender: "Female",
        age: 28
    },
    {
        id: 3,
        name: "Bruce Wayne",
        gender: "Male",
        age: 46
    },
    {
        id: 4,
        name: "Jane Porter",
        gender: "Female",
        age: 19
    },
    {
        id: 5,
        name: "Lucy Steele",
        gender: "Female",
        age: 31
    },
    {
        id: 6,
        name: "Oliver Twist",
        gender: "Male",
        age: 56
    },
    {
        id: 7,
        name: "Donald Duck",
        gender: "Male",
        age: 76
    },
];

class AddUser extends React.Component{
    render(){
        return(
            <div className="addPerson">
                <h2>Add a person</h2>
                <input type="textbox" name="add"/>
                <select name="selectGender">
                    <option selected disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <select name="selectAge" className="selectAge">
                    <option selected disabled>Age</option>
                </select>

                <button>+</button>
            </div>
        )

    }
}

                
class DisplayUser extends React.Component{
    render(){
        return(
            <table>
                <tbody>
                    <User />
                </tbody>
            </table>
        )
    }           
}

function User(props){
    return(
        <tr>
            <td className="name">
                <input readOnly/>
            </td>
            <td className="gender">
                <select disabled>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </td>
            <td className="age">
                <select id="selectAge" className="selectAge" disabled>
                </select>
            </td>
            <td className="edit">
                <div className="editUser" onClick="">
                    <button></button><span></span>
                </div>
            </td>
            <td className="delete">
                <button className="deleteUser" onClick=""></button>
            </td>
        </tr>
    )
}
                
ReactDOM.render(< DisplayUser/>, document.getElementById('container'))
                