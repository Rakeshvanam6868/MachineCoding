import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion-container">
      {sections.map((section, index) => (
        <div className="accordion-item" key={index}>
          <button
            className="accordion-title"
            onClick={() => toggleAccordion(index)}
          >
            {section.title}
          </button>
          <div
            className="accordion-content"
            style={{
              maxHeight: index === activeIndex ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
