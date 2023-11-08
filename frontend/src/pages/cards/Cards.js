import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "@ramonak/react-progress-bar";
import { Card, WholeScreenPopUp } from '../../components';
import api from '../../Api';
import constants from '../../constants';

function Cards() {
    const location = useLocation();
    const context = useOutletContext();
    const deckData = location.state;
    const [isLoading, setIsLoadingHandler] = context.loadingContext;
    const [cardsFinishedLearned, setCardsFinishedLearned] = useState(0);
    const [cardsFinishedStudying, setCardsFinishedStudying] = useState(0);
    const [cardsFinishedToReview, setCardsFinishedToReview] = useState(0);

    const [deck, setDeck] = useState([]);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    const percentFinishedLearned = deckData.cards_learned !== 0 ? 100 * cardsFinishedLearned / deckData.cards_learned : 0;
    const percentFinishedStudying = deckData.cards_studying !== 0 ? 100 * cardsFinishedStudying / deckData.cards_studying : 0;
    const percentFinishedToReview = deckData.cards_to_review !== 0 ? 100 * cardsFinishedToReview / deckData.cards_to_review : 0;

    const fetchDeck = useCallback(async () => {
        setIsLoadingHandler(true);
        const endpoints = constants.endpoints;
        const url = `${endpoints.domain}/${endpoints.prefixes.cards}/decks/${deckData.id}/study`
        const response = await api.get(url);
        setDeck(response.data);
        setIsLoadingHandler(false);
    }, [deckData.id, setIsLoadingHandler]);

    const finishCardHandler = async (quality) => {
        const currentCard = deck[currentCardIdx];
        const endpoints = constants.endpoints;
        
        if (currentCard.question_reviews.length === 0) {
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
        if (deck[currentCardIdx].question_reviews.length === 0) {
            setCardsFinishedToReview((prevCardFinishedToReview) => prevCardFinishedToReview + 1);
        } else if (cardEasiness > 2.5) {
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
        
    }, [fetchDeck]);

    let cardElement = null;
    let progressElement = null;

    if (deck.length !== 0) {
        cardElement = <Card updateCardHandler={updateCardHandler} cardData={deck[currentCardIdx]}/>;
            progressElement = <div className='w-96 mt-5'>
                <ProgressBar 
                completed={(percentFinishedLearned + percentFinishedStudying + percentFinishedToReview)} 
                width='100%' 
                height='10px'
                bgColor='#8F5AFF'
                isLabelVisible={false}/>
            </div>
        
    }
    console.log(percentFinishedLearned)

    if (deck.length !== 0 && currentCardIdx >= deck.length) {
        cardElement = <WholeScreenPopUp />
    }

    if (!isLoading && deck.length === 0) {
        cardElement = <WholeScreenPopUp />
    }

    return (
        <>
            <div className='col-span-full bg-main'>
                <h2 className='text-3xl font-bold text-center justify-self-start p-5 text-white'>{deckData.title}</h2>
                <div className='flex flex-col h-full items-center justify-center -mt-16'>
                    {!isLoading ? cardElement : null}
                    {!isLoading ? progressElement: null}
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} fontSize={70} className='text-white' spinPulse /> : null}
                </div>
            </div>
        </>
    );
}

export default Cards;