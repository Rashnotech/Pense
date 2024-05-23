import React, { useState, forwardRef } from 'react';
import './floating.css';

const FloatingActionButtons = forwardRef((props, ref) => {
    const { onAddImage, onAddEmbed, onAddCode } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute -left-10 w-fit flex items-center space-x-4" ref={ref}>
        <button className="rounded-full ring-1 ring-gray-500 w-8 h-8 flex items-center justify-center" onClick={toggleMenu}>
            <span class="material-symbols-light--add"></span>
        </button>
        {isOpen && (
            <div className="flex items-center space-x-3">
                <button className='rounded-full ring-1 flex items-center justify-center bg-green-600/20 ring-green-600 w-8 h-8' onClick={onAddImage}>
                    <span class="mage--image"></span>
                </button>
                <button className='rounded-full flex items-center justify-center ring-1 bg-green-600/20 ring-green-600 w-8 h-8' onClick={onAddEmbed}>
                    <span class="mynaui--code"></span>
                </button>
                <button className='rounded-full flex items-center justify-center ring-1 bg-green-600/20 ring-green-600 w-8 h-8' onClick={onAddCode}>
                    <span class="bx--code-curly"></span>
                </button>
            </div>
        )}
        </div>
    );
});

export default FloatingActionButtons;
