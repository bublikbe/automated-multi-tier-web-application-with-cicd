import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>React Frontend</h1>
      <p>{message || 'Fetching data from backend...'}</p>
    </div>
  );
}

export default App;

// Dockerfile for Cloud Run
define(`Dockerfile`, `
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
`);

// Environment Variables (.env file for local development)
define(`.env`, `
REACT_APP_BACKEND_URL=http://localhost:8080
`);
