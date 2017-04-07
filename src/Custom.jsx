import React    from 'react';
import { Link } from 'react-router';

const App = () => (
  <p className="App-intro">
    This is our cutom component!
    <br />
    <Link to="/">Home</Link>
  </p>
);

export default App;
