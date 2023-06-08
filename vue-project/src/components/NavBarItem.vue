<template>
    <div>
        <a href="http://localhost:5173/">Home</a>
        <a href="http://localhost:5173/auth/login">Login</a>
        <a href="http://localhost:5173/auth/register">Register</a>
        <a href="http://localhost:5173/library/books">Booklist</a>
        <a href="http://localhost:5173/library/profile">Profile</a>

        <button @click="handleLogout">Logout</button>
    </div>
</template>
<script lang="ts">
export default {
    methods: {
        handleLogout(){
            localStorage.removeItem("accessToken");
            this.$router.push("/")
            }
    }
}

</script>

<style scoped>
div{
    background-color: palevioletred;
    height: 2rem;
    display: flex;
    justify-content: center;
    justify-content: space-around;
}

a{
    font-size: 1rem;
}

</style>