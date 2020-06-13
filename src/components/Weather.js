/** @format */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const privateKey = 'cc7beab8fd0c7a211a5ccb7c5cd717f0'

export default function Weather() {
	const [currentWeather, setCurrentWeather] = useState({
		location: '',
		temp: 0,
		feelsLike: 0,
	})
	const [userPos, setUserPos] = useState({
		lat: '',
		lon: '',
	})

	//get position of user for weather fetch
	const coordinates = navigator.geolocation.getCurrentPosition((position) => {
		const myLat = position.coords.latitude
		const myLon = position.coords.longitude
		setUserPos({ lat: myLat, lon: myLon })
	})

	//fetch weather
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${userPos.lat}&lon=${userPos.lon}&units=imperial&appid=${privateKey}`
			)
			.then((response) => {
				setCurrentWeather({
					location: response.data.city.name,
					temp: response.data.main.temp,
				})
				console.log(response.data.city.name)
				alert(response.data.city.name)
			})
			.catch((error) => {
				console.log(error)
			})
	})
	return <div></div>
}
