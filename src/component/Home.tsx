import React from 'react'
import axios from 'axios'
import Footer from './Footer'
import Nav from './Nav'
import Header from './Header'
import { Select } from '@chakra-ui/react'
// http://api.weatherapi.com/v1/current.json?key=c52f646992b74c1b884134802230702&q=Paris&aqi=no

const Home = () => {

    const [selectedOption, setSelectedOption] = React.useState("Riyadh");
    const [icon, setIcon] =React.useState("")
    const [weatherText, setWeatherText] =React.useState("")
    const [humidity, setHumidity] =React.useState("")
    const [temp, setTemp] =React.useState("")
    const [wind, setWind] =React.useState("")
    const [locationName, setLocationName] =React.useState("")
    const [country, setCountry] =React.useState("")

    const api=`http://api.weatherapi.com/v1/current.json?key=c52f646992b74c1b884134802230702&q=${selectedOption}`

    React.useEffect(()=>{
        getInfo()
    },[api])

     const selectCity = (e:any) => {
        setSelectedOption(e.target.value);
        getInfo()
      };

    const getInfo =()=>{
        axios.get(`${api}`).then( res =>{
            setIcon(res.data.current.condition.icon)
            setWeatherText(res.data.current.condition.text)
            setHumidity(res.data.current.humidity)
            setTemp(res.data.current.temp_c)
            setWind(res.data.current.wind_kph)
            setLocationName(res.data.location.name)
            setCountry(res.data.location.country)
        })
    }

  return (
    <div>
        <Nav/>
        <Header />
        <div className="main">
            <h1 className='title'>Today Weather</h1>
            <h1>Choose City :  </h1>
            <Select placeholder='Riyadh' w={'28%'} 
            onChange={selectCity} value={selectedOption} >
                <option value='Sydney'>Sydney</option>
                <option value='Paris'>Paris</option>
                <option value='London'>London</option>
                <option value='Dubai'>Dubai</option>
                <option value='New York'>New York</option>
            </Select>
            <div className="wetherInfo">
                <h1>Today Weather in {locationName},  {country}  </h1>
                <img src={icon} alt="" />
                <h3>{weatherText}</h3>
                <h4>Humidity : {humidity} </h4>
                <h4>Temperature : {temp} C </h4>
                <h4> Wind Speed :  {wind} km/h </h4>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Home