import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import ss from './images/starship.webp';

const StarshipDetail = () => {
    const { id } = useParams();
    const [starship, setStarship] = useState(null); // State to hold the starship data
    const navigate = useNavigate();  // Hook to navigate back to the previous page

    useEffect(() => {
        // Function to fetch starship data using the API
        const fetchStarship = async () => {
            console.log('Starship ID:', id);
            try {
                const response = await axios.get(`https://swapi.dev/api/starships/${id}`);
                setStarship(response.data);
            } catch (error) {
                // Handling any errors that might occur during the fetch
                console.error("Error fetching starship details:", error);
            }
        };
        fetchStarship(); // Calling the fetch function
    }, [id]); // Dependency array to re-run the effect whenever the 'id' changes
    
    // If starship data is not yet loaded, display a loading message
    if (!starship) return <p>Loading...</p>;

    return (
        <div className='starship-card'>
            <img className='starship-image' 
                    src={ss}
                    alt={starship.name}
                    />
            <div className="card-content">   
                <h2>{starship.name}</h2>
                <p>Model: {starship.model}</p>
                <p>Passengers: {starship.passengers}</p>
                <p>Max Speed: {starship.max_atmosphering_speed}</p>
                <p>Manufacturer: {starship.manufacturer}</p>
                <p>Crew: {starship.crew}</p>
                <p>Cargo Capacity: {starship.cargo_capacity}</p>
                  {/* Button to navigate back to the previous page */}
                <button onClick={() => navigate(-1)}>Back to List</button>
            </div> 
        </div>
    );
};

export default StarshipDetail;