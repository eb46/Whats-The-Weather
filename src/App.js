import React from 'react';
import axios from 'axios';
import './App.css';
import FiveDayForecast from './components/fiveDayForecast'
import Input from './components/inputWeather'

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
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        this.setState({
          weather: response.data,
          tempMax: response.data.main.temp_max,
          tempMin: response.data.main.temp_min,
          description: response.data.weather[0].description,
          name: response.data.name,
        })
      })
    
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
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
    let maxTemp
    let minTemp
    
    const temperatureMax = Math.round(this.state.tempMax) || ''
    const temperatureMin = Math.round(this.state.tempMin) || ''

    if (this.state.name) {
      currentForecast = <h2>Current Forecast in {this.state.name}</h2>
      maxTemp = <p>Max Temp: {temperatureMax}°</p>
      minTemp = <p>Min Temp: {temperatureMin}°</p>
    }
    
    return (
      <div className="App">
        <h1>
          What's the Weather?
        </h1>
        <Input 
          getWeather={this.getWeather}
          handleLocationChange={this.handleLocationChange} />        
        <div>
          {currentForecast}
          {maxTemp}
          {minTemp}
          <p>{this.state.description.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
        </div>
        <FiveDayForecast 
          name={this.state.name}
          forecast={this.state.forecast}/>
      </div>
    );
  }
}

export default App;
