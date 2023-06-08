<template>
    <div>
      <label>{{ label }}</label>
      <input :type="type" :value="value" @input="handleInput($event)" />
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
        handleInput(event: Event){
            const target = event.target as HTMLInputElement;
            if(target){
                this.$emit('update:value', target.value)
            }
        }
    }
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