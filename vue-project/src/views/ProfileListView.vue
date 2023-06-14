<script lang="ts">
import NavBarItem from '@/components/NavBarItem.vue';
import TokenItem from '@/components/TokenItem.vue';

export default {
    components:{
        NavBarItem,
        TokenItem
    }
}

</script>

<template>
    <nav>
        <NavBarItem/>
        <TokenItem/>
    </nav>
</template>