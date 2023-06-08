import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import BookListView from '@/views/BookListView.vue'
import ProfileListView from '@/views/ProfileListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    }, 
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView
    }, 
    {
      path: '/library/books',
      name: 'books',
      component: BookListView
    },
    {
      path: '/library/profile',
      name: 'profile',
      component: ProfileListView
    }

  ]
})

export default router
