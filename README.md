# WeatherForecast⛺️

这是一个基于Vue.js和Pinia状态管理的天气应用，通过用户地理位置获取实时天气和未来几天的天气预报。
使用了彩云天气API（Seniverse API）来获取天气数据，并通过动态背景和组件化设计为用户提供直观的天气信息展示。
- 项目链接：https://weather-forecast-sigma-sand.vercel.app/



### 项目预览
![image](https://github.com/user-attachments/assets/d5eb23df-e4cb-40c9-b5b1-420cc43b331c)



## 技术栈

- **前端框架**：Vue.js 
- **状态管理**：Pinia
- **HTTP客户端**：Axios
- **CSS预处理器**：SCSS
- **API**：彩云天气API（Seniverse API）

## 核心功能与技术点

### 1. **地理位置获取与天气数据请求**

#### 算法与调度
- 使用浏览器的`navigator.geolocation` API 获取用户当前位置（经纬度）。
- 通过Axios创建两个API实例：
  - `getWeatherAPI`：用于获取未来几天的天气预报数据。
  - `getNowAPI`：用于获取当前天气数据。
- 在获取到用户位置后，异步且同时触发`fetchNowWeather`和`fetchWeather`方法，分别调用上述API获取数据。

#### 代码示例
```javascript
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
```

### 2. **动态背景与天气状态映射**

#### 技术点
- 根据当前天气状态（如晴、雨、雪等），动态设置页面背景。
- 使用SCSS定义渐变背景，并通过JavaScript动态应用到页面。

#### 代码示例
```javascript
const backgroundStyle = computed(() => ({
    background: getBackgroundColor(weatherStore.nowWeather?.now?.text)
}));
```

```scss
$weatherBackgrounds: (
    '晴': linear-gradient(135deg, #87CEEB, #00BFFF),
    '多云': linear-gradient(135deg, #A9A9A9, #6B7280),
    // 更多天气状态...
);

@function getBackgroundColor($weatherText) {
    @return map-get($weatherBackgrounds, $weatherText) || #BDB395;
}
```

### 3. **组件化设计**

#### 组件结构
- **`Weather`组件**：展示当前天气的详细信息。
- **`information`组件**：展示其他相关信息（如空气质量、风力等）。
- **`ForecastWeather`组件**：展示未来几天的天气预报。
- **`Date`组件**：展示当前日期和时间。

#### 代码示例
```vue
<template>
    <div class="weather-container">
        <div class="current-weather">
            <Date/>
            <Weather />
            <information />
        </div>
        <div class="forecast-section">
            <ForecastWeather />
        </div>
    </div>
</template>
```

### 4. **响应式设计**

#### 技术点
- 使用CSS媒体查询实现响应式布局，适配不同屏幕尺寸。
- 在小屏幕设备上，将天气信息和预报部分改为垂直布局。

#### 代码示例
```scss
@media (max-width: 768px) {
    .weather-container {
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
        gap: 15px;
    }
}
```

## 使用的API

### 彩云天气API（Seniverse API）

#### API说明
- **`https://api.seniverse.com/v3/weather/daily.json`**：获取未来几天的天气预报。
  - 参数：
    - `location`：经纬度（格式为`lat:lon`）。
    - `start`：起始天数。
    - `days`：返回的天数。
- **`https://api.seniverse.com/v3/weather/now.json`**：获取当前天气信息。
  - 参数：
    - `location`：经纬度（格式为`lat:lon`）。

#### 示例请求
```javascript
const getWeatherAPI = axios.create({
    baseURL: "https://api.seniverse.com/v3/weather/daily.json",
    params: {
        key: "YOUR_API_KEY",
        language: "zh-Hans",
        unit: "c",
        start: 0,
        days: 5
    }
});

const getNowAPI = axios.create({
    baseURL: "https://api.seniverse.com/v3/weather/now.json",
    params: {
        key: "YOUR_API_KEY",
        language: "zh-Hans",
        unit: "c"
    }
});
```

## 项目运行指南

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置API密钥**
   - 替换代码中的`YOUR_API_KEY`为你的彩云天气API密钥。

3. **启动项目**
   ```bash
   npm run serve
   ```

4. **访问应用**
   - 打开浏览器，访问`http://localhost:8080`。

## 注意事项

- 确保浏览器支持`navigator.geolocation`。
- 如果API请求失败，请检查API密钥是否正确，以及网络连接是否正常。
- 动态背景的颜色映射可以根据实际需求进一步扩展。
