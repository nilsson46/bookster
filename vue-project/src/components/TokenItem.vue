<script lang="ts">

export default {
    name: 'TokenComponent',
    data(){
        return {
            role: null
        };
    },

    mounted(){
        const token = localStorage.getItem("accessToken")

        if(token){
        const splittedToken = token.split('.')

        const decodedToken = atob(splittedToken[1]);

        const payload = JSON.parse(decodedToken);
        this.role = payload.role;

        console.log("Role:", this.role);
        } else {
            console.log("Token not found in localStorage");
            this.role="GUEST"
     }
        
}}

</script>

<template>
    <div>
        <h1>{{ role }}</h1>
    </div>
</template>