<template>
    <div class="modal">
      <div class="modal-content">
        <h2>Add New Book</h2>
        <form @submit.prevent="addNewBook">
          <InputFieldItem :value="title" @update:value="title = $event" type="text" placeholder="Title" required/>
          <InputFieldItem :value="author" @update:value="author = $event" type="text" placeholder="Author" required/>
          <InputFieldItem :value="quantity" @update:value="quantity = $event" type="number" placeholder="Quantity" required/>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from "axios"
  import InputFieldItem from './InputFieldItem.vue';
  export default defineComponent({
    components: {
      InputFieldItem
    },
    props: {
      token: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        title: '',
        author: '',
        quantity: 0,
      };
    },
    methods: {
    addNewBook() {
      const newBook = {
        title: this.title,
        author: this.author,
        quantity: this.quantity,
      };

      const headers = {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };

      axios
        .post('http://localhost:3000/admin/books', newBook, { headers })
        .then((response) => {
          if (response.status === 201) {
            // Book successfully added
            console.log('Book added successfully');
            // Emit an event to notify the parent component that a new book is added
            this.$emit('bookAdded');
          } else {
            // Error occurred while adding the book
            console.log('Error adding the book');
          }
        })
        .catch((error) => {
          // Handle any network or other errors
          console.error('An error occurred while adding the book', error);
        });
    },
  },
});
</script>
  
  <style>
  /* Add your modal styles here */
  </style>