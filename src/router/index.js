import { createRouter, createWebHistory } from 'vue-router'
import GoodsState from '@/views/GoodsState.vue'
import MachineState from '@/views/machines/MachineState.vue'
import Sales from '@/views/sales/Sales.vue'
import Stats from '@/views/Stats.vue'
import AccountEdit from '@/views/AccountEdit.vue'
import Feedback from '@/views/Feedback.vue'
import IndexMachine from '@/views/machines/IndexMachine.vue'
import LoginView from '@/views/LoginView.vue'
import GoodsList from '@/views/GoodsList.vue'
import MachineShow from '@/views/machines/MachineShow.vue'

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
  { path: '/goods-state', component: GoodsState, meta: { requiresAuth: true } },
  { path: '/goods-list', component: GoodsList, meta: { requiresAuth: true } },
  { path: '/machine-state', component: MachineState, meta: { requiresAuth: true } },
  { path: '/sales', component: Sales, meta: { requiresAuth: true } },
  { path: '/stats', component: Stats, meta: { requiresAuth: true } },
  { path: '/account-edit', component: AccountEdit, meta: { requiresAuth: true } },
  { path: '/feedback', component: Feedback, meta: { requiresAuth: true } },
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
