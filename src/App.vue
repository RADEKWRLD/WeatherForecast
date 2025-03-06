<template>
    <div class="background" :style="backgroundStyle">
        <div v-if="weatherStore.nowWeather" class="weather-container">
            <div class="current-weather">
                <Date/>
                <Weather />
                <information />
            </div>
            <div class="forecast-section">
                <ForecastWeather />
            </div>
        </div>
        <div v-else class="location-prompt">
            请允许获取位置权限以查看天气信息
        </div>
    </div>
</template>

<script setup>
import Weather from './components/weather.vue';
import information from './components/information.vue';
import ForecastWeather from './components/forecast.vue';
import { useWeatherStore } from '@/stores/weatherStore';
import { computed } from 'vue';
import { getBackgroundColor } from './utils/background';
import Date from './components/date.vue';
const weatherStore = useWeatherStore();
weatherStore.fetchLocation();

const backgroundStyle = computed(() => ({
    background: getBackgroundColor(weatherStore.nowWeather?.now?.text)
}));
</script>

<style lang="scss">
@use '@/assets/variables.scss' as v;

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.background {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center; 
    align-items: center;
    transition: background 0.5s ease;
    overflow-y: auto;
}

.weather-container {
    display: flex;
    flex-direction: row; 
    max-width: 1200px;
    width: 90%;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}

.forecast-section {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
}

.current-weather {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    position: relative;
}

.location-prompt {
    color: white;
    font-size: 1.5rem;
    text-align: center;
    padding: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
    .background {
        align-items: flex-start;
        padding-top: 10px;
    }

    .weather-container {
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
        gap: 15px;
    }

    .forecast-section,
    .current-weather {
        width: 100%;
        max-width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        right: 0rem;
    }

    .location-prompt {
        font-size: 1.2rem;
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .weather-container {
        gap: 10px;
    }
}

@media (max-height: 700px) {
    .background {
        height: auto;
        min-height: 100vh;
    }
}
</style>