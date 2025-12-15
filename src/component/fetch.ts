import { fetchWeatherApi } from "openmeteo";

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

export interface UnitOptions {
    temperature: TemperatureUnit;
    windSpeed: WindSpeedUnit;
    precipitation: PrecipitationUnit;
}

export interface WeatherData {
    location: {
        latitude: number;
        longitude: number;
        timezone: string;
        elevation: number;
    };
    units: UnitOptions;
    current: {
        temperature: number;
        apparent_temperature: number;
        relative_humidity: number;
        precipitation: number;
        weather_code: number;
        wind_speed: number;
        is_day: boolean;
    };
    hourly: {
        time: Date[];
        temperature_2m: number[];
        weather_code: number[];
        precipitation: number[];
        wind_speed_10m: number[];
    };
    daily: {
        time: Date[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
    };
}

export const searchWeather = async (
    latitude: number,
    longitude: number,
    units: UnitOptions = {
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm",
    }
): Promise<WeatherData> => {
    const params = {
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day",
        hourly: "temperature_2m,precipitation,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "auto",
        forecast_days: 7,
        temperature_unit: units.temperature,
        wind_speed_unit: units.windSpeed,
        precipitation_unit: units.precipitation,
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        // 📍 UBICACIÓN
        const latitude_res = response.latitude();
        const longitude_res = response.longitude();
        const timezone = (response.timezone() || "UTC") as string;
        const elevation = response.elevation();

        // 🌡️ DATOS ACTUALES
        const current = response.current()!;
        const currentData = {
            temperature: current.variables(0)?.value() || 0,
            apparent_temperature: current.variables(1)?.value() || 0,
            relative_humidity: current.variables(2)?.value() || 0,
            precipitation: current.variables(3)?.value() || 0,
            weather_code: current.variables(4)?.value() || 0,
            wind_speed: current.variables(5)?.value() || 0,
            is_day: current.variables(6)?.value() === 1,
        };

        // ⏰ DATOS HORARIOS
        const hourly = response.hourly()!;
        const hoursCount =
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval();

        const hourlyTime = Array.from({ length: hoursCount }, (_, i) =>
            new Date(
                (Number(hourly.time()) + i * hourly.interval()) * 1000
            )
        );

        const hourlyData = {
            time: hourlyTime,
            temperature_2m: Array.from(hourly.variables(0)?.valuesArray() || []) as number[],
            precipitation: Array.from(hourly.variables(1)?.valuesArray() || []) as number[],
            weather_code: Array.from(hourly.variables(2)?.valuesArray() || []) as number[],
            wind_speed_10m: Array.from(hourly.variables(3)?.valuesArray() || []) as number[],
        };

        // 📅 DATOS DIARIOS
        const daily = response.daily()!;
        const daysCount =
            (Number(daily.timeEnd()) - Number(daily.time())) /
            daily.interval();

        const dailyTime = Array.from({ length: daysCount }, (_, i) =>
            new Date(
                (Number(daily.time()) + i * daily.interval()) * 1000
            )
        );

        const dailyData = {
            time: dailyTime,
            weather_code: Array.from(daily.variables(0)?.valuesArray() || []) as number[],
            temperature_2m_max: Array.from(daily.variables(1)?.valuesArray() || []) as number[],
            temperature_2m_min: Array.from(daily.variables(2)?.valuesArray() || []) as number[],
            precipitation_sum: Array.from(daily.variables(3)?.valuesArray() || []) as number[],
        };

        return {
            location: {
                latitude: latitude_res,
                longitude: longitude_res,
                timezone,
                elevation,
            },
            units,
            current: currentData,
            hourly: hourlyData,
            daily: dailyData,
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};