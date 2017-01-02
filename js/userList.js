// Libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UserList {
	constructor(users) {
		this.users = users
	}
	//Render new UserList
	init(numberOfUsers){
		const firstNames = ['John','Sophia','Emma','Jackson','Aiden','Lucas','Olivia','Noah','Ethan','Ava','Riley','Mason','Zoe','Oliver','Lily','Jacob','Michael','Carter','Chloe','Harper','Daniel','Evelyn','William','Jack','Owen','Matthew','Isaac','Dylan','Elizabeth','David','Connor','Landon','Victoria','Anna','Christian','Maria','Sarah','Addison','Henry','Emily','James','Alexander','Evelyn','Gabriel','Luke','Madison','Benjamin','Sebastian','Abigail','Nathan','Elena'];
		const lastNames = ['Smith','Johnson','Jones','Brown','Davis','Miller','Wilson','Moore','Anderson','Thomas','White','Harris','Martin','Thompson','Garcia','Martinez','Clark','Rodriguez','Lewis','Lee','Walker','Hall','Allen','Young','Hernandez','King','Wright','Lopez','Hill','Nelson','Turner','Phillips','Roberts','Campbell','Sanchez','Morgan','Murphy','Bailey','Cooper','Howard','Gray','Brooks','Price','Woods','Barnes','Henderson','Perry','Jenkins','Patterson','Hughes'];
		let id = 1;
		const newUserLists = [];
		for(id; id <= numberOfUsers; id++){
			newUserLists.push({
				id:id.toString(),
				name: firstNames[Math.floor(Math.random() * 50)] + " " + lastNames[Math.floor(Math.random() * 50)],
				gender: Math.round(Math.random()) ? 'Male' : 'Female',
				age: Math.floor(Math.random() * 100)+1,
			})
		}
		this.users = newUserLists;
	}
	//Find User base on id
	find(id) {
		return this.users.findIndex(user => user.id === id);
	}
	//Remove user
	remove(id) {
		const index = this.find(id);
		this.users.splice(index, 1)
	}
	//Save user
	save(id, info) {
		const index = this.find(id);
		this.users[index] = info;
	}
	//Add user
	add(info) {
		this.users.push(info);
	}
}
export default UserList;