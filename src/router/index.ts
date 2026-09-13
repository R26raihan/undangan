import { createRouter, createWebHistory } from 'vue-router'
import CoverView from '../views/CoverView.vue'
import VideoCoverView from '../views/VideoCoverView.vue'
import InvitationView from '../views/InvitationView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'Cover',
    component: VideoCoverView,
  },
  {
    path: '/cover-lama',
    name: 'CoverLama',
    component: CoverView,
  },
  {
    path: '/invitation',
    name: 'Invitation',
    component: InvitationView,
  },
  {
    path: '/dashboard-susiaris',
    name: 'Dashboard',
    component: DashboardView,
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
