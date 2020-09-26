import React from 'react'

const Daily = (props) => {
    const { daily } = props

    const temperatureMax = Math.round(daily.main.temp_max) || ''
    const temperatureMin = Math.round(daily.main.temp_min) || ''
    const date = daily.dt_txt

    return(
        <div className="forecast-card">
            <p>Date: {date}</p>
            <p>Max: {temperatureMax}</p>
            <p>Min: {temperatureMin}</p>
            <p>{daily.weather[0].description}</p>
        </div>
    )
}

export default Daily