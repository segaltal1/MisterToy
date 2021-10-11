import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { ToyApp } from './pages/toy-app.jsx'
import { ToyDetails } from './pages/toy-details.jsx'
import { ToyEdit } from './pages/toy-edit.jsx'
import { Dashboard } from './pages/dashboard.jsx'
import { Login } from './pages/login.jsx'
import { UserDetails } from './pages/user-details.jsx'

const routes = [
    {
        path: '/toy/details/:toyId',
        component: ToyDetails,
    },
    {
        path: '/toy/edit/:toyId',
        component: ToyEdit,
    },
    {
        path: '/toy/dashboard',
        component: Dashboard,
    },
    {
        path: '/toy',
        component: ToyApp,
    },
    {
        path: '/about',
        component: AboutUs,
    },
    {
        path: '/userdetails',
        component: UserDetails,
    },
    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/',
        component: HomePage,
    },
]

export default routes;