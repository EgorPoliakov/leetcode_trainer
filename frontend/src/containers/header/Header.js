import React from 'react';
import { Navbar } from '../../components';
import { Hero } from '../../components';

function Header({showHero}) {
    let headerHeight = 'h-[84vh]';
    let headerElement = (
        <Hero>
            <Navbar showHero={showHero}/>
        </Hero>
    );

    if (!showHero) {
        headerHeight = null;
        headerElement = <Navbar />;
    }

    return (
        <div className={`col-span-full ${headerHeight}`}>
            {headerElement}
        </div>
    );
}

export default Header;