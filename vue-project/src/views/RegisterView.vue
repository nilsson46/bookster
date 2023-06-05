<script lang="ts">
import { defineComponent } from 'vue';
import NavBarItem from '@/components/NavBarItem.vue';
import InputFieldItem from '@/components/InputFieldItem.vue';

//TODO handleRegister check so the username arent used.
//TODO button here as well? 

export default defineComponent({
    name: "RegisterView",
    components:{
        InputFieldItem,
        NavBarItem
    }
})

</script>

<template>
    <div>
        <nav>
            <NavBarItem/>
        </nav>
        <form action="">
            <InputFieldItem/>
            <button id="register-btn">Register</button>
        </form>
    </div>
</template>

<style scoped>

div{
    background-color: rgb(218, 170, 170);
}
#register-btn{
    margin-top: 1rem;
}
</style>