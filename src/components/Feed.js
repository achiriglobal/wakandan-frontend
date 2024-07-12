import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

const Feed = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rssResponse = await axios.get('http://127.0.0.1:5000/api/rss_feeds');
                const videoResponse = await axios.get('http://127.0.0.1:5000/api/youtube_videos');
                const giphyResponse = await axios.get('http://127.0.0.1:5000/api/giphy_gifs');
                const combinedContent = [
                    ...rssResponse.data,
                    ...videoResponse.data,
                    ...giphyResponse.data,
                ];

                // Filter out content without a picture or video
                const filteredContent = combinedContent.filter(item => item.media || item.videoId);

                // Randomize the content
                filteredContent.sort(() => Math.random() - 0.5);
                setContent(filteredContent);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching content:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content. Please try again later.</p>;

    return (
        <div className="feed">
            <h1>Latest Feeds</h1>
            <div className="feed-content">
                {content.map((item, index) => (
                    <div key={index} className="feed-item">
                        <h2>{item.title}</h2>
                        {item.media ? (
                            <img src={item.media} alt={item.title} className="feed-image" />
                        ) : item.videoId ? (
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${item.videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={item.title}
                                className="feed-video"
                            ></iframe>
                        ) : null}
                        <p>{item.description}</p>
                        <a href={item.link} className="read-more">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
