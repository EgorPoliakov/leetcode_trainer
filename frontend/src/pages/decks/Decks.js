import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Deck } from '../../components';
import api from '../../Api';
import { Footer, Header } from '../../containers';
import constants from '../../constants'

function Decks() {
    const context = useOutletContext();
    const [message, setMessage] = context.messageContext;
    const [isLoading, setIsLoading] = context.loadingContext;
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();
    const fetchDecks = async () => {
        setIsLoading(true);
        const endpoints = constants.endpoints;
        const domain = endpoints.domain;
        const prefix = endpoints.prefixes.cards;
        const url = `${domain}/${prefix}/decks?skip=0&limit=2`;
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
                    setMessage(message);
                    navigate('/');
                }
            } else if (error.request) {
                const message = {
                    type: 'Error',
                    text: error.message
                }
                setMessage(message);
                navigate('/');
            } else {
                console.log(error.message)
            }            
        } finally {
            setIsLoading(false);
        }
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
                {isLoading ? <FontAwesomeIcon icon={faSpinner} fontSize={70} className='text-white' spinPulse /> : null}
            </div>
            <Footer />
        </>
    );
}

export default Decks;