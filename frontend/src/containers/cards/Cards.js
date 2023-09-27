import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '../../components';

const mockCards = [
    {
        id: "1",
        url: "https://leetcode.com/problems/two-sum",
        title: "Two Sum",
        category: "Algorithms",
        difficulty: "easy",
        is_premium: false,
        quality: 4
    },
    {
        id: "2",
        url: "https://leetcode.com/problems/add-two-numbers",
        title: "Add Two Numbers",
        category: "Algorithms",
        difficulty: "medium",
        is_premium: false,
        quality: 3
    }
]

function Cards() {
    const location = useLocation();
    const deckId = location.state;
    const [cards, setCards] = useState(mockCards);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    const updateCardHandler = (quality) => {
        setCards((prevCards) => {
            prevCards.map((card) => {
                if (card.id === cards[currentCardIdx]) {
                    card.quality = quality;
                }
                return card;
            });
            return [...prevCards];
        });
        setCurrentCardIdx(
            (prevCardIdx) => prevCardIdx + 1
        );
    }

    let cardElement = <Card updateCardHandler={updateCardHandler} cardData={cards[currentCardIdx]}/>;
    if (currentCardIdx >= cards.length) {
        cardElement = <p>Finished all cards!</p>
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