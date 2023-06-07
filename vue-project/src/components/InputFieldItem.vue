<template>
    <div>
        <label> {{ label }}</label> 
        <input v-model="value" :type="type" :placeholder="placeholder" @input="handleInput">
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        value: {
            required: true,
        }, 
        label: {
            required: true,
        },
        type: {
            default: "text",
        },
        placeholder: {
            default: "",
        },
    },
    methods:{
        handleInput(event: Event) {
            this.$emit("input", (event.target as HTMLInputElement).value);
        },
    },
});
</script>

<style scoped>
    label {
        margin-right: 1rem;
    }
    input {
        margin-top: 1rem;
        margin-right: 1rem;
        height: 1.5rem;
    }
</style>