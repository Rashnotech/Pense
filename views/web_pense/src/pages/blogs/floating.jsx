import React, { forwardRef, useState } from 'react';
import './float.css';

const FloatingActionButtons = React.forwardRef(( props, ref ) => {
  const { onAddImage, onAddEmbed, onAddCode } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center space-x-2 z-10 absolute -left-4" ref={ref}>
      <button className="border border-black rounded-full w-8 h-8 flex justify-center items-center bg-white" onClick={toggleMenu}>
        <span className="material-symbols-light--add"></span>
      </button>
      {isOpen && (
        <div className="flex items-center justify-center space-x-2">
          <button className='border p-2 border-green-400 w-8 h-8 flex justify-center items-center rounded-full'
            onClick={onAddImage}>
              <span className="mage--image"></span>
            </button>
          <button className='border w-8 h-8 flex justify-center items-center p-2 border-green-400 rounded-full'
            onClick={onAddEmbed}>
              <span className="fluent-mdl2--embed"></span>
            </button>
          <button
            className='border p-2 border-green-400 w-8 h-8 flex justify-center items-center rounded-full'
            onClick={onAddCode}
            >
              <span className="bx--code-curly"></span>
            </button>
        </div>
      )}
    </div>
  );
});

export default FloatingActionButtons;
