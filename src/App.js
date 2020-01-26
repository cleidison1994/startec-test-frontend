import React from 'react';

import './styles.css'
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header/>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}
export default App;
