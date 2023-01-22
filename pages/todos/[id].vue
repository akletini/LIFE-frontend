<template>
    <div>
        <p> Details for Todo: {{ id }}</p>
    </div>
</template>

<script setup>
    const {id} = useRoute().params
</script>

<style scoped>

</style>