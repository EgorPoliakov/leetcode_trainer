import React from 'react';
import constants from '../../constants';

function DifficultyLabel({difficulty}) {
    const difficultyMapping = constants.difficultyMapping;
    const difficultyColor = difficultyMapping[difficulty].color; 
    const difficultyText = difficultyMapping[difficulty].text;
    
    return (
        <div className={`focus:outline-none ${difficultyColor} font-medium rounded-xl text-sm mt-auto text-white px-4 py-1`}>
            {difficultyText}
        </div>
    );
}

export default DifficultyLabel;