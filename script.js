import React, { useEffect, useRef, useState } from 'react';
import './CircularText.css'; // Import styles separately for cleaner code

const CircularText = ({ text = '', spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const radius = 100; // distance from center
    const characters = text.split('');
    const angleIncrement = 360 / characters.length;

    const container = containerRef.current;
    container.innerHTML = ''; // Clear previous content

    characters.forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char;
      const angle = i * angleIncrement;

      span.style.position = 'absolute';
      span.style.transform = `
        rotate(${angle}deg)
        translate(${radius}px)
        rotate(${-angle}deg)
      `;

      container.appendChild(span);
    });
  }, [text]);

  const handleMouseEnter = () => {
    if (onHover === 'speedUp') {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (onHover === 'speedUp') {
      setHovered(false);
    }
  };

  const actualDuration = hovered ? spinDuration / 3 : spinDuration;

  return (
    <div
      className={`circular-text-wrapper ${className}`}
      style={{ animationDuration: `${actualDuration}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="circular-text" ref={containerRef}></div>
    </div>
  );
};

export default CircularText;
