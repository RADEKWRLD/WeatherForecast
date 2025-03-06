<template>
     <div class="information">
            <h2>{{ nowWeather?.now.text }}</h2>
            <span>{{ nowWeather?.location.name }}</span>
        </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore';
const { nowWeather } = useWeatherStore(); // 从 Store 获取数据
</script>

<style scoped lang="scss">
@use '@/assets/variables.scss' as v;
.information {
    margin: 0rem;
    text-align: center;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    h2 {
        color: v.$secondary-color;
        font-size: 1.8rem;
        font-weight: 400;
        margin: 0.5rem 0;
    }

    span {
        color: v.$primary-color;
        font-size: 1.2rem;
        opacity: 0.85;
    }
}
</style>