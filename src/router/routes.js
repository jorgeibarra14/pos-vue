
import { Cookies } from 'quasar'
const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/pos', component: () => import('pages/pos/Pos.vue') },
      { path: '/productos', component: () => import('pages/catalogos/Productos.vue') },
    ],
    //beforeEnter: requireAuth
  },

  // Always leave this as last one,
  // but you can also remove it

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });
function requireAuth(to, from, next) {
  var value = Cookies.get('.quasarCookie')

  // var cookies = Cookies.all()
  // console.log(".AspNetCore.Identity.Application", value);
  console.log(value)
  if(value) {
    next();
  } else {
    window.location.href = '/'
  }
}

export default routes
