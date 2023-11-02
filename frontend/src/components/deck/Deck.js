import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import 'react-circular-progressbar/dist/styles.css';
import DifficultyLabel from '../difficulty_label/DifficultyLabel';

function Deck({deckData}) {
    const cardsLearned = deckData.cards_learned;
    const cardsStudying = deckData.cards_studying;
    const cardsToReview = deckData.cards_to_review;
    const cardsOverall = cardsLearned + cardsStudying + cardsToReview;
    const percent = 100 * cardsLearned / cardsOverall;
    return (
        <div className='group flex flex-col justify-between rounded-md bg-third shadow-md hover:drop-shadow-lg transition duration-300 hover:-translate-y-1'>
            <div className='flex flex-col bg-second items-start rounded-t-md p-2'>
                <p className='text-white text-xl font-semibold mb-3'>{deckData.title}</p>
                <DifficultyLabel difficulty={deckData.difficulty}/>
            </div>
            <div className='flex items-center justify-evenly p-2 w-80'>
                <div className='flex flex-col text-center'>
                    <div className='text-xl font-bold text-white'>{cardsLearned}</div>
                    <div className='text-gray-400'>Learned</div>
                </div>
                <div className='flex flex-col text-center text-white'>
                    <div className='text-xl font-bold'>{cardsStudying}</div>
                    <div className='text-gray-400'>Studying</div>
                </div>
                <div className='flex flex-col text-center text-white'>
                    <div className='text-xl font-bold'>{cardsToReview}</div>
                    <div className='text-gray-400'>New</div>
                </div>
                <div className='w-16'>
                    <CircularProgressbarWithChildren value={percent}>
                        <Link to='/study' state={deckData} className="absolute text-xl text-second">
                            <FontAwesomeIcon icon={faPlay} />
                        </Link>
                    </CircularProgressbarWithChildren>
                </div>
            </div>
        </div>
    );
}

export default Deck;