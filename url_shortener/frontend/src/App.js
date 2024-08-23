import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const response = await axios.post('http://localhost:3000/shorten', { url });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError('Error shortening URL. Please make sure the URL is valid.');
    }
  };

  return (
    <div className='App'>
      <div className='App-header'>
      <h1 >URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" required style={{ padding: '10px', width: '300px' }}/>
        <button type="submit" style={{ padding: '10px' }}>Shorten</button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}</div>
    </div>
  );
};

export default App;
