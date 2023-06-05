//TODO Get all books. 
// TODO GET /library/books/search?q=query Query paramtern motsvarar en sökt boktitel. 
Observera att den skickas som en del av URL:n, /library/books/search?q=., 
ex. /library/books/search?q=night -- söker bok med "night" i titeln
Responsen är en lista med matchade böcker och ett verisonsnummer.
Vid tom "titel" så skickas alla böcker tillbaks som svar.


//TODO check what type of user are logged in. 
//TODO admin should POST /admin/books { "Author", "Title", "Quantity"} Ger statuskod 201 när en bok har lagts till. 
//TODO admin should  PUT /admin/books { "previous", "current" } Previous är en bok representerad med titel { "title" }
Current är den nya boken representerad med den data som önskas uppdateras {"?title", "?author", "?quantity"}? = optional.
Ger statuskod 201 när en bok har uppdaterats. 
//TODO admin should DELETE /admin/books { "Title" }
Ger statuskod 200 när en bok har tagits bort
Ger statuskod 404 om boken inte hittades

<template>
    <div>
        <div>
            <button id="show-books-btn" @click="showBooks"> Show books </button>
        </div>

        <div>
            <BooksItem v-for="book in books" :key="book.title" :book="book"/>
        </div>
    </div>
</template>

<script lang="ts">

import axios from 'axios';
import { defineComponent, ref } from 'vue';
import BooksItem from "../components/BooksItem.vue"

export default defineComponent ({
    components: {
    BooksItem
    },
    setup(){
        const books = ref([]);

        const showBooks = () => {
            const URL = "http://localhost:3000/library/books";
            axios
                .get(URL)
                .then((response) => {
                    console.log(response.data);
                    books.value = response.data.books;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        return {
            books,
            showBooks
        };
    }
});


</script>