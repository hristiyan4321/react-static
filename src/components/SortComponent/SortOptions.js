import React from 'react'

const SortOptions = ({ sortHandle, showPrice, showName }) => {

    return (
        <div className="text-left pl-3 mt-1">
            <form onChange={sortHandle}
              id="autoPost" className="btn btn-outline-success">
              <select name="sort" className="custom-select-sm drop">
                  <option value="">Original order</option>
                  <option value="CreatedASC">Order created by Ascending.</option>
                  <option value="No matter">Order created by Dscending.</option>

                  {showPrice !== undefined ? 
                  <option value="Price">Order by Price Ascending</option>
                  :null}

                  {showPrice !== undefined ? 
                  <option value="PriceDESC">Order by Price Descending</option>
                  :null}
                  
                  {showName !== undefined ? 
                  <option value="Name">Order by name Ascending</option>
                  :null}
                  
                  {showName !== undefined ? 
                  <option value="NameDESC">Order by name Descending</option>
                  :null}Name

                  
              </select>
            </form>
        </div>
    )
}

export default SortOptions;