import { createRouter, createWebHistory } from 'vue-router'
import GoodsState from '@/views/GoodsState.vue'
import MachineState from '@/views/machines/MachineState.vue'
import Sales from '@/views/Sales.vue'
import Stats from '@/views/Stats.vue'
import AccountEdit from '@/views/AccountEdit.vue'
import Feedback from '@/views/Feedback.vue'
import IndexMachine from '@/views/machines/IndexMachine.vue'
import LoginView from '@/views/LoginView.vue'
import GoodsList from '@/views/GoodsList.vue'
import MachineShow from '@/views/machines/MachineShow.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/', component: IndexMachine },
  {
    path: '/machine/:id', // Динамический параметр :id
    name: 'showMachine',
    component: MachineShow,
    props: true, // Указываем, что маршрут должен передавать параметры как пропсы,
  },
  { path: '/goods-state', component: GoodsState },
  { path: '/goods-list', component: GoodsList },
  { path: '/machine-state', component: MachineState },
  { path: '/sales', component: Sales },
  { path: '/stats', component: Stats },
  { path: '/account-edit', component: AccountEdit },
  { path: '/feedback', component: Feedback },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
