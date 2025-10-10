import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for React 18+
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import './styles.css';
import NewRoutes from './Routes/NewRoutes'; // Adjust the path to where your routes file is located

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <NewRoutes /> {/* Render the NewRoutes component */}
    </Router>
  </React.StrictMode>
);
