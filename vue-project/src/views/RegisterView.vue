<script lang="ts">
import { defineComponent } from 'vue'
import NavBarItem from '@/components/NavBarItem.vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import axios from 'axios'

//TODO handleRegister check so the username arent used.
//TODO button here as well?

export default defineComponent({
  name: 'RegisterView',
  components: {
    InputFieldItem,
    NavBarItem
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    //TODO move this to registerService!
    // handles the registration
    async handleRegister() {
      try {
        const url = 'http://localhost:3000/auth/register'
        const data = {
          username: this.username,
          password: this.password
        }
        console.log('Request URL:', url)
        console.log('Request data:', JSON.stringify(data))
        //Check so the inpufields are filled out
        if (this.username.trim() === '' || this.password.trim() === '') {
          console.error('Username and password are required')
          return
        }
        //Post request
        const response = await axios.post(url, data)
        console.log(response)
        //Redirect if register i succedded.
        //TODO redirect to login maybe?
        this.$router.push('/library/books')
        console.log('Register succesfull')
      } catch (error: any) {
        console.error('Register error:', error.message)
      }
    }
  }
})
</script>

<template>
  <div>
    <nav>
      <NavBarItem />
    </nav>
    <form @submit.prevent="handleRegister">
      <InputFieldItem v-model:value="username" placeholder="Username" type="text" />
      <InputFieldItem v-model:value="password" placeholder="Password" type="password" />
      <button id="register-btn" type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
div {
  background-color: rgb(218, 170, 170);
}
#register-btn {
  margin-top: 1rem;
}
</style>
