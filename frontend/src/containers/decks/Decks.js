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
    }
]

function Decks() {
    return (
        <div className='grid grid-cols-4 grid-rows-2 gap-5'>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
            <Deck deckData={decks[0]}/>
        </div>
    );
}

export default Decks;