import React, { useEffect } from 'react';
import { Navbar } from '../../components';
import { useState } from 'react';
import { Hero } from '../../components';

function Header({showHero}) {
    const [user, setUser] = useState({});

    const setUserHandler = () => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        setUser((prevUser) => {
            return {
                ...localUser
            }
        });
    }

    useEffect(() => {
        setUserHandler();
    }, []);

    let headerHeight = 'h-[84vh]';
    let headerElement = (
        <Hero>
            <Navbar showHero={showHero} user={user} setUserHandler={setUserHandler}/>
        </Hero>
    );

    if (!showHero) {
        headerHeight = null;
        headerElement = <Navbar showHero={showHero} user={user} setUserHandler={setUserHandler}/>
    }

    return (
        <div className={`col-span-full ${headerHeight}`}>
            {headerElement}
        </div>
    );
}

export default Header;