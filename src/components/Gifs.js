import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GiphyGifs = () => {
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/giphy_gifs')
            .then(response => {
                setGifs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Giphy GIFs:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading GIFs. Please try again later.</p>;

    return (
        <div>
            <h1>Latest Giphy GIFs</h1>
            <ul>
                {gifs.map((gif, index) => (
                    <li key={index}>
                        <img src={gif.url} alt={gif.title} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                        <h2>{gif.title}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GiphyGifs;
