import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';

const CategoryList = ({ categories }) => {
    console.log(categories.name);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const redirectToProducts = () => {
        setRedirect(true);
        const redirectUrl = `/product?categoryId=${categories.id}`
        setTimeout(() => {
            history.push(redirectUrl);
            console.log("HEREEEEEE");
        }, 100);
    }

    return <div className="d-block pl-3" onClick={redirectToProducts}>

        {categories.name}

    </div>
}

export default CategoryList;