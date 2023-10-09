import React, { useState, useEffect } from 'react'
import { Deck } from '../../components';
import api from '../../Api';

function Decks() {
    const [decks, setDecks] = useState([]);

    const fetchDecks = async () => {
        const response = await api.get('/decks?skip=0&limit=2');
        setDecks(response.data);
    }

    useEffect(() => {
        fetchDecks();
    }, []);

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