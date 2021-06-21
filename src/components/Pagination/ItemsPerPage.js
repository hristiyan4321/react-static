import React from 'react'
import { useHistory } from 'react-router';
import './itemsPerPage.css';

const ItemsPerPage= ({ currentPageNavigation, index, setCurrentPage, composeLink }) => {
    const history = useHistory();
    const SetCurrentPage = () => {
        setCurrentPage(index);
        history.push(composeLink + index);
    }

    return <li 
        className={currentPageNavigation === index
        ? "page-item active hover__cursor"
        : "page-item hover__cursor"}><span className="page-link" onClick={SetCurrentPage} >{index}</span></li>
}

export default ItemsPerPage;