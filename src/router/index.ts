import { createRouter, createWebHistory } from 'vue-router'
import CoverView from '../views/CoverView.vue'
import InvitationView from '../views/InvitationView.vue'

const routes = [
  {
    path: '/',
    name: 'Cover',
    component: CoverView,
  },
  {
    path: '/invitation',
    name: 'Invitation',
    component: InvitationView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
