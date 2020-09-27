import React from 'react'
import partlyCloudy from '../images/partly-cloudy.png'
import sun from '../images/sunny.png'
import snow from '../images/snowy.png'
import rain from '../images/rainy.png'
import clearNight from '../images/clear-night.png'
import cloudyNight from '../images/cloudy-night.png'



const Daily = (props) => {
    let icon
    let time

    const { daily } = props

    const dateArray = daily.dt_txt.split(' ')

    const standardTime = dateArray[1].split(':')[0].replace(0,'')

    if ((standardTime - 12) === -12) {
        time = `12 AM`
    }  else if ((standardTime - 12) === 0){
        time = `12 Noon`
    }  else if (standardTime < 12) {
        time = `${standardTime} AM`
    }  else {
        time = `${standardTime - 12} PM`
    }

    const date = dateArray[0]
    const temperatureMax = Math.round(daily.main.temp_max) || ''
    const temperatureMin = Math.round(daily.main.temp_min) || ''
    const description = daily.weather[0].description

    // console.log(parseInt(time));


    if ((parseInt(time) >= 18 || parseInt(time) <= 6) && description.includes('clear')) {
            icon = <img src={clearNight} alt='night'/>
    }   else if (parseInt(time) >= 18 && description.includes('clouds')) {
            icon = <img src={cloudyNight} alt='night'/>
    }   else if (description.includes('clouds')) {
            icon = <img src={partlyCloudy} alt='partly cloudy' />
    }   else if (description.includes('clear')) {
            icon = <img src={sun} alt='sun'/>
    }   else if (description.includes('rain')) {
            icon = <img src={rain} alt='rain'/>
    }   else if (description.includes('snow')) {
            icon = <img src={snow} alt='snow'/>
    }

    

    return(
        <div className="forecast-card">
            <p>{date}</p>
            <p>{time}</p>
            <p>Max: {temperatureMax}</p>
            <p>Min: {temperatureMin}</p>
            <p>{description}</p>
            {icon}
        </div>
    )
}

export default Daily