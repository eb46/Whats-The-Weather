import React from 'react'

const Input = (props) => {
    const { getWeather, handleLocationChange } = props
    return (
        <>
            <form onSubmit={getWeather}>
            <input 
                onChange={handleLocationChange}
                type="text" 
                placeholder="Enter city" />
            <input
                type="submit"
                value="Get Weather" />
            </form>
        </>
    ) 
}

export default Input