import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getWeatherAPI } from '@/request/weatherAPI';
import { getNowAPI } from '@/request/weatherAPI';

export const useWeatherStore = defineStore('weather', () => {
    // 定义状态
    const position = ref(null);
    const nowWeather = ref(null);
    const todayWeather = ref(null);
    const tomorrowWeather = ref(null);
    const dayAfterWeather = ref(null);

    // 获取预报天气数据
    const fetchWeather = async () => {
        if (!position.value) {
            console.error("位置信息未获取");
            return;
        }
        try {
            const res = await getWeatherAPI.get('', {
                params: { location: `${position.value.lat}:${position.value.lon}` }
            });
            const data = res.data.results[0].daily;
            todayWeather.value = data[0];
            tomorrowWeather.value = data[1];
            dayAfterWeather.value = data[2];
        } catch (error) {
            console.error("请求天气数据失败", error);
        }
    };

    // 获取当前天气
    const fetchNowWeather = async () => {
        if (!position.value) return;
        try {
            const res = await getNowAPI.get('', {
                params: { location: `${position.value.lat}:${position.value.lon}` }
            });
            nowWeather.value = res.data.results[0];
        } catch (error) {
            console.error("请求当前信息失败", error);
        }
    };

    // 获取位置并触发所有请求
    const fetchLocation = () => {
        if (!navigator.geolocation) {
            console.error("浏览器不支持 Geolocation");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (res) => {
                position.value = {
                    lat: res.coords.latitude,
                    lon: res.coords.longitude
                };
                // 一次性触发所有 API 请求
                await Promise.all([
                    fetchNowWeather(),
                    fetchWeather(),
                ]);
            },
            (error) => {
                console.error("获取位置失败", error);
            }
        );
    };

    return {
        position,
        nowWeather,
        todayWeather,
        tomorrowWeather,
        dayAfterWeather,
        fetchLocation
    };
});