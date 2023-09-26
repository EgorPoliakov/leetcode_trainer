import React from 'react'
import { useState } from 'react';
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
    const [cards, setCards] = useState(mockCards);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    const updateCardHandler = (quality) => {
        setCards((prevCards) => {
            prevCards.map((card) => {
                if (card.id === cards[currentCardIdx]) {
                    card.quality = quality;
                }
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
        <div className='flex justify-center items-center col-start-2 col-end-10 bg-gray-200'>
            {cardElement}
        </div>
    );
}

export default Cards;