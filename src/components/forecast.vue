<template>
    <div class="forecast-container" v-if="weatherStore.tomorrowWeather&&weatherStore.dayAfterWeather">
        <div class="forecast-card" v-if="weatherStore.tomorrowWeather">
            <div class="forecast-date">
                <span>明天</span>
                <span>{{ formatDate(weatherStore.tomorrowWeather.date) }}</span>
            </div>

            <div class="forecast-content">
                <div class="forecast-period">
                    <div class="weather-info">
                        <div class="weather-text">白天: {{ weatherStore.tomorrowWeather.text_day }}</div>
                    </div>
                </div>

                <div class="forecast-period">
                    <div class="weather-info">
                        <div class="weather-text">夜间: {{ weatherStore.tomorrowWeather.text_night }}</div>
                    </div>
                </div>

                <div class="temperature-info">
                    <div class="temp-range">
                        <span class="high-temp">{{ weatherStore.tomorrowWeather.high }}°</span>
                        <span class="temp-divider">/</span>
                        <span class="low-temp">{{ weatherStore.tomorrowWeather.low }}°</span>
                    </div>
                    <div class="other-info">
                        <div class="info-item">湿度: {{ weatherStore.tomorrowWeather.humidity }}%</div>
                        <div class="info-item">降水量: {{ weatherStore.tomorrowWeather.rainfall }}mm</div>
                        <div class="info-item">
                            风力: {{ weatherStore.tomorrowWeather.wind_direction }}
                            {{ weatherStore.tomorrowWeather.wind_scale }}级
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="forecast-card" v-if="weatherStore.dayAfterWeather">
            <div class="forecast-date">
                <span>后天</span>
                <span>{{ formatDate(weatherStore.dayAfterWeather.date) }}</span>
            </div>

            <div class="forecast-content">
                <div class="forecast-period">
                    <div class="weather-info">
                        <div class="weather-text">白天: {{ weatherStore.dayAfterWeather.text_day }}</div>
                    </div>
                </div>

                <div class="forecast-period">
                    <div class="weather-info">
                        <div class="weather-text">夜间: {{ weatherStore.dayAfterWeather.text_night }}</div>
                    </div>
                </div>

                <div class="temperature-info">
                    <div class="temp-range">
                        <span class="high-temp">{{ weatherStore.dayAfterWeather.high }}°</span>
                        <span class="temp-divider">/</span>
                        <span class="low-temp">{{ weatherStore.dayAfterWeather.low }}°</span>
                    </div>
                    <div class="other-info">
                        <div class="info-item">湿度: {{ weatherStore.dayAfterWeather.humidity }}%</div>
                        <div class="info-item">降水量: {{ weatherStore.dayAfterWeather.rainfall }}mm</div>
                        <div class="info-item">
                            风力: {{ weatherStore.dayAfterWeather.wind_direction }}
                            {{ weatherStore.dayAfterWeather.wind_scale }}级
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weatherStore';

const weatherStore = useWeatherStore();

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
};

</script>

<style scoped lang="scss">
.forecast-container {
    width: 300px;
    padding: 20px;
    color: #fff;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.forecast-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 600;
}

.forecast-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
}

.forecast-date {
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    margin-bottom: 12px;
    font-weight: 500;
}

.forecast-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.forecast-period {
    display: flex;
    align-items: center;
    gap: 12px;
}

.weather-info {
    flex: 1;
}

.weather-text {
    font-size: 1rem;
}

.temperature-info {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.temp-range {
    font-size: 1.5rem;
    margin-bottom: 8px;

    .high-temp {
        color: #ff7e67;
        font-weight: 600;
    }

    .temp-divider {
        margin: 0 8px;
        color: rgba(255, 255, 255, 0.5);
    }

    .low-temp {
        color: #88d1f1;
        font-weight: 600;
    }
}

.other-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
}
</style>