/**
* A view component that makes it possible for a user to register so they can use my awezome site.
*/


<script lang="ts">
import { defineComponent } from 'vue'
import NavBarItem from '@/components/NavBarItem.vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import { registerUser } from "@/service/registerService"

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
        //Check so the inpufields are filled out
        if (this.username.trim() === '' || this.password.trim() === '') {
          console.error('Username and password are required')
          return
        }
        //Post request
        const response = await registerUser(this.username, this.password)
        console.log(response)
        //Redirect if register i succedded.
        //TODO redirect to login maybe?
        this.$router.push('/auth/login')
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
    <div class="form-field">
    <form @submit.prevent="handleRegister">
        <h1>Register</h1>
      <InputFieldItem v-model:value="username" placeholder="Username" type="text" />
      <InputFieldItem v-model:value="password" placeholder="Password" type="password" />
      <button id="register-btn" type="submit">Register</button>
    
    </form>
    </div>
  </div>
</template>

<style scoped>

#register-btn {
  margin-top: 1rem;
  width: 161px;
  height: 1.5rem;
  margin: 1rem;

}
.form-field{
    display: flex;
    justify-content: center;
    align-items: center;
    
}
form{
    margin: 10rem;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(159, 192, 244);
    border-radius: 0.2rem;
}
</style>
