import React from 'react';
//import { weatherData } from './weatherData';
import Button from '@material-ui/core/Button';
import CmtCard from '../../../../@coremat/CmtCard';
import { Box } from '@material-ui/core';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtImage from '../../../../@coremat/CmtImage';
import CmtList from '../../../../@coremat/CmtList';
import DayWeather from './DayWeather';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  imgView: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(3px)',
    '& img': {
      display: 'block',
    },
  },
  imgContent: {
    padding: 24,
    minHeight: 216,
    position: 'relative',
    zIndex: 3,
    backgroundColor: 'rgba(35, 3, 106, 0.6)',
    color: theme.palette.common.white,
  },
  titleRoot: {
    marginBottom: 8,
  },
  subTitleRoot: {
    fontSize: 16,
    color: alpha(theme.palette.common.white, 0.74),
    marginBottom: 20,
  },
}));



const WeatherDetail =  () => {
  

  const [weatherData, setWeather] = useState({ 
    city: null,
    list: [],
  });
  const [weatherData1, setWeather1] = useState({ 
    city1: null,
    list1: [],
  });
  const [weatherData2, setWeather2] = useState({ 
    city2: null,
    list2: [],
  });

  const getApi = async () =>{
    const API_SL = 'https://api.openweathermap.org/data/2.5/weather?q=Villa Mercedes,ar&APPID=6a758328b8704b9bae41c16c9849cc15&units=metric';
    const API_ARR = 'https://api.openweathermap.org/data/2.5/weather?q=Arroyo Seco,ar&APPID=6a758328b8704b9bae41c16c9849cc15&units=metric';
    const API_BAR = 'https://api.openweathermap.org/data/2.5/weather?q=Baradero,ar&APPID=6a758328b8704b9bae41c16c9849cc15&units=metric';
    
    const res = await fetch(API_ARR);
    const res1 = await fetch(API_SL);
    const res2 = await fetch(API_BAR);
    const dataARR = await res.json();
    const dataSL = await res1.json();
    const dataBA = await res2.json();
    //console.log("f ", dataARR.main.temp );
    //console.log(" y grados", gr);
    //console.log(" y weather", JSON.stringify(dataSL.weather[0]));
    let DataW = {
      city: {
        name: 'Arroyo Seco',
        dateTime: new Date()+'',
        country: 'AR',
      },
      list: [
        {
          dt: dataARR.coord.dt,
          main: {
            temp: dataARR.main.temp,
            temp_min: dataARR.main.temp_min,
            temp_max: dataARR.main.temp_max,
            pressure: dataARR.main.pressure,
            sea_level: dataARR.main.sea_level,
            grnd_level: dataARR.main.grnd_level,
            humidity: dataARR.main.humidity,
            temp_kf: dataARR.main.feels_like,
          },
          weather: [
            {
              id: dataARR.weather[0].id,
              main: dataARR.weather[0].main,
              description: dataARR.weather[0].description,
              icon: dataARR.weather[0].icon,
            },
          ],
          clouds: {
            all: dataARR.clouds.all,
          },
          wind: {
            speed: dataARR.wind.speed,
            deg: dataARR.wind.deg,
          },
          rain: {
            '0h': 0.0,
          },
          sys: {
            pod: 'n',
          },
          dt_txt: '2017-11-16 12:00:00',
        },
      ],
    }
   
    let DataW1 = {
      city1: {
        name: 'San Luis',
        dateTime: new Date()+'',
        country: 'AR',
      },
      list1: [
        {
          dt: dataSL.coord.dt,
          main: {
            temp: dataSL.main.temp,
            temp_min: dataSL.main.temp_min,
            temp_max: dataSL.main.temp_max,
            pressure: dataSL.main.pressure,
            sea_level: dataSL.main.sea_level,
            grnd_level: dataSL.main.grnd_level,
            humidity: dataSL.main.humidity,
            temp_kf: dataSL.main.feels_like,
          },
          weather: [
            {
              id: dataSL.weather[0].id,
              main: dataSL.weather[0].main,
              description: dataSL.weather[0].description,
              icon: dataSL.weather[0].icon,
            },
          ],
          clouds: {
            all: dataSL.clouds.all,
          },
          wind: {
            speed: dataSL.wind.speed,
            deg: dataSL.wind.deg,
          },
          rain: {
            '0h': 0.0,
          },
          sys: {
            pod: 'n',
          },
          dt_txt: 'Villa Mercedes',
        },
      ],

      
    }

    let DataWB = {
      city2: {
        name: 'Baradero',
        dateTime: new Date()+'',
        country: 'AR',
      },
      list2: [
        {
          dt: dataBA.coord.dt,
          main: {
            temp: dataBA.main.temp,
            temp_min: dataBA.main.temp_min,
            temp_max: dataBA.main.temp_max,
            pressure: dataBA.main.pressure,
            sea_level: dataBA.main.sea_level,
            grnd_level: dataBA.main.grnd_level,
            humidity: dataBA.main.humidity,
            temp_kf: dataBA.main.feels_like,
          },
          weather: [
            {
              id: dataBA.weather[0].id,
              main: dataBA.weather[0].main,
              description: dataBA.weather[0].description,
              icon: dataBA.weather[0].icon,
            },
          ],
          clouds: {
            all: dataBA.clouds.all,
          },
          wind: {
            speed: dataBA.wind.speed,
            deg: dataBA.wind.deg,
          },
          rain: {
            '0h': 0.0,
          },
          sys: {
            pod: 'n',
          },
          dt_txt: 'Baradero',
        },
      ],
    }
    console.log("data what", dataSL);
    setWeather(DataW);
    setWeather1(DataW1);
    setWeather2(DataWB);
  }
  
  
  useEffect(() => {
    getApi();
  }, [])
  
  const { city, list } = weatherData;
  const { city1, list1 } = weatherData1;
  const { city2, list2 } = weatherData2;

 
  const classes = useStyles();
  if (!city) {
    return <div>Loading...</div>;
  }

  return (
    <CmtCard>
      <Box position="relative">
        <Box className={classes.imgView}>
          <CmtImage src={'/images/dashboard/img-weather-bg.png'} title="Contemplative Reptile" />
        </Box>
        <Box
          className={classes.imgContent}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Typography component="div" variant="h2" className={classes.titleRoot}>
            {city.name}
          </Typography>
          <Box component="p" className={classes.subTitleRoot}>
            {city.dateTime}
          </Box>
          <Box display="flex" alignItems="center">
            <Box component="h2" fontSize={{ sm: 30, md: 36, lg: 48 }}>
              {list[0].main.temp.toFixed(1)}
              <Box component="span" fontSize={16} ml={2}>
                ° C
              </Box>
            </Box>
            <Box ml={4} fontSize={28}>
              <i className={'wi wi-owm-' + list[0].weather[0].id} />
            </Box>
          </Box>
        </Box>
      </Box>
      <CmtCardContent>
        <CmtList data={list1} renderRow={(data, index) => <DayWeather key={index} data={data} />} />
        <CmtList data={list2} renderRow={(data, index) => <DayWeather key={index} data={data} />} />
        <Box pt={3}>
          <Button variant="contained" color="primary" size="small" onClick={getApi}>
            Actualizar
          </Button>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default WeatherDetail;
