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
    {   id: 2,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 3,
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
    {   id: 2,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 3,
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
    {   id: 2,
        title: 'some deck',
        difficulty: 'beginner'
    },
    { 
        id: 3,
        title: 'some deck',
        difficulty: 'beginner'
    }
]

function Decks() {
    const decksElement = decks.map((deck) => {
        return <Deck deckData={deck} key={deck.id} />
    });
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {decksElement}
        </div>
    );
}

export default Decks;