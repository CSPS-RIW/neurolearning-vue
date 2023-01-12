import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Path from '../views/Path.vue';
import Xd from '../views/Xd.vue';
import Branch from '../views/BranchingScenario.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/path',
      name: 'Path',
      component: Path
    },
    {
      path: '/xd',
      name: 'Xd',
      component: Xd
    },
    {
      path: '/branch',
      name: 'Branch',
      component: Branch
    }
  ]
})

export default router
