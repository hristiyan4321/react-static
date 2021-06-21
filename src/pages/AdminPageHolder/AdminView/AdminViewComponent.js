import React, { Component } from 'react'
import { useHistory } from 'react-router'

const AdminViewComponent = (props) => {
    const history = useHistory();

    const redirectToParentCategoryComponent = () => {
        history.push("/admin/parentCategories")
    }

    const redirectToCategoryComponent = () => {
        history.push("/admin/categories");
    }

    const redirectToProductComponent = () => {
        history.push("/admin/products");
    }

    const redirectToOrdersComponent = () => {
        history.push("/admin/orders");
    }

    return (
        <div className="container-fluid bg-warning">
            
            <div className="pb-sm-3">
                
            <h4 className="text-secondary pt-2 text-center">
            Admin UI
            </h4>

                <div>

                    <button onClick={() => redirectToOrdersComponent()} className="btn btn-primary mr-1 ml-1">Orders</button>
                    <button onClick={() => redirectToProductComponent()} className="btn btn-primary mr-1 ml-1">Products</button>
                    <button onClick={() => redirectToCategoryComponent()} className="btn btn-primary mr-1 ml-1">Categories</button>
                    <button onClick={() => redirectToParentCategoryComponent()} className="btn btn-primary mr-1 ml-1">Parent categories</button>
                    
                </div>

            </div>
        </div>
    )
}

export default AdminViewComponent;