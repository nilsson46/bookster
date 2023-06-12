<template>
    <div class="modal">
      <div class="modal-content">
        <h2>{{ mode === 'add' ? 'Add Book' : 'Edit Book' }}</h2>
        <form @submit.prevent="handleSubmit">
            <InputFieldItem v-model="book.author" :label="'Author:'" :type="'text'" :required="true" :value="book.author" />
            <InputFieldItem v-model="book.title" :label="'Title:'" :type="'text'" :required="true" :value="book.title" />
            <InputFieldItem v-model="book.quantity" :label="'Quantity:'" :type="'number'" :required="true" :value="book.quantity" />
  
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
import type { Book } from './BooksItem.vue'
import InputFieldItem from './InputFieldItem.vue';
import axios from 'axios';
import { getBooks } from '@/service/bookservice';

export default defineComponent({

    components: {
        InputFieldItem,
    },
    props:{
        mode:{
            type: String, 
            required: true,
            default: 'add',
        },
        initialBook: {
            type: Object as () => Book | null,
            default: null,
        },
    },
    data(){
        return{
            book:{
                author: '',
                title: '',
                quantity: 0,
            } as Book,
        };
    },
    mounted () {
        if(this.mode === "edit" && this.initialBook){
            this.book = {...this.initialBook};
        }
    },
    methods: {
        async handleSubmit(){
            if(this.mode === 'add'){
                try{
                    await axios.post('http://localhost:3000/admin/books', this.book);
                    console.log("Book added")
                    this.getBooks();
                } catch(error){
                    console.log(error);
                    
                }
            } else if(this.mode === 'edit'){
                try{
                    const response = await axios.put('http://localhost:3000/admin/books',{
                        previous: { title: this.initialBook?.title},
                        current: this.book,
                    });
                } catch(error){
                    console.error(error)
                }
                
            }
        },
        
        handleCancel(){
            this.$emit('close')
        },
    },
});
</script>