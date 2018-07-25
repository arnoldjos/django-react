import { fetchLanding } from '../store/actions';

const routes = [
	{
		path: '/',
		page: 'Landing',
		exact: true,
		loadData: () => fetchLanding()
	},
	{
		path: '/about',
		exact: true,
		page: 'About'
	},
	{
		path: '/contact',
		exact: true,
		page: 'Contact'
	}
];

export default routes;
