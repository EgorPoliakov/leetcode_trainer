import React from 'react';
import { Link } from 'react-router-dom';
import DifficultyLabel from '../difficulty_label/DifficultyLabel';

function Deck({deckData}) {
    
    return (
        <div className='flex flex-col justify-between rounded-md bg-white shadow-md'>
            <div className='flex flex-col bg-gradient-to-b from-blue-500 to-blue-300 items-start rounded-t-md p-2'>
                <p className='text-white text-xl font-semibold mb-3'>{deckData.title}</p>
                <DifficultyLabel difficulty={deckData.difficulty}/>
            </div>
            <div className='flex place-content-center justify-evenly p-2'>
                <div className='flex flex-col text-center'>
                    <div className='text-xl font-bold'>10</div>
                    <div className='text-gray-400'>Cards</div>
                </div>
                <Link className='flex items-center' to={`/study`} state={deckData.id}>Study</Link>
            </div>
        </div>
    );
}

export default Deck;