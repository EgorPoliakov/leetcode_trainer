import React, {useState, useEffect} from 'react'
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

import DifficultyLabel from '../difficulty_label/DifficultyLabel';

function Card({ updateCardHandler, cardData }) {
    const question = cardData.question;
    const buttonClick = (quality, animationDirection) => {
        api.start({
            from: {opacity: 1, x: 0},
            to: {opacity: 0, x: animationDirection},
            onRest: () => { 
                updateCardHandler(quality);
            },
        });
    };

    const [fadeOutAnimation, api] = useSpring(() => ({
        from: {opacity: 0, x: 0, y: -50},
        to: {opacity: 1, x: 0, y: 0}
    }));

    useEffect(() => {
        api.start({
            from: {opacity: 0, x: 0, y: -50},
            to: {opacity: 1, x: 0, y: 0}
        });
    }, [cardData.id]);

    const again_quality = 0;
    const easy_quality = 5;
    return (
        <>
            {<animated.div style={fadeOutAnimation} className='flex flex-col justify-between rounded-md bg-third shadow-md w-64'>
            <div className='flex flex-col bg-second items-start rounded-t-md p-2'>
                <a href={question.url} target="_blank" rel="noopener noreferrer" className='text-white mb-3'>{question.title}</a>
                <DifficultyLabel difficulty={question.difficulty}/>
            </div>
            <div className='flex justify-around items-center p-2 h-16'>
                {/* <button 
                
                type='button' 
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                Again
                </button> */}
                <FontAwesomeIcon fontSize={30} icon={faThumbsDown} className='text-white cursor-pointer hover:text-second transition duration-300' onClick={(event) => buttonClick(easy_quality, -100)}/>
                <FontAwesomeIcon fontSize={30} icon={faThumbsUp} className='text-white cursor-pointer hover:text-second transition duration-300' onClick={(event) => buttonClick(again_quality, 100)}/>

            </div>
        </animated.div>}
        </>
    );
}

export default Card;