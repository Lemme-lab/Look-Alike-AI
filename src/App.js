import React from 'react';
import './App.css';
import WebcamComponent from './WebcamComponent';
import ImageComponent from './ImageComponent';
import CelebMatchComponent from './CelebMatch';


function App() {
  return (
    <div className="App">
      <h1 className="title">Look-alike Detection</h1>
      <ImageComponent />
      <WebcamComponent />
      <CelebMatchComponent style={{ zIndex: 2 }}/>
    </div>
  );
}

export default App;
