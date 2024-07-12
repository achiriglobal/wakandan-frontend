import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Feed from './components/Feed';
import YouTubeVideos from './components/YouTubeVideos';
import GiphyGifs from './components/GiphyGifs';
import Account from './components/Account';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Feed</Link></li>
                        <li><Link to="/videos">Videos</Link></li>
                        <li><Link to="/gifs">GIFs</Link></li>
                        <li><Link to="/account">Account</Link></li>
                    </ul>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/videos" element={<YouTubeVideos />} />
                        <Route path="/gifs" element={<GiphyGifs />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
