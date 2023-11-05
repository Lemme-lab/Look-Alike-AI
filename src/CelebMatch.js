import React, { useState, useEffect } from 'react';
import './CelebMatch.css';

function CelebMatchComponent({ predictions }) {
  const [showMatches, setShowMatches] = useState(false);
  const [celebrityName, setCelebrityName] = useState('');
  const [matchingCelebs, setMatchingCelebs] = useState([]);

  // Use useEffect to handle predictions and update state
  useEffect(() => {
    if (predictions.length > 0) {
      const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);
      const top4Predictions = sortedPredictions.slice(0, 4);

      setCelebrityName(top4Predictions[0].className);

      const updatedMatchingCelebs = top4Predictions.map((prediction) => ({
        name: prediction.className,
        percentage: (prediction.probability * 100).toFixed(1),
      }));

      setMatchingCelebs(updatedMatchingCelebs);
    }
  }, [predictions]);

  return (
    <div className="celeb-container">
      <div className="celeb-name" onClick={() => setShowMatches(!showMatches)}>
        <span className="main-celeb">{celebrityName}</span>
      </div>
      {showMatches && (
        <div className="matching-celebs">
          {matchingCelebs.map((celeb) => (
            <div key={celeb.name} className={`match-item${celeb.name === celebrityName ? ' main-celeb' : ''}`}>
              {celeb.name} - {celeb.percentage}%
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CelebMatchComponent;
