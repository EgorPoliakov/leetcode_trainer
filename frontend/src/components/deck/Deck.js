import React from 'react';
import { Link } from 'react-router-dom';

function Deck({deckData}) {
    return (
        <div className='flex flex-col justify-between rounded-md bg-white shadow-md'>
            <div className='flex flex-col bg-gradient-to-b from-blue-500 to-blue-300 items-start rounded-t-md p-2'>
                <p className='text-white mb-3'>{deckData.title}</p>
                <div className='focus:outline-none bg-yellow-300 font-medium rounded-xl text-sm px-4 py-1'>{deckData.difficulty}</div>
            </div>
            <div className='flex place-content-center p-2'>
            <Link to={`/study`} state={deckData.id}>Study</Link>
            </div>
        </div>
    );
}

export default Deck;