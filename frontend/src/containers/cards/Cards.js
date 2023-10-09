import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card } from '../../components';
import api from '../../Api';

function Cards() {
    const location = useLocation();
    const deckId = location.state;
    const [deck, setDeck] = useState([]);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    const fetchDeck = async () => {
        const response = await api.get(`/decks/${deckId}/study`);
        setDeck(response.data);
    };

    const finishCardHandler = async (quality) => {
        const reviewId = deck[currentCardIdx].question_reviews[0].id;
        const requestData = {quality: quality};
        console.log(requestData);
        const response = await api.put(`/reviews/${reviewId}`, requestData);
        console.log(response.data);
    }

    const updateCardHandler = (quality) => {
        finishCardHandler(quality);
        setCurrentCardIdx(
            (prevCardIdx) => prevCardIdx + 1
        );
    }

    useEffect(() => {
        fetchDeck();
    }, [currentCardIdx]);

    let cardElement = <Card updateCardHandler={updateCardHandler} cardData={deck[currentCardIdx]}/>;
    if (deck.length == 0) {
        cardElement = <div>
            Loading
        </div>
    }

    if (currentCardIdx != 0 && currentCardIdx >= deck.length) {
        cardElement = <div>
            Finished all cards!
            <Link to='/decks'>Home</Link>
        </div>

    }

    return (
        <div className='col-start-2 col-end-10'>
            <h2 className='text-center justify-self-start p-5'>Deck {deckId}</h2>
            <div className='flex h-full items-center justify-center -mt-16'>
                {cardElement}
            </div>
        </div>
        
        
    );
}

export default Cards;