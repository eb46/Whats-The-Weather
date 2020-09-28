import React from 'react'
import partlyCloudy from '../images/partly-cloudy.png'
import sun from '../images/sunny.png'
import snow from '../images/snowy.png'
import rain from '../images/rainy.png'
import clearNight from '../images/clear-night.png'
import cloudyNight from '../images/cloudy-night.png'

const Daily = (props) => {
    let icon
    let standardTime
    let date

    const { daily } = props

    console.log(daily.dt_txt);

    const dateAndTimeArray = daily.dt_txt.split(' ')
    const dateSplit = dateAndTimeArray[0].split('-')
    const militaryTime = dateAndTimeArray[1].split(':')[0].replace(0,'')

    // sets time format to be displayed on each forecast card
    if ((militaryTime - 12) === -12) {
        standardTime = `12 AM`
    }  else if ((militaryTime - 12) === 0){
        standardTime = `12 Noon`
    }  else if (militaryTime < 12) {
        standardTime = `${militaryTime} AM`
    }  else {
        standardTime = `${militaryTime - 12} PM`
    }

    const temperatureMax = `${Math.round(daily.main.temp_max)}°` || ''
    const temperatureMin = `${Math.round(daily.main.temp_min)}°` || ''
    const description = daily.weather[0].description.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

    // sets date format to be displayed on each forecast card
    if (dateSplit[1] === '01'){
        date = `Jan ${dateSplit[2]}`
    }   else if (dateSplit[1] === '02') {
        date = `Feb ${dateSplit[2]}`
    }   else if (dateSplit[1] === '03') {
        date = `Mar ${dateSplit[2]}`
    }   else if (dateSplit[1] === '04') {
        date = `Apr ${dateSplit[2]}`
    }   else if (dateSplit[1] === '05') {
        date = `May ${dateSplit[2]}`
    }   else if (dateSplit[1] === '06') {
        date = `Jun ${dateSplit[2]}`
    }   else if (dateSplit[1] === '07') {
        date = `Jul ${dateSplit[2]}`
    }   else if (dateSplit[1] === '08') {
        date = `Aug ${dateSplit[2]}`
    }   else if (dateSplit[1] === '09') {
        date = `Sep ${dateSplit[2]}`
    }   else if (dateSplit[1] === '10') {
        date = `Oct ${dateSplit[2]}`
    }   else if (dateSplit[1] === '11') {
        date = `Nov ${dateSplit[2]}`
    }   else if (dateSplit[1] === '12') {
        date = `Dec ${dateSplit[2]}`
    }

    // if statements to handle which icons appear on each daily forecast card
    if ((parseInt(militaryTime) >= 18 || parseInt(militaryTime) <= 6) && description.toLowerCase().includes('clear')) {
            icon = <img src={clearNight} alt='night'/>
    }   else if (parseInt(militaryTime) >= 18 && description.toLowerCase().includes('clouds')) {
            icon = <img src={cloudyNight} alt='night'/>
    }   else if (description.toLowerCase().includes('clouds')) {
            icon = <img src={partlyCloudy} alt='partly cloudy' />
    }   else if (description.toLowerCase().includes('clear')) {
            icon = <img src={sun} alt='sun'/>
    }   else if (description.toLowerCase().includes('rain')) {
            icon = <img src={rain} alt='rain'/>
    }   else if (description.toLowerCase().includes('snow')) {
            icon = <img src={snow} alt='snow'/>
    }

    // <p>Max Temp: {temperatureMax}</p>
    //         <p>Min Temp: {temperatureMin}</p>

    return(
        <div className="forecast-card">
            <p>{date}</p>
            <p>{standardTime}</p>
            <div className="forecast-temp">
                <div className="temperature">
                    <p>Min</p>
                    <p>{temperatureMin}</p>
                </div>
                <div className="temperature">
                    <p>Max</p>
                    <p>{temperatureMax}</p>
                </div>
            </div>
            <p>{description}</p>
            {icon}
        </div>
    )
}

export default Daily