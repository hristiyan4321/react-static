import React from 'react';
import { useHistory } from 'react-router';

const PushToRoute = (param) => {
	const history = useHistory();
	
	history.push(`/${param}`);
	
	return <div>

	</div>
}

export default PushToRoute;