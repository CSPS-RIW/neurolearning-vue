import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Path from '../views/Path.vue'

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
    }
  ]
})

export default router
