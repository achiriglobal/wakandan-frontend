import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const location = 'Africa';  // This should be dynamic based on user location
                const response = await axios.get(`http://127.0.0.1:5000/api/eventbrite_events?location=${location}`);
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading events. Please try again later.</p>;

    return (
        <div className="events">
            <h1>Upcoming Events</h1>
            <div className="events-content">
                {events.map((event, index) => (
                    <div key={index} className="event-item">
                        <h2>{event.name}</h2>
                        <img src={event.logo} alt={event.name} className="event-image" />
                        <p>{event.description}</p>
                        <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
                        <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
                        <a href={event.url} className="read-more">More Info</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
