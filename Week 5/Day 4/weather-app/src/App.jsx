import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = 'f6b3a859ee0ee928c1ced8c0c7786f1a'
const DEBOUNCE_MS = 600

function App() {
  const [city, setCity] = useState('Indore')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const trimmedCity = city.trim()

    if (!trimmedCity) {
      setWeather(null)
      setError('')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    const controller = new AbortController()
    const timerId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`,
          { signal: controller.signal },
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch weather')
        }

        setWeather(data)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setWeather(null)
        setError(fetchError.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timerId)
      controller.abort()
    }
  }, [city])

  const condition = weather?.weather?.[0]?.description

  return (
    <main className="app">
      <section className="weather-card">
        <h1>Weather App</h1>
        <p className="subtitle">Search a city to get live weather data</p>

        <div className="input-group">
          <label htmlFor="city-input">City</label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter city name"
          />
        </div>

        {loading && <p className="status">Loading weather...</p>}
        {error && !loading && <p className="status error">Error: {error}</p>}

        {weather && !loading && !error && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="temp">{Math.round(weather.main.temp)} C</p>
            <p className="condition">{condition}</p>
            <div className="meta">
              <p>Feels like: {Math.round(weather.main.feels_like)} C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
