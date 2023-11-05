import React from 'react';
import img from './img.jpg';
import './ImageComponent.css';

function ImageComponent() {
  return (
    <div className="image-container">
      <img src={img} alt="Your Image" className="scaled-image" />
    </div>
  );
}

export default ImageComponent;
