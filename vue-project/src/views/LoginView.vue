<script lang="ts">
import {defineComponent} from "vue";
import InputFieldItem from '@/components/InputFieldItem.vue';
import NavBarItem from "@/components/NavBarItem.vue";

//TODO handleLogin check with the users in the database and give a token. 

export default defineComponent({
    name:"LoginView",
    components:{
        InputFieldItem,
        NavBarItem
    },
});
</script>
<template>
    <div>
        <nav>
            <NavBarItem/>
        </nav>
        <form action="">
            <InputFieldItem/>
            <button id="login-btn">Login</button>
        </form>
    </div>
</template>

<style>
#login-btn{
    margin-top: 1rem;
}
</style>