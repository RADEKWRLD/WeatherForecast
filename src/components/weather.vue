<template>
        <div class="temperature">
            <h1>{{ nowWeather?.now.temperature }}℃</h1>
        </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore';
const { nowWeather } = useWeatherStore();

</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as v;



.temperature {
    margin: 0rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14rem;
    height: 14rem;
    background: v.$card-bg;
    border-radius: 2rem;
    backdrop-filter: blur(10px);
    box-shadow: v.$shadow;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    h1 {
        font-size: 4.5rem;
        color: v.$secondary-color;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        font-weight: 300;
    }
}
</style>