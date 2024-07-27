import React, { useEffect, useState } from 'react'
import axios from 'axios'

function XStates() {
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://crio-location-selector.onrender.com/countries")
                setCountries(response.data)
            } catch (error) {
                console.log("Error fetching countries:", error)
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        const fetchStates = async () => {
            if (selectedCountry) {
                try {
                    const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                    setStates(response.data)
                    setSelectedState('')  // Reset selected state when country changes
                    setCities([])  // Clear cities when country changes
                } catch (error) {
                    console.log("Error fetching states:", error)
                    setStates([])
                }
            } else {
                setStates([])
                setCities([])
            }
        }
        fetchStates()
    }, [selectedCountry])

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedCountry && selectedState) {
                try {
                    const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                    setCities(response.data)
                } catch (error) {
                    console.log("Error fetching cities:", error)
                    setCities([])
                }
            } else {
                setCities([])
            }
        }
        fetchCities()
    }, [selectedCountry, selectedState])

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value)
        setSelectedState('')
        setSelectedCity('')
    }
    
    const handleStateChange = (e) => {
        setSelectedState(e.target.value)
        setSelectedCity('')
    }

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value)
    }

    return (
        <div>
            <h1>Select Location</h1>
            <div>
                <select
                    name="country"
                    id="country"
                    style={{ marginRight: "20px" }}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>
                <select
                    name='state'
                    id='state'
                    disabled={!selectedCountry}
                    value={selectedState}
                    onChange={handleStateChange}
                    style={{ marginRight: "20px" }}
                >
                    <option value=''>Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>
                <select 
                    name='city'
                    id='city'
                    disabled={!selectedState}
                    value={selectedCity}
                    onChange={handleCityChange}
                >
                    <option value=''>Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {selectedCountry && selectedState && selectedCity && (
                <p>
                    You selected{' '}
                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{selectedCity}</span>,{' '}
                    <span style={{ color: "grey" }}>{selectedState}, {selectedCountry}</span>
                </p>
            )}
        </div>
    )
}

export default XStates