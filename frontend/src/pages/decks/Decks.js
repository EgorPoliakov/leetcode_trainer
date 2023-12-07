import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import { faSpinner, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Deck } from '../../components';
import api from '../../Api';
import constants from '../../constants'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Decks() {
    const context = useOutletContext();
    const [message, setMessageHandler] = context.messageContext;
    const [isLoading, setIsLoadingHandler] = context.loadingContext;
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();
    const fetchDecks = async () => {
        setIsLoadingHandler(true);
        const endpoints = constants.endpoints;
        const domain = endpoints.domain;
        const prefix = endpoints.prefixes.cards;
        const url = `${domain}/${prefix}/decks?skip=0&limit=100`;
        try {
            const response = await api.get(url, {withCredentials: true});
            setDecks(response.data);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log(error.response.status);
                    const message = {
                        type: 'Error',
                        text: 'Please log in first'
                    }
                    setMessageHandler(message);
                    navigate('/');
                }
            } else if (error.request) {
                const message = {
                    type: 'Error',
                    text: error.message
                }
                setMessageHandler(message);
                navigate('/');
            } else {
                console.log(error.message)
            }            
        } finally {
            setIsLoadingHandler(false);
        }
    }

    useEffect(() => {
        fetchDecks();
    }, []);

    const deckElementEasy = [];
    const deckElementMedium = [];
    const deckElementHard = [];
    const deckElementOther = [];
    
    decks.map((deck) => {
        const deckElement = (
            <>
                <div className='mx-2 mt-5'>
                    <Deck deckData={deck} />
                </div>
            </>
        );
        switch (deck.difficulty) {
            case 0:
                deckElementEasy.push(deckElement);
                break;
            case 1:
                deckElementMedium.push(deckElement);
                break;
            case 2:
                deckElementHard.push(deckElement);
                break;
            case 3:
                deckElementOther.push(deckElement);
                break;
        }
    });

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    const decksPage = (
        <div className='grid grid-cols-1 gap-5 px-32'>
            <div>
                <h2 className='text-white text-2xl font-semibold'>Basic Topics</h2>
                <Slider {...settings}>
                    {deckElementEasy}
                </Slider>
            </div>
            <div>
                <h2 className='text-white text-2xl font-semibold'>Intermediate Topics</h2>
                <Slider {...settings}>
                    {deckElementMedium}
                </Slider>
            </div>
            <div>
                <h2 className='text-white text-2xl font-semibold'>Advanced Topics</h2>
                <Slider {...settings}>
                    {deckElementHard}
                </Slider>
            </div>
            <div>
                <h2 className='text-white text-2xl font-semibold'>Less Important Topics</h2>
                <Slider {...settings}>
                    {deckElementOther}
                </Slider>
            </div>
        </div>
    );

    return (
        <>
            <div className='flex justify-center items-center col-span-full bg-main'>
                {isLoading ? 
                <FontAwesomeIcon icon={faSpinner} fontSize={70} className='text-white' spinPulse /> : 
                decksPage}
            </div>
        </>
    );
}

export default Decks;