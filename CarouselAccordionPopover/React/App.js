import React from 'react';
import Carousel from './Carousel';
import Accordion from './Accordion';
import Popover from './Popover';

function App() {
  const accordionSections = [
    { title: 'Section 1', content: 'Content for Section 1' },
    { title: 'Section 2', content: 'Content for Section 2' },
    { title: 'Section 3', content: 'Content for Section 3' },
  ];

  return (
    <div>
      <h1>React Components</h1>
      <h2>Carousel</h2>
      <Carousel />
      <h2>Accordion</h2>
      <Accordion sections={accordionSections} />
      <h2>Popover</h2>
      <Popover />
    </div>
  );
}

export default App;
