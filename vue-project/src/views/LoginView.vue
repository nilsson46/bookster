/**
* A view component that makes it possible for a user to login to use my amazing website
*/

<script lang="ts">
import { defineComponent } from 'vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import NavBarItem from '@/components/NavBarItem.vue'
import { isAdmin } from '@/utils/isAdmin'
import { login } from '../service/AuthService'

export default defineComponent({
  name: 'LoginView',
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
    async handleLogin() {
      // Cheks if the username and the password are filled in in the InputFields
      if (this.username.trim() === '' || this.password.trim() === '') {
        console.error('Username and password are required')
        return // Guardian class always in the start or end of the code.
      }
      //TODO Move this to isAdmin!
      try {
        //Call the login function to do the login API request
        const accessToken = await login(this.username, this.password)
        // Set the token to localStorage
        localStorage.setItem('accessToken', accessToken)

        // Redirects deppending on the role
        if (isAdmin()) {
          this.$router.push('/admin/books')
          console.log('Admin user logged in')
        } else {
          this.$router.push('/library/books')
          console.log('Guest user logged in')
        }
        console.log('Authentication successful')
      } catch (error: any) {
        console.error('Authentication error:', error.message)
      }
    },
    proceedAsGuest() {
      this.$router.push('/guest/books')
    }
  }
})
</script>
<template>
  <div>
    <nav>
      <NavBarItem />
    </nav>
    <div class="form">
      <form class="login-form" @submit.prevent="handleLogin">
        <h1>Login</h1>
        <div class="input-form">
            <div class="field-arround-input">
                <InputFieldItem class="input-field" v-model:value="username" type="text" placeholder="Username..." />
                <InputFieldItem class="input-field" v-model:value="password" type="password" placeholder="Password..." />
            </div>
            <p>No account? Sign up <a href="http://localhost:5173/auth/register">here!</a></p>
        </div>
        <button class="form-btn" id="login-btn" type="submit">Login</button>
        <button class="form-btn" id="proceed-as-guest-btn" @click="proceedAsGuest">
          Proceed as guest user
        </button>
      </form>
    </div>
  </div>
</template>
<style>

#login-btn {
  margin-top: 1rem;

}
.form-btn {
 padding: 0.5rem;
 width: 50%;
  margin-top: 1rem;
  background-color: rgb(247, 247, 215);
  border-radius: 0.2rem;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10rem;
  background-color: rgb(159, 192, 244);
  width: 400px;
  padding: 1rem;
  border-radius: 0.3rem;
}
.input-form{
    width: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

}
input{
    width: 90%;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.2rem;
    border: solid 1.5px rgba(0, 0, 0, 0.551);
}
.field-arround-input{
    width:100%;
}
p{
    font-size: 18px;
}

</style>
