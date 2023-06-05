<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    mounted(){
        const URL = "http://localhost:3000/library/books"

        axios.get(URL)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) =>{
            console.log(error)
        });
    },

});

</script>

<template>
    <div>
        <BooksItem v-for="book in books" :key"book.id" :book="book"></BooksItem>
    </div>
</template>