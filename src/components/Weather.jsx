import React, { useEffect, useRef, useState } from 'react'
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { toast } from 'react-toastify';

const Weather = () => {

  const inputRef=useRef();
  const [weatherdata,setWeatherdata]=useState(false);

  const search=async(city)=>{
    if(city===""){
      toast.error("Enter City Name");
      return;
    }
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;

      const response=await fetch(url);
      const data=await response.json();

      if(!response.ok){
        toast.error("Enter Valid City Name");
        return;
      }

      setWeatherdata({
        name:data.name,
        temp:Math.floor(data.main.temp),
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        icon:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      });

    } catch (error) {
      setWeatherdata(false);
      toast.error("Error In Fetching Weather Data")
    }
  }

  useEffect(()=>{
    search("New Delhi");
  },[]);

  return (
    <div className='weather'>
      <div className='searchbar'>
        <input type='text' placeholder='Search City' ref={inputRef}/>
        <img onClick={()=>{
          search(inputRef.current.value);
          inputRef.current.value="";
          }} src={search_icon} alt='search'/>
      </div>
      {weatherdata?<>
        <img className='weathericon' src={weatherdata.icon} alt='weather'/>
      <p className='temp'>{weatherdata.temp}°C</p>
      <p className='location'>{weatherdata.name}</p>
      <div className='weatherdata'>
        <div className='col'>
          <img src={humidity_icon} alt='humidity'/>
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt='humidity'/>
          <div>
            <p>{weatherdata.windspeed}kmph</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather
