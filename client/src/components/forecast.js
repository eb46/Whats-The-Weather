import React from 'react'
import Daily from './daily'

const Forecast = (props) => {
    const { forecast, name } = props
    let forecastTitle

    if (name) {
        forecastTitle = <h2>5 Day Forecast</h2>
    }  

    // let showForecast = forecast.splice(1, 5)
    // console.log(showForecast);

    console.log(forecast);

    return(
        <>
            {forecastTitle}
            <div className="forecast-container">
                {forecast.map((daily, index) => 
                    <Daily 
                        key={index}
                        daily={daily} />
                )}
            </div>
        </>
    )    
}

export default Forecast