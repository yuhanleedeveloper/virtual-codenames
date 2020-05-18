import Home from '../views/Home.view.vue';
import Codenames from '../views/Codenames.view.vue';
import Kings from '../views/Kings.view.vue';
import PageNotFound from '../views/PageNotFound.view.vue';

export const router = {
  mode: 'history',
  routes: [
    { path: '/404', component: PageNotFound },
    { path: '*', redirect: '/404' },
    { path: '/', component: Home },
    { path: '/codenames', component: Codenames },
    { path: '/kings', component: Kings }
  ]
};
