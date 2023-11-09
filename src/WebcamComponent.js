import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css';

import * as tmImage from '@teachablemachine/image';

let model, model2, webcam, labelContainer, maxPredictions, maxPredictions2;

const URL = 'https://teachablemachine.withgoogle.com/models/3zZee5_vA/';
const URL2 = 'https://teachablemachine.withgoogle.com/models/4_mbC0O3q/';

function WebcamComponent({ onPredictions }) {
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';

      const modelURL2 = URL2 + 'model.json';
      const metadataURL2 = URL2 + 'metadata.json';

      model = await tmImage.load(modelURL, metadataURL);
      model2 = await tmImage.load(modelURL2, metadataURL2);

      maxPredictions = model.getTotalClasses();
      maxPredictions2 = model2.getTotalClasses();
    };


    const captureInterval = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;

          img.onload = async () => {
            if (!model) {
              await loadModel();
            }

            if (!model2) {
              await loadModel(); 
            }

            const prediction = await model.predict(img, { maxPredictions });
            const prediction2 = await model2.predict(img, { maxPredictions2 });

            console.log(prediction2);

            // Find the index of the highest probability in prediction2
            const highestProbabilityIndex = prediction2.reduce(
              (maxIndex, element, currentIndex, array) => {
                return element.probability > array[maxIndex].probability
                  ? currentIndex
                  : maxIndex;
              },
              0
            );

            // Determine whether to adjust male or female probabilities based on the highest probability in prediction2
            const highestClassName2 = prediction2[highestProbabilityIndex].className;

            if (highestClassName2 === "Men") {
              // Add 20% to the probabilities of specified male names
              const maleNamesToAdjust = [
                "Brad Pitt",
                "Denzel Washington",
                "Hugh Jackman",
                "Johnny Depp",
                "Leonardo DiCaprio",
                "Robert Downey Jr",
                "Tom Cruise",
                "Tom Hanks",
                "Will Smith"
              ];
              maleNamesToAdjust.forEach((name) => {
                const index = prediction.findIndex((element) => element.className === name);
                if (index !== -1) {
                  //console.log("Before: " +  prediction[index].probability);
                  prediction[index].probability += 0.2 * prediction[index].probability;
                  //console.log("After: " +  prediction[index].probability);
                }
              });
            } else if (highestClassName2 === "Women") {
              // Add 20% to the probabilities of specified female names
              const femaleNamesToAdjust = ["Jennifer Lawrence", "Kate Winslet", "Megan Fox", "Natalie Portman", "Nicole Kidman", "Sandra Bullock", "Scarlett Johansson"];
              femaleNamesToAdjust.forEach((name) => {
                const index = prediction.findIndex((element) => element.className === name);
                if (index !== -1) {
                  prediction[index].probability += 0.2 * prediction[index].probability;
                }
              });
            }

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
