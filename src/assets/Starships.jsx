import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ss from './images/starship.webp';
import logo from './images/logo.jpg'

const Starships = () => {
    const [starships, setStarships] = useState([]); /// State to hold the list of starships fetched from the API
    const [searchTerm, setSearchTerm] = useState('');  // State to store the search term entered by the user in the search box
    const [nextUrl, setNextUrl] = useState(''); // State to store the URL of the next page of starships to fetch
    const navigate = useNavigate(); // useNavigate hook for navigating between pages

    // Fetching the list of starships when the component mounts
useEffect(() => { 
    const fetchStarships = async () => {
        let url = 'https://swapi.dev/api/starships/';
        if (nextUrl) url = nextUrl;

       try {
        // Making the API request using axios
        const response = await axios.get(url); // Axios ile API çağrısı
        setStarships(response.data.results); // Veriyi set et
        setNextUrl(response.data.next); // Sonraki URL'yi set et
       } catch (error) {
        console.error("Error fetching starships:", error);
       }
    };
    
    fetchStarships();  // Calling the fetch function
}, []);    // Empty dependency array means this will run once when the component mounts 

const handleSearch = (e) => {
    setSearchTerm(e.target.value);  // Updating the searchTerm state
};

// Filtering the starships based on the search term
const filteredStarships = starships.filter((starship) => 
starship.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
starship.model.toLowerCase().includes(searchTerm.toLowerCase())
);

// Function to load more starships if there is a next page URL
const loadMoreStarships = async () => {
    if (!nextUrl) return; // If there is no next URL, do not load more
    try {
        const response = await axios.get(nextUrl);
        setStarships(prevStarships => [...prevStarships, ...response.data.results]);
        setNextUrl(response.data.next);
    } catch (error) {
        console.error("Error fetching more starships:", error);
    }
};

// Function to navigate to the details page of a specific starship
const viewDetails = (starship) => {
    const id = starship.url.split('/').filter(Boolean).pop();
    navigate(`/starship/${id}`);
}
return (
    <div>
        {/* Header section with the logo and search bar */}
        <div className='header-content'>
            <img src={logo} alt="Star Wars" style={{ width: '300px', marginRight: '10px', borderRadius:'50px'}} />
            <input
            type="text" 
            placeholder='Name /Model'
            value={searchTerm}
            onChange={handleSearch} 
            />
        </div> 
        {/* Starships container displaying each starship */}
        <div className='starships-container'>
            {filteredStarships.map((starship) => (
                <div className='starship-card' key={starship.name}>
                    <img className='starship-image' 
                    src={ss}
                    alt={starship.name}
                    />
                    <div className='card-content'>
                        <h3>{starship.name}</h3>
                        <p>Model: {starship.model}</p>
                        <p>Speed: {starship.max_atmosphering_speed}</p>
                        <button onClick={() => viewDetails(starship)}>Details</button>
                    </div>                    
                </div>
            ))}
        </div>
        {/* If there is a next URL, display the "Load More" button */}
        {nextUrl && (
            <button onClick={loadMoreStarships}>Load More</button>
        )}        
    </div>
);
};

export default Starships;