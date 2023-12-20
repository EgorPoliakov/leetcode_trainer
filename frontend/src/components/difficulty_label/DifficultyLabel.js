import React from 'react';
import constants from '../../constants';

function DifficultyLabel({difficulty, type}) {
    const difficultyMappingCards = constants.difficultyMapping;
    const difficultyMappingDecks = constants.difficultyMappingDecks;
    const difficultyColor = difficultyMappingCards[difficulty].color; 
    
    let difficultyText;
    if (type === 'deck') {
        difficultyText = difficultyMappingDecks[difficulty].text;
    } else {
        difficultyText = difficultyMappingCards[difficulty].text;
    }
    
    return (
        <div className={`focus:outline-none ${difficultyColor} font-medium rounded-xl text-sm mt-auto text-center text-white px-4 py-1`}>
            {difficultyText}
        </div>
    );
}

export default DifficultyLabel;