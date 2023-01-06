import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Path from '../views/Path.vue'
import Test from '../views/Test.vue'
import Intersectionality from '../views/Intersectionality.vue'

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
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/intersectionality',
      name: 'Intersectionality',
      component: Intersectionality
    }
  ]
})

export default router
