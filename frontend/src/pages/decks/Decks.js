import React, { useState, useEffect } from 'react'
import { Deck } from '../../components';
import api from '../../Api';
import { Footer, Header } from '../../containers';

function Decks() {
    const [decks, setDecks] = useState([]);

    const fetchDecks = async () => {
        const response = await api.get('http://localhost:8000/decks?skip=0&limit=2', {withCredentials: true});
        setDecks(response.data);
    }

    useEffect(() => {
        fetchDecks();
    }, []);

    const decksElement = decks.map((deck) => {
        return <Deck deckData={deck} key={deck.id} />
    });
    return (
        <>
            <Header showHero={false}/>
            <div className='flex justify-center items-center col-span-full bg-main'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
                    {decksElement}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Decks;