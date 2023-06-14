<template>
    <div v-if="isEditModalVisible" class="modal">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <h2>Edit Book</h2>
        <InputFieldItem v-model="editedBook.title" :label="'Title'" />
        <InputFieldItem v-model="editedBook.author" :label="'Author'" />
        <InputFieldItem v-model="editedBook.quantity" :label="'Quantity'" />
        <div class="modal-actions">
          <button @click="saveBook">Save</button>
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
    <!-- Rest of your component template -->
  </template>
  
  <script lang="ts">
  import InputFieldItem from '@/components/InputFieldItem.vue';
  
  export default {
    props: {
      book: Object, // The selected book from the table row
      isVisible: Boolean, // Whether the modal should be visible or not
    },
    components: {
      InputFieldItem,
    },
    data() {
      return {
        isEditModalVisible: false,
        editedBook: {
          title: '',
          author: '',
          quantity: 0,
        },
      };
    },
    watch: {
      isVisible: {
        immediate: true,
        handler(newValue) {
          this.isEditModalVisible = newValue;
          this.setEditedBook();
        },
      },
    },
    methods: {
      closeModal() {
        this.isEditModalVisible = false;
      },
      setEditedBook() {
        if (this.book) {
          this.editedBook.title = this.book.title;
          this.editedBook.author = this.book.author;
          this.editedBook.quantity = this.book.quantity;
        }
      },
      saveBook() {
        const updatedBook = { ...this.editedBook }; // Create a copy of the edited book
        editBook(this.book.title, updatedBook)
          .then(() => {
            console.log("Book edited successfully");
            this.closeModal();
          })
          .catch((error) => {
            console.error("An error occurred while editing the book", error);
          });
      },
    },
  };
  </script>
  
  <style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: white;
    padding: 1rem;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  
  /* Rest of your styles */
  </style>