import React, {useState, useEffect} from 'react'
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faLightbulb, faBookOpen, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import DifficultyLabel from '../difficulty_label/DifficultyLabel';

function Card({ updateCardHandler, cardData }) {
    const question = cardData.question;
    const questionReview = cardData.question_reviews;
    const buttonClick = (quality, animationDirection) => {
        api.start({
            from: {opacity: 1, x: 0},
            to: {opacity: 0, x: animationDirection},
            onRest: () => { 
                updateCardHandler(quality);
            },
        });
    };

    let progressIcon = null;
    console.log(questionReview)
    if (questionReview.length === 0) {
        progressIcon = null;
    } else if (questionReview[0].repetitions === 0) {
        progressIcon = <FontAwesomeIcon fontSize={30} icon={faLightbulb} className='text-white'/>;
    } else if (questionReview[0].easiness < 2.5) {
        progressIcon = <FontAwesomeIcon fontSize={30} icon={faBookOpen} className='text-white'/>
    } else {
        progressIcon = <FontAwesomeIcon fontSize={30} icon={faCircleCheck} className='text-white'/>
    }

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
            {<animated.div style={fadeOutAnimation} className='flex flex-col justify-between rounded-md bg-third shadow-md w-64 h-48'>
            <div className='flex bg-second rounded-t-md p-4 h-[80%]'>
                <div className='flex flex-col items-start'>
                    <a href={question.url} target="_blank" rel="noopener noreferrer" className='text-white mb-3'>{question.title}</a>
                    <DifficultyLabel difficulty={question.difficulty}/>
                </div>
                <div className='flex ml-auto'>
                    {progressIcon}
                </div>
            </div>
            <div className='flex justify-around items-center p-2 h-16'>
                <FontAwesomeIcon fontSize={30} icon={faThumbsDown} className='text-white cursor-pointer hover:text-second transition duration-300' onClick={(event) => buttonClick(easy_quality, -100)}/>
                <FontAwesomeIcon fontSize={30} icon={faThumbsUp} className='text-white cursor-pointer hover:text-second transition duration-300' onClick={(event) => buttonClick(again_quality, 100)}/>

            </div>
        </animated.div>}
        </>
    );
}

export default Card;