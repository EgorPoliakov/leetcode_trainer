import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useOutletContext, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Button } from '@material-tailwind/react';
import ProgressBar from "@ramonak/react-progress-bar";
import api from '../../Api';
import constants from '../../constants';
import { computeCardImportance } from './utils';
import { Table, DifficultyLabel } from "../../components";

function DeckTable() {
    const location = useLocation();
    const context = useOutletContext();
    const deckData = location.state;
    const [isLoading, setIsLoadingHandler] = context.loadingContext;

    const [deck, setDeck] = useState([]);

    const fetchDeck = useCallback(async () => {
        setIsLoadingHandler(true);
        const endpoints = constants.endpoints;
        const url = `${endpoints.domain}/${endpoints.prefixes.cards}/decks/${deckData.id}/study`
        const response = await api.get(url);
        const deck = response.data;
        deck.sort((cardA, cardB) => {
            const importanceA = computeCardImportance(cardA);
            const importanceB = computeCardImportance(cardB);
            return importanceB - importanceA;
        });
        
        setDeck(deck);
        setIsLoadingHandler(false);
    }, [deckData.id, setIsLoadingHandler]);

    useEffect(() => {
        fetchDeck();
        
    }, [fetchDeck]);

    const rows = deck.map((card) => {
        const question = card.question;
        const reviews = card.question_reviews;
        let reviewDate = 'New Card';
        let reviewStreak = 0;
        let percentFinished = 0;
        if (reviews.length !== 0) {
            reviewDate = new Date(reviews[0].review_date).toLocaleDateString({
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            reviewStreak = reviews[0].repetitions;
            percentFinished = reviews[0].easiness * 100 / constants.generalConstants.learnedEasinessThreshold;
        }
        const difficulty = <DifficultyLabel difficulty={card.question.difficulty}/>

        const progress = <div>
            <ProgressBar 
            completed={(percentFinished)} 
            width='100%' 
            height='10px'
            bgColor='#8F5AFF'
            isLabelVisible={false}/>
        </div>
        const row = [question.title, difficulty, progress, reviewDate, reviewStreak];
        return row;
    });

    const titleRow = ['Card', 'Difficulty', 'Progress', 'Next Review', 'Review Streak'];
    const deckForStudy = deck.filter((card) => {
        if (card.question_reviews.length === 0) {
            return true;
        }

        const today = new Date();
        const review_date = new Date(card.question_reviews[0].review_date);
        return review_date < today;
    });

    return (
        <div className='col-span-full bg-main'>
            <h2 className='text-3xl font-bold text-center justify-self-start p-5 text-white'>{deckData.title}</h2>
            <div className='flex justify-center'>
                <Link to='/study' state={{'deckState': deckForStudy, 'deckData': deckData}}>
                    <Button className='bg-second'>Study</Button>
                </Link>
            </div>
            <div className='flex justify-center my-10'>
                {
                    isLoading ? 
                    <FontAwesomeIcon icon={faSpinner} fontSize={70} className='text-white' spinPulse /> : 
                    <Table titleRow={titleRow} rows={rows}/>
                }
            </div>
        </div>
    );
}

export default DeckTable;