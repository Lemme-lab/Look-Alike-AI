import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import './WebcamComponent.css';

function WebcamComponent() {
  const webcamRef = useRef(null);

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
            width: window.innerWidth / 2 - 150, /* Half the screen width */
            height: window.innerHeight - 150, /* Full screen height */
            facingMode: 'user',
          }}
        />
      </div>
    </div>
  );
}

export default WebcamComponent;
