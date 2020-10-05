import React from 'react'
import Daily from './daily'

const FiveDayForecast = (props) => {
    const { error, forecast, name } = props
    let forecastTitle
    let forecastDashboard

    if (name) {
        forecastTitle = (
            <>
                <h2>5 Day Forecast</h2>
                <h3>Scroll right to view more</h3>
            </>
        )
    }  

    if (error) {
        forecastDashboard = null
    }   else {
        forecastDashboard = (
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

    console.log(forecast);

    return(
        <>
            {forecastDashboard}  
        </>
    )    
}

export default FiveDayForecast