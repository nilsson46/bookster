<script lang="ts">
import {defineComponent} from "vue";
import InputFieldItem from '@/components/InputFieldItem.vue';
import NavBarItem from "@/components/NavBarItem.vue";
import axios from "axios";

//TODO handleLogin check with the users in the database and give a token. 
//TODO should buttons be like this? 

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
            try{
                const url = "http://localhost:3000/auth/login";
                const data = {
                    username: this.username,
                    password: this.password,
                };
                console.log("Request URL:", url);
                console.log("Request Data:", JSON.stringify(data));

                if (this.username.trim() === "" || this.password.trim() === "") {
                console.error("Username and password are required");
                return; // Stop further execution
                    }
                const response = await axios.post(url, data);
                const accessToken = response.data.accessToken;
                localStorage.setItem("accessToken", accessToken)

                

                this.$router.push("/library/books")
                console.log("Authentication succesfull")
            } catch(error) {
                console.error("Authentication error:", error.message)
            }
        
            
        }
    }
});
</script>
<template>
    <div>
        <nav>
            <NavBarItem/>
        </nav>
        <form @submit.prevent="handleLogin">
            <InputFieldItem v-model:value="username" label="Username" type="text" :value="username" />
            <InputFieldItem v-model:value="password" label="Password" type="password" :value="password" />
            <button id="login-btn" type="submit">Login</button>
        </form>
    </div>
</template>

<style>
#login-btn{
    margin-top: 1rem;
}
</style>