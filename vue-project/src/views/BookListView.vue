//TODO check what type of user are logged in. 
//TODO admin should POST /admin/books { "Author", "Title", "Quantity"} Ger statuskod 201 när en bok har lagts till. 
//TODO admin should  PUT /admin/books { "previous", "current" } Previous är en bok representerad med titel { "title" }
Current är den nya boken representerad med den data som önskas uppdateras {"?title", "?author", "?quantity"}? = optional.
Ger statuskod 201 när en bok har uppdaterats. 
//TODO admin should DELETE /admin/books { "Title" }
Ger statuskod 200 när en bok har tagits bort
Ger statuskod 404 om boken inte hittades



<script lang="ts">

import axios from 'axios';
import { defineComponent, ref, onMounted} from 'vue';
import BooksItem from "../components/BooksItem.vue"
import NavBarItem from '@/components/NavBarItem.vue';
import InputFieldItem from '@/components/InputFieldItem.vue';

export default defineComponent ({
    components: {
    BooksItem,
    NavBarItem,
    InputFieldItem,
},
    setup(){
        const books = ref([]);
        const searchInput = ref('');

        const showSearchedBooks = () => {
            const inputValue = searchInput.value.trim().toLowerCase();
            const URL = `http://localhost:3000/library/books/search?q=${inputValue}`;
            axios
                 .get(URL)
                 .then((response) => {
                    console.log(inputValue);
                    console.log(response.data.books);
                    books.value = response.data.books;
                 })
                 .catch((error) => {
                    console.log(error)
                 })
        }

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

        onMounted(showBooks)

        return {
            books,
            showBooks,
            showSearchedBooks,
            searchInput,
        };
    }
});


</script>

<template>
    <div>
        <nav>
            <NavBarItem/>
        </nav>
        <div class="search-field">
            <InputFieldItem
        :value="searchInput"
        @update:value="searchInput = $event"
        :label="''"
        :placeholder="'Search for a book'"/>
            <button @click="showSearchedBooks">Search</button>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Availability</th>
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.title">
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td class="quantity">{{ book.quantity }}</td>
                    </tr>               
                 </tbody>
            </table>
            
        </div>
    </div>
</template>

<style>
input{
    height: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
}
.search-field{
    width: 10rem;
    margin-left: 5rem;
}
table{
    width: 90%;
    margin-left: 4rem;
    margin-right: 4rem;
}
thead{
    background-color: lightblue;
    width: 100%;
}
.quantity{
    display: flex;
    justify-content: center;
}

th, td{
    padding: 0.5rem;
    background-color: rgb(183, 247, 247);
}
</style>