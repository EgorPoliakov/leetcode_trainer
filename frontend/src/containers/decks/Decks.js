import React from 'react'
import { Deck } from '../../components';

const decks = [
    {
        id: 0,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 1,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   
        id: 2,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 3,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 4,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 5,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   id: 6,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 7,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 8,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 9,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   id: 10,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 11,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 0,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 1,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   
        id: 2,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 3,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 4,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 5,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   id: 6,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 7,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 8,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 9,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   id: 10,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 11,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 0,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 1,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   
        id: 2,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 3,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 4,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 5,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   id: 6,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 7,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 8,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {
        id: 9,
        title: 'some deck',
        difficulty: 'beginner'
    },
    {   id: 10,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 11,
        title: 'some deck',
        difficulty: 'beginner'
    }
]

function Decks() {
    const decksElement = decks.map((deck) => {
        return <Deck deckData={deck} key={deck.id} />
    });
    return (
        <div className='flex justify-center items-center col-start-2 col-end-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5'>
                {decksElement}
            </div>
        </div>
    );
}

export default Decks;