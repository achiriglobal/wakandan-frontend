import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GiphyGifs.css';

const GiphyGifs = () => {
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGifs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/giphy_gifs');
                setGifs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching GIFs:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchGifs();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading GIFs. Please try again later.</p>;

    return (
        <div className="borders">
            <div className="border left">
                {gifs.map((gif, index) => (
                    <img key={index} src={gif.url} alt={gif.title} />
                ))}
            </div>
            <div className="border right">
                {gifs.map((gif, index) => (
                    <img key={index} src={gif.url} alt={gif.title} />
                ))}
            </div>
        </div>
    );
};

export default GiphyGifs;
