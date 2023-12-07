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
import { Button } from '@material-tailwind/react';

function Cards() {
    const location = useLocation();
    const context = useOutletContext();
    const deckData = location.state;
    const [isLoading, setIsLoadingHandler] = context.loadingContext;
    const [cardsFinished, setCardsFinished] = useState(0);
    const [isFetchNewCard, setIsFetchNewCard] = useState(false);

    const [deck, setDeck] = useState([]);
    const [deckReview, setDeckReview] = useState([]);
    const [deckNew, setDeckNew] = useState([]);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);

    const percentFinished = deckReview.length !== 0 ? 100 * cardsFinished / deckReview.length : 0;

    const fetchDeck = useCallback(async () => {
        setIsLoadingHandler(true);
        const endpoints = constants.endpoints;
        const url = `${endpoints.domain}/${endpoints.prefixes.cards}/decks/${deckData.id}/study`
        const response = await api.get(url);
        setDeck(response.data);
        setIsLoadingHandler(false);
    }, [deckData.id, setIsLoadingHandler]);

    const finishCardHandler = async (quality) => {
        const currentCard = deckReview[currentCardIdx];
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
            return response;
        }

        const reviewId = deckReview[currentCardIdx].question_reviews[0].id;
        const url = `${endpoints.domain}/${endpoints.prefixes.cards}/reviews/${reviewId}`;

        const requestData = {quality: quality};

        const response = await api.put(url, requestData);
        return response;
    }

    const updateCardHandler = (quality) => {
        // finishCardHandler(quality);
        setCardsFinished((prevCardFinishedToReview) => prevCardFinishedToReview + 1);
        setCurrentCardIdx(
            (prevCardIdx) => prevCardIdx + 1
        );

    }

    const addNewCardHandler = async () => {
        setDeckReview((prev) => {
            const newCard = deckNew.shift();
            const newDeck = [...prev];
            newDeck.splice(currentCardIdx, 0, newCard);
            return newDeck;
        });
        setIsFetchNewCard(true);
    }

    useEffect(() => {
        fetchDeck();
        
    }, [fetchDeck]);

    useEffect(() => {
        console.log(deck);
        const deckNew = deck.filter((card) => {
            return card.question_reviews.length === 0;
        });
    
        const deckReview = deck.filter((card) => {
            return card.question_reviews.length !== 0;
        });
        
        setDeckNew(deckNew);
        setDeckReview(deckReview);
    }, [deck]);

    useEffect(() => {
        if (isFetchNewCard) {
            const createCardReview = async () => {
                const response = await finishCardHandler(3);
                deckReview[currentCardIdx].question_reviews.push(response.data);
                setIsFetchNewCard(false);
            }
            createCardReview();
        }
    }, [deckReview, isFetchNewCard]);

    let cardElement = null;
    let progressElement = null;

    if (deckReview.length !== 0) {
        console.log(deckReview);
        cardElement = <Card updateCardHandler={updateCardHandler} cardData={deckReview[currentCardIdx]}/>;
            progressElement = <div className='w-96 mt-5'>
                <ProgressBar 
                completed={(percentFinished)} 
                width='100%' 
                height='10px'
                bgColor='#8F5AFF'
                isLabelVisible={false}/>
            </div>
        
    }

    if (deckReview.length !== 0 && currentCardIdx >= deckReview.length) {
        cardElement = <WholeScreenPopUp />
    }

    if (!isLoading && deck.length === 0) {
        cardElement = <WholeScreenPopUp />
    }

    return (
        <>
            <div className='col-span-full bg-main'>
                <h2 className='text-3xl font-bold text-center justify-self-start p-5 text-white'>{deckData.title}</h2>
                <Button onClick={addNewCardHandler} className='bg-second'>New card</Button>
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