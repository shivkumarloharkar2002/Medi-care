import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import DoctorList from './DoctorList';
import './style.css'; // Ensure this path is correct

// Main App Component
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/doctor-list" component={DoctorList} />
      {/* Add other routes as needed */}
    </Switch>
  </Router>
);

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));
