import { fetchLanding } from '../store/actions';

const routes = [
  {
    path: '/',
    page: 'Landing',
    exact: true
  },
  {
    path: '/posts',
    page: 'Posts',
    loadData: () => fetchLanding()
  },
  {
    path: '/about',
    exact: true,
    page: 'About'
  },
  {
    path: '/signup',
    exact: true,
    page: 'Signup'
  }
];

export default routes;
