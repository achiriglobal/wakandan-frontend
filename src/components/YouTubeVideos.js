import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/youtube_videos')
            .then(response => {
                setVideos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading videos. Please try again later.</p>;

    return (
        <div>
            <h1>Latest Videos</h1>
            <ul>
                {videos.map((video, index) => (
                    <li key={index}>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                        ></iframe>
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Videos;
