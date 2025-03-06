<template>
    <div class="date">
        <p>{{ formattedDate }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const formattedDate = computed(() => {
    const now = new Date();
    return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
});
</script>

<style scoped lang="scss">
@use '@/assets/variables.scss' as v;

p {
    color: v.$secondary-color;
    font-size: 1.2rem;
    letter-spacing: 1px;
    opacity: 0.9;
    margin-bottom: 1.5rem;
}
</style>