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
    const cardsNew = deckData.cards_new;
    const cardsOverall = cardsLearned + cardsStudying + cardsNew;
    const percent = 100 * cardsLearned / cardsOverall;
    return (
        <div className='group flex flex-col justify-between rounded-md bg-third shadow-md hover:drop-shadow-lg transition duration-300 hover:-translate-y-1'>
            <div className='flex bg-second justify-between rounded-t-md p-2'>
                <div className='flex flex-col items-start'>
                    <p className='text-white text-xl font-semibold mb-3'>{deckData.title}</p>
                    <DifficultyLabel difficulty={deckData.difficulty} type={'deck'}/>
                </div>
                <div className='text-white justify-center font-semibold'>
                    Today: {cardsToReview}
                </div>
            </div>
            
            <div className='flex justify-center'>
                <div className='flex items-center justify-evenly p-2 w-full'>
                    <div className='flex flex-col text-center'>
                        <div className='text-xl font-bold text-white'>{cardsLearned}</div>
                        <div className='text-gray-400'>Learned</div>
                    </div>
                    <div className='flex flex-col text-center text-white'>
                        <div className='text-xl font-bold'>{cardsStudying}</div>
                        <div className='text-gray-400'>Studying</div>
                    </div>
                    <div className='flex flex-col text-center text-white'>
                        <div className='text-xl font-bold'>{cardsNew}</div>
                        <div className='text-gray-400'>New</div>
                    </div>
                    <Link to='/deck_table' state={deckData} className="text-xl text-second w-16">
                        <CircularProgressbarWithChildren value={percent}>
                                <FontAwesomeIcon icon={faPlay} />
                        </CircularProgressbarWithChildren>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Deck;