<template>
    <div class="modal">
      <div class="modal-content">
        <h2>{{ mode === 'add' ? 'Add Book' : 'Edit Book' }}</h2>
        <form @submit.prevent="handleSubmit">
          <InputFieldItem
            v-model="book.author"
            :label="'Author:'"
            :type="'text'"
            :required="true"
            :value="book.author"
          />
          <InputFieldItem
            v-model="book.title"
            :label="'Title:'"
            :type="'text'"
            :required="true"
            :value="book.title"
          />
          <InputFieldItem
            v-model="book.quantity"
            :label="'Quantity:'"
            :type="'number'"
            :required="true"
            :value="book.quantity"
          />
  
          <div class="buttons">
            <button type="submit">{{ mode === 'add' ? 'Add' : 'Save' }}</button>
            <button @click="handleCancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type { Book } from './BooksItem.vue';
  import InputFieldItem from './InputFieldItem.vue';
  import axios from 'axios';
  import { addBook, editBook } from "../service/bookservice";
  
  export default defineComponent({
    components: {
      InputFieldItem,
    },
    props: {
      mode: {
        type: String,
        required: true,
        default: 'add',
      },
      initialBook: {
        type: Object,
        required: true,
        default: null
      },
      books: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        book: {
          author: '',
          title: '',
          quantity: 0,
        } as Book,
      };
    },
    mounted() {
      if (this.mode === "edit" && this.initialBook) {
        this.book = { ...this.initialBook };
      }
    },
    methods: {
      async handleSubmit() {
        if (this.mode === 'add') {
          try {
            this.$emit("addBook", this.book)
          } catch (error) {
            console.log(error);
          }
        } else if (this.mode === 'edit') {
          try {
            await editBook(this.initialBook.title, this.book);
            console.log('Book updated');
            this.getBooks();
            this.handleCancel();
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error('Invalid initialBook object or missing title');
        }
      },
      getBooks() {
        axios
          .get('http://localhost:3000/library/books')
          .then(response => {
            this.$emit('update:books', response.data);
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleCancel() {
        this.$emit('close');
      },
    },
  });
  </script>