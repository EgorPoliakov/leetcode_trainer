import React, { useEffect} from 'react';
import { Navbar } from '../../components';
import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import constants from '../../constants';
import api from '../../Api';
import { useNavigate } from 'react-router-dom';


function Header() {
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


    const logoutHandler = useCallback(async () => {
        const url = `${domain}/${prefix}/logout`;
        const response = await api.get(url);
        setUser();
        localStorage.removeItem('user');
        navigate('/');
    }, [domain, navigate, prefix]);

    useEffect(() => {
        setUserHandler();
    }, []);

    return (
        <div className={`col-span-full`}>
            <Navbar 
            user={user} 
            loginHandler={loginHandler}
            logoutHandler={logoutHandler}
            />
        </div>
    );
}

export default Header;