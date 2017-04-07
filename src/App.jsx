import React    from 'react';
import { Link } from 'react-router';

const App = () => (
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
    <br />
    <Link to="/custom">Custom</Link>
  </p>
);

export default App;
