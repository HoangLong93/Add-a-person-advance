// Import Libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Import Css
import './css/main.scss';

// Import Components
import UserList from './js/userList.js';
import Container from './js/container.js';

// Create UserLists
const userLists = new UserList();
userLists.init(20);

// Render 
ReactDOM.render(< Container users={userLists.users} />, document.getElementById('container'))
                