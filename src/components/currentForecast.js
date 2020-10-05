import React from 'react'

const CurrentForecast = (props) => {
    const { error, location, currentForecast, maxTemp, minTemp, description } = props

    const errorMessage = <h4>{location} does not exist. Enter valid city.</h4>

    return(
      <>
        {error ? errorMessage : 
          <div className="current-forecast">
            {currentForecast}
            {maxTemp}
            {minTemp}
            <p>{description.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
          </div>
        } 
      </>
    )
}

export default CurrentForecast