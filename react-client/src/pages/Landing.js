import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchLanding } from '../store/actions';
import '../styles/Landing.scss';
import Auxil from '../hoc/Auxil';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadedItems: [],
			doneLoadingImages: false
		};
		this.images = [];
	}

	getDomImage = (node, post) => {
		this.images.push({ node, post });
	};

	componentDidMount() {
		this.props.fetchLanding();

		if (!this.doneLoadingImages) {
			this.loadAll();
		}
	}

	onLoad = newItem => {
		const newItems = [...this.state.loadedItems, newItem];

		this.setState({
			loadedItems: newItems
		});
	};

	loadAll = () => {
		let newItems = [];
		this.images.map(img => {
			if (img.node.complete) {
				newItems.push(img.post);
			}
		});

		const updateLoadedItems = [...this.state.loadedItems, ...newItems];
		this.setState({ loadedItems: updateLoadedItems, doneLoadingImages: true });
	};

	render() {
		return (
			<div className="Home">
				{this.props.data.map(post => {
					let content = (
						<div className="Placeholder" key={post.id}>
							<div className="Placeholder__Image">
								<img
									className="Hidden"
									src="https://newevolutiondesigns.com/images/freebies/fantasy-wallpaper-40.jpg"
									alt="image"
									ref={node => this.getDomImage(node, post)}
									onLoad={() => this.onLoad(post)}
								/>
							</div>
							<div className="Placeholder__text">
								<p>{post.body}</p>
							</div>
						</div>
					);

					if (this.state.loadedItems.find(loaded => loaded.id === post.id)) {
						content = (
							<div className="Post" key={post.id}>
								<div className="Post__Image">
									<img
										src="https://newevolutiondesigns.com/images/freebies/fantasy-wallpaper-40.jpg"
										alt="image"
									/>
								</div>
								<p>{post.body}</p>
							</div>
						);
					}
					return content;
				})}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	data: state.landing.data
});

const mapDispatchToProps = dispatch => ({
	fetchLanding: () => dispatch(fetchLanding())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);
