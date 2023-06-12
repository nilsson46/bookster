<template>
    <div> 
        <NavBarItem></NavBarItem>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Purchases</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                               
             </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import NavBarItem from '@/components/NavBarItem.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
    components:{
        NavBarItem,
    }
})
</script>