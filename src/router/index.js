import { createRouter, createWebHistory } from 'vue-router'
import GoodsState from '@/views/goods/GoodsState.vue'
import MachineState from '@/views/machines/MachineState.vue'
import Sales from '@/views/sales/Sales.vue'
import Stats from '@/views/Stats.vue'
import AccountEdit from '@/views/AccountEdit.vue'
import Feedback from '@/views/Feedback.vue'
import IndexMachine from '@/views/machines/IndexMachine.vue'
import LoginView from '@/views/LoginView.vue'
import GoodsList from '@/views/goods/GoodsList.vue'
import MachineShow from '@/views/machines/MachineShow.vue'
import UserEdit from '@/views/user/Edit.vue'
import UserRequisites from '@/views/user/UserRequisites.vue'
import Totals from '@/views/stats/Totals.vue'
import Register from '@/views/user/Register.vue'
import Proceeds from '@/views/stats/Proceeds.vue'
import Collections from '@/views/stats/Collections.vue'
import ForgotPassword from '@/views/user/ForgotPassword.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/', component: IndexMachine, meta: { requiresAuth: true } },
  {
    path: '/machine/:id', // Динамический параметр :id
    name: 'showMachine',
    component: MachineShow,
    props: true, // Указываем, что маршрут должен передавать параметры как пропсы,,
    meta: { requiresAuth: true },
  },
  { path: '/register', name: 'register', component: Register },
  { path: '/goods-state', component: GoodsState, meta: { requiresAuth: true } },
  { path: '/goods-list', component: GoodsList, meta: { requiresAuth: true } },
  { path: '/machine-state', component: MachineState, meta: { requiresAuth: true } },
  { path: '/stats/by-days', component: Totals, meta: { requiresAuth: true } },
  { path: '/sales', component: Sales, meta: { requiresAuth: true } },
  { path: '/stats', component: Stats, meta: { requiresAuth: true } },
  { path: '/stats/collections', component: Collections, meta: { requiresAuth: true } },
  // { path: '/account-edit', component: AccountEdit, meta: { requiresAuth: true } },
  { path: '/feedback', component: Feedback, meta: { requiresAuth: true } },
  { path: '/user/:id/edit', name: 'user.edit', component: UserEdit, meta: { requiresAuth: true } },
  {
    path: '/user/:id/requisites',
    name: 'user.requisites',
    component: UserRequisites,
    meta: { requiresAuth: true },
  },
  { path: '/stats/proceeds', name: 'proceeds', component: Proceeds, meta: { requiresAuth: true } },
  { path: '/forget-password/', name: 'forget-password', component: ForgotPassword },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
