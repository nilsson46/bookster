<template> 
    <div>
        <h2> {{ book.title }}</h2>
        <p> Author: {{ book.author }}</p>
        <p> Quantity: {{ book.quantity }}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent ({
    props:{
        book: {
            type: Object as PropType<Book>,
            required: true
        }
    }
});

interface Book{
    title: string;
    author: string; 
    quantity: number;
}

</script>