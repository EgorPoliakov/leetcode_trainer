import React from 'react'

function Card({ updateCardHandler, cardData }) {
    const again_quality = 0;
    const good_quality = 3;
    const easy_quality = 4;
    return (
        <div className='flex flex-col justify-between rounded-md bg-white shadow-md'>
            <div className='flex flex-col bg-gradient-to-b from-blue-500 to-blue-300 items-start rounded-t-md p-2'>
                <a href={cardData.url} className='text-white mb-3'>{cardData.title}</a>
                <div className='focus:outline-none bg-yellow-300 font-medium rounded-xl text-sm px-4 py-1'>{cardData.difficulty}</div>
            </div>
            <div className='flex place-content-center p-2'>
                <button 
                onClick={(event) => updateCardHandler(again_quality)}
                type='button' 
                className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                Again
                </button>
                <button 
                onClick={(event) => updateCardHandler(good_quality)}
                type='button' 
                className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                Good
                </button>
                <button 
                onClick={(event) => updateCardHandler(easy_quality)}
                type='button' 
                className='focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-900'>
                Easy
                </button>
                
            </div>
        </div>
    );
}

export default Card;