import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Loading from '../views/Loading'
import PageNotFound from '../views/PageNotFound'
import Store from '../store'
import Room from "../views/Room"
import Register from "../views/Register"
import PollView from "../views/PollView"
import Polls from "../views/Polls"

Vue.use(VueRouter)

// registo, login, listar salas, sala, etc.
// Home, login, registo, home/dashboard interna depois login com sucesso, sala, sala de espera, etc.

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      public: false,
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      public: true,  // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,  // Allow access to even if not logged in
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component: Loading,
    meta: {
      public: true,
    }
  },
  {
    path: '/room/:id',
    name: 'room',
    component: Room,
    props: true,
    meta: {
      public: false,
    }
  },
  {
    path: '/poll/:id',
    name: 'poll',
    component: PollView,
    props: true,
    meta: {
      public: false,
    }
  },
  {
    path: '/polls',
    name: 'polls',
    component: Polls,
    meta: {
      public: false,
    }
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
    meta: {
      public: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let validating = Store.getters["auth/validating"]
  if (validating && to.path != '/loading')
    return next({
      path: '/loading',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    })

  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  let loggedIn = Store.getters["auth/loggedIn"]

  if (!isPublic && !loggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return next({
      path: '/login',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    })
  }

  // Do not allow user to visit login page or register page if they are logged in
  else if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next();
})

export default router
