import React from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  
  // Generate a color that is not too close to white
  do {
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (isTooCloseToWhite(color));

  return color;
};

const isTooCloseToWhite = (color) => {
  // Define a threshold to determine if a color is too close to white
  const threshold = 0xC0;

  // Extract RGB values from the color
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Check if the color is too close to white
  return r > threshold && g > threshold && b > threshold;
};

const ProgressBar = ({ percentage }) => {
  const containerStyles = {
    width: '100%',
    height: '16px',
    backgroundColor: 'gray',
    borderRadius: '9999px',
  };

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: getRandomColor(),
    borderRadius: '9999px',
  };

  return (
    <div style={containerStyles} className='overflow-hidden'>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
