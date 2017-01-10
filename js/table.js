// Impor Libraries
import React, { Component, PropTypes } from 'react';

// Import Component
import UserList from './userList.js';
import Row from './row.js';
import Confirm from './confirm.js';
import Pager from './pager.js';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            sortInOrder: false,
            currentPage: 1
        }
    }
    //Sort Users
    handleSortFunction(fieldName) {
        const newUsers = [...this.state.users];
        const sortInOrder = this.state.sortInOrder ? 1 : -1;
        newUsers.sort((a, b) => {            
            let fieldA = a[fieldName];
            let fieldB = b[fieldName];
            if (typeof fieldA === 'string') fieldA = fieldA.toLowerCase();
            if (typeof fieldB === 'string') fieldB = fieldB.toLowerCase();
            if (fieldA < fieldB) return sortInOrder * 1
            else if (fieldA === fieldB) return 0
            else return sortInOrder * -1
        })

        this.setState({ users: newUsers, sortInOrder: !this.state.sortInOrder })
    }
    //Pagination
    getPage() {
        const newUsers = Object.assign([], this.state.users);
        let start = this.props.pageSize * (this.state.currentPage - 1);
        let end = start + this.props.pageSize;
        return {
            currentPage: this.state.currentPage,
            users: newUsers.slice(start, end),
            numPages: this.getNumPages(),
            handleClickOnPagination: pageNum => () => this.handlePageChange(pageNum)
        }
    }
    getNumPages() {
        let numPages = Math.floor(this.props.users.length / this.props.pageSize)
        if (this.props.users.length % this.props.pageSize > 0) {
            numPages++;
        }
        return numPages;
    }
    handlePageChange(pageNum) {
        this.setState({ currentPage: pageNum })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: 1
        })
    }
    render() {
        console.log(this.state.users)
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
        return (
            <div className="listUser">
                <table>
                    <thead>
                        <tr>
                            <th className={`name ${order}`}>
                                <span>Name</span>
                                <button className="sort-icon" onClick={(ev) => this.handleSortFunction('name')}></button>
                            </th>
                            <th className={`gender ${order}`}>
                                <span>Gender</span>
                                <button className="sort-icon" onClick={(ev) => this.handleSortFunction('gender')}></button>
                            </th>
                            <th className={`age ${order}`}>
                                <span>Age</span>
                                <button className="sort-icon" onClick={(ev) => this.handleSortFunction('age')}></button>
                            </th>
                            <th className="edit">
                            </th>
                            <th className="delete">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
                <div className="paging">
                    <Pager page={page} />
                </div>
            </div>
        )
    }
}
Table.propTypes = {
    users: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
}

export default Table;