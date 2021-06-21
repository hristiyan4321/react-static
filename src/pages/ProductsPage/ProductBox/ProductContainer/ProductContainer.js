import React from 'react';
import './ProductContainer.css';

const ProductContainer = ({ product }) => {
    return (
        <div>
            <img className="product-image mt-3 mb-3" src={product?.product?.imageUrl} />
                <p>{product?.product?.name}</p>
                <p>{product?.product?.description}</p>
                <p>{product?.price} $</p>
                
                <input className="w-25" type="number" min="1" max={product?.quantityInStock}  value={product?.quantity} />

                <strong>Quantity {product?.quantityInStock}</strong>

                <hr />
        </div>
    )
}

export default ProductContainer;