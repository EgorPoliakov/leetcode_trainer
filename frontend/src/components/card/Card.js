import React from 'react'

function Card({ updateCardHandler, cardData }) {
    const again_quality = 0;
    const good_quality = 3;
    const easy_quality = 4;
    return (
        <div className='flex flex-col rounded-md bg-white place-content-center h-32'>
            <a href={cardData.url} className='text-center'>{cardData.title}</a>
            <p className='text-center'>{cardData.difficulty}</p>
            <div className='flex place-content-center'>
                <button 
                onClick={(event) => updateCardHandler(again_quality)}
                type='button' 
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                Again
                </button>
                <button 
                onClick={(event) => updateCardHandler(good_quality)}
                type='button' 
                className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                Good
                </button>
                <button 
                onClick={(event) => updateCardHandler(easy_quality)}
                type='button' 
                className='focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-blue-900'>
                Easy
                </button>
                
            </div>
        </div>
    );
}

export default Card;