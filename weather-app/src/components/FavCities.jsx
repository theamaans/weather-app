import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FavCities.css';

const API_URL = 'http://localhost:3001/cities'; 

const FavCities = ({ onSelectCity }) => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(API_URL);
        setCities(response.data);
      } catch (err) {
        setError('Error fetching cities');
      }
    };
    fetchCities();
  }, []);

  const addCity = async () => {
    if (!city) return;
    
  // it is checking duplicate key
    if (cities.some(c => c.name.toLowerCase() === city.toLowerCase())) {
      setError('City already exists');
      return;
    }

    try {
      const response = await axios.post(API_URL, { name: city });
      setCities([...cities, response.data]);
      setCity('');
      setError('');
    } catch (err) {
      setError('Error adding city');
    }
  };

  const deleteCity = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCities(cities.filter((city) => city.id !== id));
    } catch (err) {
      setError('Error deleting city');
    }
  };

  return (
    <div className='fav-cities-container'>
      <h2>Favorite Cities</h2>
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='Add a city'
      />
      <button onClick={addCity}>Add</button>
      {error && <p className="error">{error}</p>}

      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            {city.name}
            <button onClick={() => deleteCity(city.id)}>Remove</button>
            <button onClick={() => onSelectCity(city.name)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavCities;
