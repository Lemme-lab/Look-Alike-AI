import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css';

import * as tmImage from '@teachablemachine/image';

let model, webcam, labelContainer, maxPredictions;

const URL = 'https://teachablemachine.withgoogle.com/models/3zZee5_vA/';

function WebcamComponent({ onPredictions }) {
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';

      model = await tmImage.load(modelURL, metadataURL);

      // Get the max number of predictions from the model
      maxPredictions = model.getTotalClasses();
    };

    const captureInterval = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
          // Create an Image object and load the image
          const img = new Image();
          img.src = imageSrc;

          // Wait for the image to load
          img.onload = async () => {
            if (!model) {
              await loadModel();
            }

            // Make predictions
            const prediction = await model.predict(img, { maxPredictions });
            console.log('Predictions:', prediction);

            // Pass predictions to the parent component (App)
            onPredictions(prediction);
          };
        } else {
          console.error('Failed to capture an image.');
        }
      }
    }, 2000);

    return () => {
      clearInterval(captureInterval);
    };
  }, [onPredictions]);

  return (
    <div className="webcam-container">
      <div className="background-content">
        {/* Your other content here */}
      </div>
      <div className="webcam-frame">
        <Webcam
          audio={false}
          mirrored={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: window.innerWidth / 2 - 150,
            height: window.innerHeight - 150,
            facingMode: 'user',
          }}
        />
      </div>
    </div>
  );
}

export default WebcamComponent;
