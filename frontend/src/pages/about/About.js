import React from 'react'
import { Header, Footer } from '../../containers';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function About() {
    return (
        <>
            <Header showHero={false}/>
            <div className='col-span-full bg-main'>
                About
            </div>
            <Footer />
        </>
    );
}

export default About;