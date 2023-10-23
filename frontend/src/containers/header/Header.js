import React, { useEffect } from 'react';
import { Hero, Navbar } from '../../components';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import constants from '../../constants';
import api from '../../Api';
import { useNavigate } from 'react-router-dom';


function Header({ showHero }) {
    const endpoints = constants.endpoints;
    const domain = endpoints.domain;
    const prefix = endpoints.prefixes.auth;
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    const setUserHandler = () => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        setUser((prevUser) => {
            return {
                ...localUser
            }
        });
    }

    const backendGoogleLogin = async (code) => {
        const url = `${domain}/${prefix}/login`;
        const response = await api.post(url, {code: code});
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        setUserHandler();
        console.log(response.data);
    }

    const loginHandler = useGoogleLogin({
        onSuccess: codeResponse => backendGoogleLogin(codeResponse.code),
        flow: 'auth-code',
    });

    const logoutHandler = async () => {
        const url = `${domain}/${prefix}/logout`;
        const response = await api.get(url);
        setUser();
        localStorage.removeItem('user');
        navigate('/');
    }

    useEffect(() => {
        setUserHandler();
    }, []);

    let headerHeight = 'h-[84vh]';
    const navElement = <Navbar 
    showHero={showHero} 
    user={user} 
    loginHandler={loginHandler}
    logoutHandler={logoutHandler}
    />

    let headerElement = (
        <Hero>
            {navElement}
        </Hero>
    );

    if (!showHero) {
        headerHeight = null;
        headerElement = navElement;
    }

    return (
        <div className={`col-span-full ${headerHeight}`}>
            {headerElement}
        </div>
    );
}

export default Header;