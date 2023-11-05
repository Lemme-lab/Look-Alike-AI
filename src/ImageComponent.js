import React from 'react';
import defaultImage from './images/placeholder.jpg'; 
import './ImageComponent.css';

function ImageComponent({ predictions }) {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="image-container">
        <img src={require('./images/placeholder.jpg')} alt="Your Image" className="scaled-image" />
      </div>
    );
  }

  const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);
  const highestProbabilityName = sortedPredictions[0].className;
  const imageSource = require(`./images/${highestProbabilityName.toLowerCase().replace(/\s/g, '_')}.jpg`) || require('./images/placeholder.jpg');

  return (
    <div className="image-container">
      <img src={imageSource} alt="Your Image" className="scaled-image" />
    </div>
  );
}


export default ImageComponent;
