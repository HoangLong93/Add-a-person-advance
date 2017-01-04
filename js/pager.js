import React, { Component, PropTypes } from 'react';

class Pager extends Component {
    render() {
        const page = this.props.page;
        let pageLinks = [];
        if (page.currentPage > 1) {
            if (page.currentPage > 2) {
                if (page.currentPage > 3) {
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
        if (page.currentPage < page.numPages) {
            pageLinks.push(' ');
            pageLinks.push(<span key={page.currentPage + 1} onClick={page.handleClickOnPagination(page.currentPage + 1)}>{page.currentPage + 1}</span>)
            if (page.currentPage < page.numPages - 1) {
                pageLinks.push(' ');
                pageLinks.push(<span key={page.currentPage + 2} onClick={page.handleClickOnPagination(page.currentPage + 2)}>{page.currentPage + 2}</span>)
                if (page.currentPage < page.numPages - 2) {
                    pageLinks.push(' ');
                    pageLinks.push(<span key={page.numPages} onClick={page.handleClickOnPagination(page.numPages)}>...</span>)
                }
            }
        }
        return (
            <div className="pagination">{pageLinks}</div>
        )
    }
}

Pager.PropTypes = {
    page: PropTypes.object.isRequired
}

export default Pager;