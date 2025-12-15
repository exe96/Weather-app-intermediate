import drizzle from '@/assets/images/iconWeathers/icon-drizzle.webp';
import fog from '@/assets/images/iconWeathers/icon-fog.webp';
import overCast from '@/assets/images/iconWeathers/icon-overcast.webp';
import partlyCloudy from '@/assets/images/iconWeathers/icon-partly-cloudy.webp';
import rain from '@/assets/images/iconWeathers/icon-rain.webp';
import snow from '@/assets/images/iconWeathers/icon-snow.webp';
import storm from '@/assets/images/iconWeathers/icon-storm.webp';
import sunny from '@/assets/images/iconWeathers/icon-sunny.webp';

export const iconWeatherSvg={
    0: {
        name: 'icon-sunny',
        url: sunny
    },
    1: {
        name: 'icon-sunny',
        url: sunny
    },
    2: {
        name: 'icon-partly-cloudy',
        url: partlyCloudy
    },
    3: {
        name: 'icon-overcast',
        url: overCast
    },
    45: {
        name: 'icon-fog',
        url: fog
    },
    48: {
        name: 'icon-fog',
        url: fog
    },
    51: {
        name: 'icon-drizzle',
        url: drizzle
    },
    53: {
        name: 'icon-drizzle',
        url: drizzle
    },
     55: {
        name: 'icon-drizzle',
        url: drizzle
    },
    56:{
        name: 'icon-drizzle',
        url: drizzle
    },
    57:{
        name: 'icon-drizzle',
        url: drizzle
    },
   
   
    61: {
        name: 'icon-rain',
        url: rain
    },
    63: {
        name: 'icon-rain',
        url: rain
    },
    65: {
        name: 'icon-rain',
        url: rain
    },
    66: {
        name: 'icon-rain',
        url: rain
    },
    67: {
        name: 'icon-rain',
        url: rain
    },
    71: {
        name: 'icon-snow',
        url: snow
    },
    73: {
        name: 'icon-snow',
        url: snow
    },
        75: {
            name: 'icon-snow',
            url: snow
        },
    77: {
        name: 'icon-snow',
        url: snow
    },
    80: {
        name: 'icon-rain',
        url: rain
    },
    81: {
        name: 'icon-rain',
        url: rain
    },
    82: {
        name: 'icon-rain',
        url: rain
    },
    85: { name: 'icon-snow',
        url: snow
    },
    86:{
         name: 'icon-snow',
        url: snow
    },
    95: {
        name: 'icon-storm',
        url: storm
    },
    96: {
        name: 'icon-storm',
        url: storm
    },
    99: {
        name: 'icon-storm',
        url: storm
    },
};



export const iconWeather = ({name, url, classNamePicture,classNameImg}) => {
    return (
        <picture className={classNamePicture}>
            <img src={url} alt={name} className={classNameImg} />
        </picture>
    );
}

