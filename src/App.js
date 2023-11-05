import React, { useState } from 'react';
import './App.css';
import WebcamComponent from './WebcamComponent';
import ImageComponent from './ImageComponent';
import CelebMatchComponent from './CelebMatch';

function App() {
  const [predictions, setPredictions] = useState([]);

  // Callback function to receive predictions from WebcamComponent
  const handlePredictions = (newPredictions) => {
    setPredictions(newPredictions);
  };

  return (
    <div className="App">
      <h1 className="title">Look-alike Detection</h1>
      <ImageComponent predictions={predictions} />
      <WebcamComponent onPredictions={handlePredictions} />
      <CelebMatchComponent predictions={predictions} />
    </div>
  );
}

export default App;
