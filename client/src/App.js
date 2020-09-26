import React from 'react';
import axios from 'axios';
import './App.css';
import Forecast from './components/forecast'

const API_key = "807df41e8c0da0836ad0fc7b0630f3e1"

class App extends React.Component {
  
  state = {
    weather: [],
    location: '',
    tempMax: '',
    tempMin: '',
    description: '',
    forecast: []
  }

  getWeather = (event) => {
    event.preventDefault()
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=imperial&APPID=${API_key}`)
      .then(response => {
        this.setState({
          weather: response.data,
          tempMax: response.data.main.temp_max,
          tempMin: response.data.main.temp_min,
          description: response.data.weather[0].description,
          name: response.data.name,
        })
      })
    
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=imperial&appid=${API_key}`)
      .then(response => {
        this.setState({
          forecast: response.data.list
        })
        console.log(response.data.list);
      })

    event.target.reset()
  }

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value
    })
  }
  
  render(){   

    let currentForecast
    
    const temperatureMax = Math.round(this.state.tempMax) || ''
    const temperatureMin = Math.round(this.state.tempMin) || ''

    if (this.state.name) {
      currentForecast = <h2>Current Forecast in {this.state.name}</h2>
    } else {
      currentForecast = ''
    }
    
    return (
      <div className="App">
        <h1>
          What's the Weather?
        </h1>
        <form onSubmit={this.getWeather}>
          <input 
            onChange={this.handleLocationChange}
            type="text" 
            placeholder="Enter city" />
          <input
            type="submit"
            value="Get Weather" />
        </form>
          
        <div>
          {currentForecast}
          <p>Max Temp: {temperatureMax}</p>
          <p>Min Temp: {temperatureMin}</p>
          <p>Description: {this.state.description}</p>
        </div>
        <Forecast 
          name={this.state.name}
          forecast={this.state.forecast}/>
      </div>
    );
  }
}

export default App;
