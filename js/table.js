// Libraries
import React, { Component, PropTypes } from 'react';

import UserList from './userList.js';

import Row from './row.js';

import Confirm from './confirm.js';

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:props.users,
            sortInOrder: false,
            currentPage: 1
        }
    }
    //Sort Users
    handleSortFunction(fieldName){
        const newUsers = Object.assign([],this.state.users);
        if(fieldName == 'age'){
            this.state.sortInOrder ? 
            newUsers.sort(function(a,b){
                return a[fieldName] - b[fieldName];
            })  :
            newUsers.sort(function(a,b){
                return b[fieldName] - a[fieldName];
            })       
            this.setState({users:newUsers, sortInOrder:!this.state.sortInOrder})
        }else{            
            const mapped = newUsers.map((el,i)=> {
            return {index:i,value:el[fieldName].toLowerCase()}
            });
            this.state.sortInOrder ? 
            mapped.sort(function(a,b){
                return +(a.value < b.value) || +(a.value === b.value) + 1;
            })  :
            mapped.sort(function(a,b){
                return +(a.value > b.value) || +(a.value === b.value) - 1;
            });
            let sortedUsers = mapped.map((el) =>{
                return newUsers[el.index];
            })               
            console.log(sortedUsers,this.state.users);          
            this.setState({users:sortedUsers, sortInOrder:!this.state.sortInOrder})
        }
    }
    //Pagination
    componentWillReceiveProps(nextProps) {
        this.setState({
        currentPage: 1
        })
    }
    getPage(){
        const newUsers = Object.assign([],this.state.users);
        let start = this.props.pageSize * (this.state.currentPage - 1);
        let end = start + this.props.pageSize;
        return {
            currentPage:this.state.currentPage,
            users: newUsers.slice(start,end),
            numPages: this.getNumPages(),
            handleClickOnPagination: function(pageNum) {
                return function() { this.handlePageChange(pageNum) }.bind(this)
            }.bind(this)
        }
    }
    getNumPages(){
        let numPages = Math.floor(this.props.users.length / this.props.pageSize)
        if(this.props.users.length % this.props.pageSize > 0){
            numPages++;
        }
        return numPages;
    }
    handlePageChange(pageNum) {
        this.setState({currentPage: pageNum})
    }
    render(){
        const order = this.state.sortInOrder ? 'ascending' : 'descending';
        let page = this.getPage();
        let users = page.users.map((user) =>
            <Row
                key={user.id}
                user={user}
                onSave={this.props.onSave}
                onRemove={this.props.onRemove}
            />
        )
        return(
            <div className="listUser">
                <table>
                    <thead>
                        <tr>
                            <td className={`name ${order}`}>
                                <span>Name</span>
                                <button className="sort-icon" onClick={(ev)=>this.handleSortFunction('name')}></button>
                            </td>
                            <td className={`gender ${order}`}>
                                <span>Gender</span>
                                <button className="sort-icon" onClick={(ev)=>this.handleSortFunction('gender')}></button>
                            </td>
                            <td className={`age ${order}`}>
                                <span>Age</span>
                                <button className="sort-icon" onClick={(ev)=>this.handleSortFunction('age')}></button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
                <div className="paging">
                    {pager(page)}
                </div>
            </div>
        )
    }           
}
Table.propTypes={
    users: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
}

function pager(page){
    let pageLinks = [];
    if(page.currentPage > 1){
        if(page.currentPage > 2){
            if(page.currentPage > 3){
            pageLinks.push(<span key={1} onClick={page.handleClickOnPagination(1)}>...</span>);
            pageLinks.push(' ');
            }            
            pageLinks.push(<span key={page.currentPage - 2} onClick={page.handleClickOnPagination(page.currentPage - 2)}>{page.currentPage - 2}</span>);
            pageLinks.push(' ');
        }
        pageLinks.push(<span key={page.currentPage - 1} onClick={page.handleClickOnPagination(page.currentPage - 1)}>{page.currentPage - 1}</span>);
        pageLinks.push(' ');
    }
    pageLinks.push(<span key={page.currentPage} className="currentPage">  {page.currentPage}</span>)
    if(page.currentPage < page.numPages){
        pageLinks.push(' ');
        pageLinks.push(<span key={page.currentPage + 1} onClick={page.handleClickOnPagination(page.currentPage + 1)}>{page.currentPage + 1}</span>)
        if(page.currentPage < page.numPages - 1){
            pageLinks.push(' ');
            pageLinks.push(<span key={page.currentPage + 2} onClick={page.handleClickOnPagination(page.currentPage + 2)}>{page.currentPage + 2}</span>)
            if(page.currentPage < page.numPages - 2){
            pageLinks.push(' ');
            pageLinks.push(<span key={page.numPages} onClick={page.handleClickOnPagination(page.numPages)}>...</span>)
            }
        }
    }
    return <div className="pagination">{pageLinks}</div>
}

export default Table;