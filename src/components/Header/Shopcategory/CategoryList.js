import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import './CategoryList.css';

const CategoryList = ({ categories, setLoadAgain }) => {
    console.log(categories.name);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    const redirectToProducts = () => {
        setRedirect(true);
        setLoadAgain(true);
        const redirectUrl = `/product?categoryId=${categories.id}`
        history.push("/");
        setTimeout(() => {
            history.push(redirectUrl);
            // console.log("HEREEEEEE");
        }, 100);
    }

    return <div className="d-block pl-3 make-link" onClick={redirectToProducts}>

        {categories.name}

    </div>
}

export default CategoryList;