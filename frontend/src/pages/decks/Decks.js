import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Deck } from '../../components';
import api from '../../Api';
import { Footer, Header } from '../../containers';
import constants from '../../constants'
import { useOutletContext } from "react-router-dom";

function Decks() {
    const [message, setMessage] = useOutletContext();
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();
    const fetchDecks = async () => {
        const endpoints = constants.endpoints;
        const domain = endpoints.domain;
        const prefix = endpoints.prefixes.cards;
        const url = `${domain}/${prefix}/decks?skip=0&limit=2`;
        try {
            const response = await api.get(url, {withCredentials: true});
            setDecks(response.data);
        } catch (error) {
            if (error.response.status == 401) {
                console.log(error.response.status);
                const message = {
                    type: 'Error',
                    text: 'Please log in first'
                }
                setMessage(message);
                navigate('/');
            }
            
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
            </div>
            <Footer />
        </>
    );
}

export default Decks;