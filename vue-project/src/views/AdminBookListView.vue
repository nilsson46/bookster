<script lang="ts">
import { defineComponent, ref, onMounted} from 'vue';
import type { Book } from "../components/BooksItem.vue"
import NavBarItem from '@/components/NavBarItem.vue';
import InputFieldItem from '@/components/InputFieldItem.vue';
import { getUserRole } from '@/components/TokenItem.vue';
import { useRouter } from "vue-router"
import { searchBooks, getBooks, addBook, deleteBook } from '../service/bookservice';
import addBookModal from '@/components/AddBookModal.vue';
export default defineComponent ({
    components: {
    //BooksItem,
    NavBarItem,
    InputFieldItem,
    //EditBooksItem,
    addBookModal
},
    setup(){
        const router = useRouter();
        const books = ref<Book[]>([]);
        const searchInput = ref('');
        const showEditItem = ref(false);
        const selectedBook = ref<Book | null>(null);
        const isAddModalVisible = ref(false);
        const apiToken = localStorage.getItem("accessToken");

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
        const showBooks = () => {
      getBooks()
        .then((responseBooks) => {
          books.value = responseBooks;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    

    const addNewBook = (newBook) => {
        addBook(newBook)
        .then(() => {
            books.value.push(newBook);
            hideAddModal();
            showBooks();
        })
        .catch((error) => {
            console.error('An error occurred while adding the book', error);
        });
    };

    const showAddModal = () => {
        isAddModalVisible.value = true;
    }
    const hideAddModal = () => {
        isAddModalVisible.value = false;
    };

    const handleBookAdded = () => {
      showBooks();
    };
    
    const deleteSelectedBook = (book) => {
        deleteBook(book.title)
      .then(() => {
        books.value = books.value.filter((book) => book.title !== book.title);
        selectedBook.value = null;
        showBooks();
      })
      .catch((error) => {
        console.error('An error occurred while deleting the book', error);
      });
  }


    const showEditBooksItem = (book: Book | null) => {
      selectedBook.value = book;
      showEditItem.value = true;
    };

    const hideEditBooksItem = () => {
      selectedBook.value = null;
      showEditItem.value = false;
    }; 

       
//TODO Maybe move this to a service? 
        const isAdmin = () => {
            let userRole = getUserRole();
            return userRole === "ADMIN";
        }

        if(!isAdmin()){
            router.push("/library/books");
            console.log("Redirected to non-admin page");
            
        }

        onMounted(showBooks)
        
       /* const addNewBook = (newBook) => {
  addBook(newBook)
    .then(() => {
      books.value.push(newBook);
      hideEditBooksItem();
    })
    .catch((error) => {
      console.error("An error occurred while adding the book", error);
    });
}; */

        return {
            books,
            showBooks,
            showSearchedBooks,
            searchInput,
            showEditItem,
            selectedBook,
           // showEditBooksItem,
            //hideEditBooksItem,
            showAddModal,
            apiToken,
            handleBookAdded,
            isAddModalVisible,
            deleteSelectedBook,
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
                        <td><button>Order</button></td>
                        <td>
                            <button>Edit</button>
                            <button @click="deleteSelectedBook(book)">Delete</button>
                          </td>
                    </tr>               
                 </tbody>
            </table>
            <add-book-modal v-if="showAddModal" :token="apiToken" @bookAdded="handleBookAdded" />
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