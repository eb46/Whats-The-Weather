import React from 'react';
import axios from 'axios';
import './App.css';
import FiveDayForecast from './components/fiveDayForecast'
import Nav from './components/nav'
import Input from './components/inputWeather'
import CurrentForecast from './components/currentForecast'

class App extends React.Component {
  
  state = {
    weather: [],
    location: '',
    tempMax: '',
    tempMin: '',
    description: '',
    forecast: [],
    error: false
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
      .catch(error => {
        this.setState({
          error: true,
          tempMax: '',
          tempMin: '',
          description: '',
          name: ''
        })
      })
    
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        this.setState({
          forecast: response.data.list
        })
        console.log(response.data.list);
      })
      .catch(error => {
        this.setState({
          error: true,
          forecast: [],
          tempMax: '',
          tempMin: '',
          description: '',
          name: ''
        })
      })

    // clears text within input field
    event.target.reset()
  }

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
      error: false,
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
        <div className="nav-bar">
          <Nav />
          <Input 
            getWeather={this.getWeather}
            handleLocationChange={this.handleLocationChange} /> 
        </div>     
        <CurrentForecast 
          description={this.state.description}
          maxTemp={maxTemp}
          minTemp={minTemp}
          currentForecast={currentForecast}
          error={this.state.error}
          location={this.state.location}
          />
        <FiveDayForecast
          error={this.state.error}
          name={this.state.name}
          forecast={this.state.forecast}/>
      </div>
    );
  }
}

export default App;
