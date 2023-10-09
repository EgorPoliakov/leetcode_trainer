import React from 'react';
import difficultyMapping from '../../constants';

function DifficultyLabel({difficulty}) {
    const difficultyColor = difficultyMapping[difficulty].color; 
    const difficultyText = difficultyMapping[difficulty].text;
    
    return (
        <div className={`focus:outline-none ${difficultyColor} font-medium rounded-xl text-sm text-white px-4 py-1`}>
            {difficultyText}
        </div>
    );
}

export default DifficultyLabel;