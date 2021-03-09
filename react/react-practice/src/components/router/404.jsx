import React, { Component } from 'react';

import image404 from "../../images/404.jpg"
class NotFound extends Component {
	render() {
		return (
			<div>
				<img src={image404} alt=""/>
			</div>
		);
	}
}

export default NotFound;