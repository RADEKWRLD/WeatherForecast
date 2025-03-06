import axios from "axios";
export const getWeatherAPI = axios.create({
  baseURL: "https://api.seniverse.com/v3/weather/daily.json",
  params: {
    key: "SV06SsBcXbAZusUKU",
    language: "zh-Hans",
    unit: "c",
    start: 0,
    days: 5
  }
});

export const getNowAPI = axios.create({
  baseURL: "https://api.seniverse.com/v3/weather/now.json",
  params: {
    key: "SV06SsBcXbAZusUKU",
    language: "zh-Hans",
    unit: "c",
    start: 0,
    days: 5
  }
});


