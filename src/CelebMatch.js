import React, { useState } from 'react';
import './CelebMatch.css';

function CelebMatchComponent() {
  const [showMatches, setShowMatches] = useState(false);
  const celebrityName = 'Brad Pitt'; // Replace with the name of the main celebrity
  const matchingCelebs = [
    { name: 'Tom Cruise', percentage: 90.8 },
    { name: 'Angelina Jolie', percentage: 88.2 },
    { name: 'Leonardo DiCaprio', percentage: 85.5 },
    // Add more celebrities and matching percentages as needed
  ];

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
