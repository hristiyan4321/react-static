import React from 'react'
import { Link } from 'react-router-dom';
import ItemsPerPage from './ItemsPerPage';

const PaginationComponent  = ({currentPageNavigation, setCurrentPage, itemsPerPage, composeLink }) => {
    let arr = [];
    // let targetPage = "";

    // // check if link is provided.
    // if (composeLink !== undefined && composeLink.length > 0) {   
    //     if (composeLink.includes("?")) {
    //         targetPage = "?taergetPage="
    //     } else {
    //         targetPage = "&targetPage=";
    //     }
    // }

    // Fills the array with number of pages.
    for (let i = 0; i < itemsPerPage; i++) {
         arr.push(i);
    }

    // Dont show if there is one or less.
    if (itemsPerPage <= 1) {
        return null;
    }

    return <div className="d-flex justify-content-center">
        <div>
            <div aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={currentPageNavigation <= 1
                        ? "page-item disabled"
                        : "page-item hover__cursor"
                        }><Link to={composeLink + (currentPageNavigation - 1)} className="page-link " onClick={() => setCurrentPage(currentPageNavigation - 1)} >Previous</Link></li>

                        {arr.map((data, index) => {
                            return <ItemsPerPage
                                key={index}
                                currentPageNavigation={currentPageNavigation}
                                setCurrentPage={setCurrentPage}
                                index={index + 1}
                                composeLink={composeLink}
                            />
                        })}

                    <li className={currentPageNavigation >= itemsPerPage
                        ? "page-item disabled"
                        : "page-item hover__cursor"
                    }><Link to={composeLink + (currentPageNavigation + 1)} className="page-link" onClick={() => setCurrentPage(currentPageNavigation + 1)} >Next</Link></li>
                </ul>
            </div>
        </div>
    </div>

}

export default PaginationComponent;