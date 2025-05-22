import { useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios'

function App() {

  const Apikey = "ccccdf483c706b26c24d74016c0690df"

  useEffect(()=>{
    // fetchdata()
  }, [])

  const [city, setCity] = useState("karachi")
  const [apiresponse, setApiresponse] = useState(null)

  const hour = new Date().getHours();
  console.log(hour, "hour")
  // const isNight = hour >= 22 || hour < 6;
  const isNight = hour >= 6 && hour < 22;
  // const isDay = hour >= 6 && hour < 22;
  
  // console.log(isNight, "isNight")
  // console.log(isDay, "isDay")


  const fetchdata = async ()=> {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metric`)
      console.log("response", response.data)
      setApiresponse(response.data)
      
    } catch (error) {
    console.error(error.message);
    }
  }
  // console.log(city, "city")

  return (
    <>
      <div className="weather-container">
      <div className="search-container">
      <form>

        <input 
          type='text' 
          className='city-input'
          placeholder='Enter City and hit enter' 
          onChange={(e) => setCity(e.target.value)}
        />

      </form>
        <button 
          className='search-button'
          onClick={fetchdata}
        >
          Check Weather
        </button>
      </div>
      
      {apiresponse && (
        <div className={`weather-card ${isNight ? "night" : "day"}`}>
          <h1 className="weather-title">Weather in {apiresponse?.name}</h1>
          <p className="date-display">{new Date().toDateString()}</p>
          
          <div className="weather-main">
            <img 
              className="weather-icon"
              src={`https://api.openweathermap.org/img/w/${apiresponse?.weather[0]?.icon}.png`}
              alt="Weather icon"
            />
            <h2 className="temperature">
              {Math.round(apiresponse?.main?.temp)}°C
            </h2>
          </div>
          
          <p className="weather-description">
            {apiresponse?.weather[0]?.description}
          </p>
          
          <p className="weather-description">Humidity: {" "}
            {apiresponse?.main.humidity + "%"}
          </p>

           <p className="weather-description">Wind Speed: {" "}
            {apiresponse?.wind?.speed + "KM/h"}
          </p>
        </div>
      )}
    </div>
    </>
  )
}

export default App
