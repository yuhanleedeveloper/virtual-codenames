import Home from '../views/Home.view.vue';
import Codenames from '../views/Codenames.view.vue';
import Kings from '../views/Kings.view.vue';

export const router = {
  mode: 'history',
  routes: [
    { path: '', component: Home },
    { path: '/codenames', component: Codenames },
    { path: '/kings', component: Kings }
  ],
};
