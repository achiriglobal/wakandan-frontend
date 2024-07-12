import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Account = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile. Please try again later.</p>;

    return (
        <div>
            <h1>Account</h1>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default Account;
