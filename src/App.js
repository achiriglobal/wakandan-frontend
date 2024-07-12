import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feed from './components/Feed';
import Videos from './components/Videos';
import Events from './components/Events';
import GiphyGifs from './components/GiphyGifs';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <GiphyGifs />
                <div className="content-wrapper">
                    <nav>
                        <ul>
                            <li><Link to="/">Feed</Link></li>
                            <li><Link to="/videos">Videos</Link></li>
                            <li><Link to="/events">Events</Link></li>
                        </ul>
                    </nav>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Feed />} />
                            <Route path="/videos" element={<Videos />} />
                            <Route path="/events" element={<Events />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
