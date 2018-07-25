import React, { Component } from 'react';

import '../styles/About.scss';
import Spinner from '../components/UI/ImageSpinner/ImageSpinner';

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bannerLoaded: false
		};
		this.banner = React.createRef();
	}

	componentDidMount() {
		const image = this.banner.current;
		if (image.complete) {
			this.onLoad();
		}
	}

	onLoad = () => {
		if (!this.state.bannerLoaded) {
			this.setState({ bannerLoaded: true });
		}
	};

	render() {
		return (
			<div className="About">
				<div className="banner">
					{this.state.bannerLoaded ? (
						<img
							src="http://s1.1zoom.me/b3963/870/The_Legend_of_Zelda_Mountains_Warriors_Scenery_516269_2560x1080.jpg"
							alt="image"
						/>
					) : (
						<div>
							<Spinner />
							<img
								className="Hidden"
								src="http://s1.1zoom.me/b3963/870/The_Legend_of_Zelda_Mountains_Warriors_Scenery_516269_2560x1080.jpg"
								alt="image"
								ref={this.banner}
								onLoad={this.onLoad}
							/>
						</div>
					)}
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
					blanditiis possimus repudiandae cum delectus reprehenderit impedit
					veniam! Nostrum, obcaecati sequi!
				</p>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
					minima ut quam rem. Non rem illum facere perferendis modi pariatur!
				</p>
			</div>
		);
	}
}

export default About;
