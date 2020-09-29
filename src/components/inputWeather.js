import React from 'react'

const Input = (props) => {
    const { getWeather, handleLocationChange } = props
    return (
        <>
            <form onSubmit={getWeather}>
                <input
                    className="input-field"
                    onChange={handleLocationChange}
                    type="text" 
                    placeholder="Enter city" />
                <input 
                    className="submit-button"
                    type="submit"
                    value="Get Weather" />
            </form>
        </>
    ) 
}

export default Input