import { useState, useEffect } from 'react'
import './App.css'
import loadingGif from './assets/loading.gif'

function App() {
  const API_KEY = "f6b3a859ee0ee928c1ced8c0c7786f1a";
  const [city, setCity] = useState("indore");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const getData = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputCity = e.target.cityInput.value;
    if (inputCity) getData(inputCity);
  };

  return (
    <div className="container">
      <form className="searchSection" onSubmit={handleSearch}>
        <input type="text" name="cityInput" className="search" placeholder="Enter city..." />
        <button type='submit'>Search</button>
      </form>

      <div className="card">
        {loading ? (
          <LoadingUI />
        ) : (
          weatherData && (
            <WeatherUI 
              temp={weatherData.main.temp} 
              humidity={weatherData.main.humidity} 
              pressure={weatherData.main.pressure}
              name={weatherData.name}
            />
          )
        )}
      </div>
    </div>
  )
}

function WeatherUI({ temp, pressure, humidity, name }) {
  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <h1>{temp}°C</h1>
      <div className="info">
        <p>Humidity: {humidity}%</p>
        <p>Pressure: {pressure} hPa</p>
      </div>
    </div>
  )
}

function LoadingUI() {
  return <img src={loadingGif} alt="" />
}

export default App;
