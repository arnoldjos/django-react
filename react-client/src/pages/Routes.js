import { fetchLanding } from '../store/actions';

const routes = [
  {
    path: '/',
    page: 'Landing',
    public: true,
    exact: true
  },
  {
    path: '/posts',
    page: 'Posts',
    public: false,
    loadData: () => fetchLanding()
  },
  {
    path: '/about',
    exact: true,
    public: true,
    page: 'About'
  },
  {
    path: '/dashboard',
    exact: true,
    public: false,
    page: 'Dashboard'
  },
  {
    path: '/signup',
    exact: true,
    public: true,
    page: 'Signup'
  },
  {
    path: '/login',
    exact: true,
    public: true,
    page: 'Login'
  }
];

export default routes;
