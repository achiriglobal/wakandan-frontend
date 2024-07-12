import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RssFeeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching data...');
        axios.get('http://127.0.0.1:5000/api/rss_feeds')
            .then(response => {
                console.log('Data fetched:', response.data);
                setFeeds(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching RSS feeds:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading feeds. Please try again later.</p>;

    return (
        <div>
            <h1>Latest News</h1>
            <ul>
                {feeds.map((feed, index) => (
                    <li key={index} style={{ display: 'flex', marginBottom: '20px' }}>
                        {feed.media && (
                            <img src={feed.media} alt={feed.title} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                        )}
                        <div>
                            <a href={feed.link} target="_blank" rel="noopener noreferrer">
                                <h2>{feed.title}</h2>
                            </a>
                            <p>{feed.description}</p>
                            <small>Published on: {new Date(feed.published).toLocaleString()}</small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RssFeeds;
