<script lang="ts">
import { defineComponent, ref, onMounted} from 'vue';
import type { Book } from "../components/BooksItem.vue"
import NavBarItem from '@/components/NavBarItem.vue';
import InputFieldItem from '@/components/InputFieldItem.vue';
import { getUserRole } from '@/components/TokenItem.vue';
import { isAdmin } from '@/utils/isAdmin';
import { useRouter } from "vue-router"
import { searchBooks, getBooks, deleteBook, orderBook } from '../service/bookservice';
import AddBookModal from '@/components/AddBookModal.vue';
export default defineComponent ({
    components: {

    NavBarItem,
    InputFieldItem,
    AddBookModal
},
    setup(){
        const router = useRouter();
        const books = ref<Book[]>([]);
        const searchInput = ref('');
        const selectedBook = ref<Book | null>(null);
        const isAddModalVisible = ref(false);
        const apiToken = localStorage.getItem("accessToken");

        // Function to show searched books based on search input
        const showSearchedBooks = () => {
            const inputValue = searchInput.value;
            searchBooks(inputValue)
                .then((searchedBooks) => {
                    books.value = searchedBooks;
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        //Get the Books from the backend via a api call.
        const showBooks = () => {
      getBooks()
        .then((responseBooks) => {
          books.value = responseBooks;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //Check so the orderQuantity is > 0. Then the api request is called. 
    const orderSelectedBook = (book: Book) => {
        const quantity = book.orderQuantity;
        if(quantity && quantity > 0) {
            orderBook(book.title, quantity)
            .then(() => {
                book.orderQuantity = undefined;
                showBooks();
            })
        .catch((error) => {
            console.error("An error occured while ordering the book", error);
            
        })
    }
}
    const showAddModal = () => {
        isAddModalVisible.value = true;
    }
    /*const hideAddModal = () => {
        isAddModalVisible.value = false;
    }; */

    const handleBookAdded = () => {
        isAddModalVisible.value = false;
      showBooks();
    };
    
    //Check so the title matches and remove the book or books from the array with the same title. 
    const deleteSelectedBook = (book: Book) => {
        deleteBook(book.title)
      .then(() => {
        //If the title doesnt match it will pass the filter.
        books.value = books.value.filter((b) => b.title !== book.title);
        selectedBook.value = null;
        showBooks();
      })
      .catch((error) => {
        console.error('An error occurred while deleting the book', error);
      });
  }
        

        if(!isAdmin()){
            router.push("/library/books");
            console.log("Redirected to non-admin page");
            }

        onMounted(showBooks)

        return {
            books,
            showBooks,
            showSearchedBooks,
            searchInput,
            selectedBook,
            showAddModal,
            apiToken,
            handleBookAdded,
            isAddModalVisible,
            deleteSelectedBook,
            orderSelectedBook,
        };
    }
});


</script>

<template>
    <div>
        <nav>
            <NavBarItem/>
        </nav>

        //TODO should do a search everytime when the inputfield changes!
        <div class="search-field">
            <InputFieldItem
            v-model:value="searchInput"
            :placeholder="'Search for a book'"
          />
            <button @click="showSearchedBooks">Search</button>
        </div>
        <div class="add-btn">
            <button @click="showAddModal">Add new book</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Availability</th>
                        <th>Order</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.title">
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td class="quantity">{{ book.quantity }}</td>
                        <td> <input type="number" v-model="book.orderQuantity" min="1" />
                            <button @click="orderSelectedBook(book)">Order</button></td>
                            <td>
                            <button>Edit</button>
                            <button @click="deleteSelectedBook(book)">Delete</button>
                          </td>
                    </tr>               
                 </tbody>
            </table>
            <div class="modal-overlay" v-if="isAddModalVisible">
                <div class="modal-content">
                  <add-book-modal :token="apiToken" @bookAdded="handleBookAdded" />
                </div>
              </div>
        
</div>
</div>
</template>

<style scoped>
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


.books-page {
  position: relative;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
}

.books-list {
  position: relative;
  z-index: 1;
  margin-top: 2rem;
}

</style>