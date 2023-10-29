import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Card } from '../../components';
import api from '../../Api';
import { Footer, Header } from '../../containers';
import constants from '../../constants';

function Cards() {
    const location = useLocation();
    const deckData = location.state;
    const [loading, setLoading] = useState(true);
    const [cardsFinishedLearned, setCardsFinishedLearned] = useState(0);
    const [cardsFinishedStudying, setCardsFinishedStudying] = useState(0);

    const [deck, setDeck] = useState([]);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    const percentFinishedLearned = 100 * cardsFinishedLearned / deckData.cards_learned;
    const percentFinishedStudying = 100 * cardsFinishedStudying / deckData.cards_studying;

    const fetchDeck = async () => {
        const endpoints = constants.endpoints;
        const url = `${endpoints.domain}/${endpoints.prefixes.cards}/decks/${deckData.id}/study`
        const response = await api.get(url);
        setDeck(response.data);
        setLoading(false);
    };

    const finishCardHandler = async (quality) => {
        const currentCard = deck[currentCardIdx];
        const endpoints = constants.endpoints;
        
        if (currentCard.question_reviews.length == 0) {
            const userData = JSON.parse(localStorage.getItem('user'));
            const requestData = {
                question_card_id: currentCard.id,
                user_id: userData.id,
                quality: quality
            }
            const url = `${endpoints.domain}/${endpoints.prefixes.cards}/reviews`;
            const response = await api.post(url, requestData);
            return;
        }

        const reviewId = deck[currentCardIdx].question_reviews[0].id;
        const url = `${endpoints.domain}/${endpoints.prefixes.cards}/reviews/${reviewId}`;

        const requestData = {quality: quality};

        const response = await api.put(url, requestData);
    }

    const updateCardHandler = (quality) => {
        // finishCardHandler(quality);
        const cardEasiness = deck[currentCardIdx].easiness;
        if (cardEasiness > 2.5) {
            setCardsFinishedLearned((prevCardFinishedLearned) => prevCardFinishedLearned + 1);
        } else {
            setCardsFinishedStudying((prevCardFinishedStudying) => prevCardFinishedStudying + 1);
        }

        setCurrentCardIdx(
            (prevCardIdx) => prevCardIdx + 1
        );

    }

    useEffect(() => {
        fetchDeck();
        
    }, []);

    let cardElement = null;
    let progressElement = null;

    if (loading) {
        cardElement = <div className='text-white'>
            Loading
        </div>
    }

    if (deck.length !== 0) {
        cardElement = <Card updateCardHandler={updateCardHandler} cardData={deck[currentCardIdx]}/>;
        progressElement = <div className='flex w-64 justify-evenly mt-5'>
            <div className='w-16'>
                <CircularProgressbarWithChildren value={percentFinishedStudying}>
                    Studying
                </CircularProgressbarWithChildren>
            </div>
            <div className='w-16'>
                <CircularProgressbarWithChildren value={percentFinishedLearned}>
                    Learned
                </CircularProgressbarWithChildren>
            </div>
        </div>
    }

    if (deck.length !== 0 && currentCardIdx >= deck.length) {
        
        cardElement = <div className='text-white'>
            Finished all cards!
            <Link to='/decks'>Home</Link>
        </div>
        progressElement = <div className='flex w-64 justify-evenly mt-5'>
            <div className='w-16'>
                <CircularProgressbar value={percentFinishedStudying} />
            </div>
            <div className='w-16'>
                <CircularProgressbar value={percentFinishedLearned} />
            </div>
        </div>
    }

    if (!loading && deck.length === 0) {
        cardElement = <div className='text-white'>
            Finished all cards!
            <Link to='/decks'>Home</Link>
        </div>
    }

    

    return (
        <>
            <Header showHero={false}/>
            <div className='col-span-full bg-main'>
                <h2 className='text-center justify-self-start p-5 text-white'>{deckData.title}</h2>
                <div className='flex flex-col h-full items-center justify-center -mt-16'>
                    {cardElement}
                    {progressElement}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cards;