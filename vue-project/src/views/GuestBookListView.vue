/**
* A view component that shows all books to a guest. 
*/

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Book } from '../model/book'
import NavBarItem from '@/components/NavBarItem.vue'
import InputFieldItem from '@/components/InputFieldItem.vue'
import { searchBooks, getBooks, orderBook } from '../service/bookservice'

//Define the vue components.
export default defineComponent({
  components: {
    NavBarItem,
    InputFieldItem
  },
  setup() {
    //Reactive variables via ref.Holding a array of Book
    const books = ref<Book[]>([])
    const searchInput = ref('')
    //Searches for books based on the inputfield.
    const showSearchedBooks = () => {
      const inputValue = searchInput.value
      searchBooks(inputValue)
        .then((searchedBooks) => {
          books.value = searchedBooks
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //Calls the getBooks from bookService to recieve all books from the backend
    const showBooks = () => {
      getBooks()
        .then((responseBooks) => {
          books.value = responseBooks
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // Check the quantity that are ordered in the backend and if it's available then the showBooks function reloads the list. Otherwise error
    const orderSelectedBook = (book: Book) => {
      const quantity = book.orderQuantity
      if (quantity && quantity > 0) {
        orderBook(book.title, quantity)
          .then(() => {
            book.orderQuantity = undefined
            console.log(quantity)

            showBooks()
          })
          .catch((error) => {
            console.error('An error occured while ordering the book', error)
          })
      }
    }
    //Execute the showbooks when the component is mounted.
    onMounted(showBooks)

    return {
      books,
      showBooks,
      showSearchedBooks,
      searchInput,
      orderSelectedBook
    }
  }
})
</script>

<template>
  <div>
    <nav>
      <NavBarItem />
    </nav>
    <div class="search-field">
      <InputFieldItem
        v-model:value="searchInput"
        :placeholder="'Search for a book'"
        @update:value="showSearchedBooks"
      />
    </div>
    <div class="book-table">
      <table>
        <thead>
          <tr class="headers">
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
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
.book-table {
  display: flex;
  justify-content: center;
}
.search-field{
    width: 15rem;
    display: flex;
  justify-content: center;
  margin-left: 16.5rem;
  margin-bottom: 1rem;
}
td,
th {
  background-color: rgb(159, 192, 244);
  height: 2rem;
}
</style>
