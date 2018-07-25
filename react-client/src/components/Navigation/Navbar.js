import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

export default () => {
	return (
		<div className="nav">
			<Link to="/">Landing</Link>
			<Link to="/about">About</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/hello">Hello</Link>
		</div>
	);
};
