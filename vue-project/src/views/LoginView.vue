<script lang="ts">
import {defineComponent} from "vue";
import InputFieldItem from '@/components/InputFieldItem.vue';
import NavBarItem from "@/components/NavBarItem.vue";
import {getUserRole} from "@/components/TokenItem.vue";
import { login } from "../service/AuthService" 

export default defineComponent({
    name:"LoginView",
    components:{
        InputFieldItem,
        NavBarItem
    },
    data(){
        return {
            username: "",
            password: "",
        };
    },
    methods:{
        async handleLogin(){
            // Cheks if the username and the password are filled in in the InputFields
            if (this.username.trim() === "" || this.password.trim() === "") {
                console.error("Username and password are required");
                return; // Guardian class always in the start or end of the code.
                    }
            //TODO Move this to isAdmin! 
            try{ 
                //Call the login function to do the login API request
                const accessToken = await login(this.username, this.password)
                // Set the token to localStorage
                localStorage.setItem("accessToken", accessToken)
                //Get the role from the token
                const userRole = getUserRole();
                // Redirects deppending on the role
                if(userRole === "ADMIN") {
                    this.$router.push("/admin/books")
                    console.log(userRole);
                } else if (userRole === "USER") {
                this.$router.push("/library/books");
                console.log(userRole);
                } else{
                    console.log(userRole);
                }
                console.log("Authentication succesfull")
            } catch(error: any) {
                console.error("Authentication error:", error.message)
            }
        
            
        },
        proceedAsGuest() {
        this.$router.push("/guest/books");
  },
    },
    
});
</script>
<template>
    <div>
        <nav>
            <NavBarItem/>
        </nav>
        <div class="form">
            <form class="login-form" @submit.prevent="handleLogin">
                <h1>Login</h1>
                <InputFieldItem v-model:value="username" type="text" placeholder="Username..." />
                <InputFieldItem v-model:value="password" type="password" placeholder="Password..."/>
                <p>No account? Sign up <a href="http://localhost:5173/auth/register">here!</a></p>
                <button class="form-btn" id="login-btn" type="submit">Login</button>
                <button class="form-btn" id="proceed-as-guest-btn" @click="proceedAsGuest">Proceed as guest user</button>
            </form>
        </div>
        
    </div>
</template>
<style>
#login-btn{
    margin-top: 1rem;
}
.form-btn{
    width: 100%;
    margin-top: 1rem;
}
.form{
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10rem;
    background-color: lightblue;
    width: 400px;
    padding: 1rem;
}
</style>