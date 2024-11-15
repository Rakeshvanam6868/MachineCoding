import React, { useState } from 'react';
import './Popover.css';

const Popover = () => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopover = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="popover-container">
      <button className="popover-button" onClick={togglePopover}>
        Click me
      </button>
      {isVisible && <div className="popover-content">This is the popover content.</div>}
    </div>
  );
};

export default Popover;
