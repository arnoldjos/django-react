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
    path: '/dashboard',
    exact: true,
    page: 'Dashboard'
  },
  {
    path: '/signup',
    exact: true,
    page: 'Signup'
  },
  {
    path: '/login',
    exact: true,
    page: 'Login'
  }
];

export default routes;
