import React from 'react'
import { useHistory } from 'react-router'

const BackToProfile = ({ url }) => {
    const history = useHistory();
    const back = () => {
        debugger
        if (url !== undefined && url !== null) {
            history.push(url);
        } else {
            history.push('/profile');
        }
    }

    return (
        <div>
            <button className="btn btn-secondary" onClick={back} >Back</button>
        </div>
    )
}

export default BackToProfile;