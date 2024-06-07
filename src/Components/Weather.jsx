import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import Search from "../assets/Search.png";
import Cloud from "../assets/Cloud.png";
import Drizzle from "../assets/Drizzle.png";
import Humidity from "../assets/Humidity.png";
import Rain from "../assets/Rain.png";
import Snow from "../assets/Snow.png";
import Sunny from "../assets/Sunny.png";
import Wind from "../assets/Wind.png";

const Weather = () => {
  const [whetherData, setwhetherData] = useState(false);
  const inputref = useRef();

  const allIcons = {
    "01d": Sunny,
    "01n": Sunny,
    "02d": Cloud,
    "02n": Cloud,
    "04d": Cloud,
    "04n": Cloud,
    "09d": Drizzle,
    "09n": Drizzle,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || Sunny;
      setwhetherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setwhetherData(false);
      console.error("Error in fetcing data");
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputref} />
        <img
          src={Search}
          alt=""
          onClick={() => search(inputref.current.value)}
        />
      </div>

      {whetherData ? (
        <>
          <img src={whetherData?.icon} alt="" className="weather-icon" />
          <p className="temperature">{whetherData?.temperature}°C</p>
          <p className="location">{whetherData?.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={Humidity} alt="" />
              <div>
                <p>{whetherData?.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={Wind} alt="" />
              <div>
                <p>{whetherData?.windSpeed}Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
