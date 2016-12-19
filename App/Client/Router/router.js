import Vue from 'vue';
import VueRouter from 'vue-router';

import landingPage from '../Components/landingPageController.js';
import admin from '../Components/adminController.js';
import video from '../Components/videoController.js';
import signup from '../Components/signupController.js';
import profile from '../Components/profileController.js';
import profileCreate from '../Components/profileCreationController.js';
import blank from '../Templates/blank.vue';
import store from '../store.js';
import events from '../Components/eventsController.js';
import activeDate from '../Components/activeDateController.js';
import myProfile from '../Components/myProfileController.js';
import auth from '../Auth/auth.js';

var routes = [
  {
    path: '/',
    component: landingPage
  },
  {
    path: '/video',
    component: activeDate
  },
  {
    path: '/Admin',
    component: admin
  },
  {
    path: '/myprofile/:id',
    component: blank,
    children: [{
                path: 'edit',
                component: profileCreate,
                meta: { requiresAuth: true }
              },
              {
                path: '',
                component: myProfile,
                meta: { requiresAuth: true }
              }]
  },
  {
    path: '/profile/:id',
    meta: { requiresAuth: true },
    component: profile
  },
  {
    path: '/events/:id',
    component: blank,
    meta: { requiresAuth: true },
    children: [{
                path: '',
                component: events
              }]
  },
  {
    path: '/date/:dateid',
    meta: { requiresAuth: true },
    component: blank,
    children: [{
                path: 'active',
                component: activeDate
              }]
  }
];

var router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => { 
  auth.checkAuth()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("TOFROMNEXT",to, from, next)
    if (!auth.user.isAuth) {
      console.log('isAuth?', auth.user.isAuth)
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      // auth.user.isAuth = true;
      console.log('isAuth?(else)', auth.user.isAuth)
      // to.store.state.user = from.store.state.user;
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;

//we are not refreshing state to get changes on user between pages, if they are already logged in.
//refactor later to set flags on certain routes that require updated user info
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     Vue.http.post('auth/authorize')
//       .then((res) => {
//         console.log("AUTHORIZE", res);
//         store.commit('setUser', res.body);
//         store.commit('setSavedEvents', res.body.events);
//         next();
//       })
//       .catch((res) => {
//         window.alert('you must log in to do that');
//         next(false);
//       });
//   } else {
//     next(); // make sure to always call next()!
//   }
//   if (to.matched.some(record => record.meta.requiresAdmin)) {
//     console.log('requres admin', store.state.user);
//     if (store.state.user) {
//       console.log('logged in');
//       if (store.state.user.admin) {
//         console.log('logged in as admin');
//         next();
//       } else {
//         console.log('logged in but no admin');
//         next({
//           path: '/'
//         });
//       }
//     } else {
//       console.log('not logged in');
//       next({
//         path: '/'
//       }
//       );
//     }

//   }
// });

