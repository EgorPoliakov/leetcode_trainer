import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../../Api';

function Navbar({showHero}) {
    let navClass = null;
    if (!showHero) {
        navClass = 'bg-main';
    }

    const backendGoogleLogin = async (code) => {
        const response = await api.post('http://localhost:8000/auth/login', {code: code});
        console.log(response.data);
    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => backendGoogleLogin(codeResponse.code),
        flow: 'auth-code',
    });
      

    return (
        <nav className={`px-24 ${navClass}`}>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:flex md:w-auto justify-between items-center" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row items-center md:space-x-8 md:mt-0 md:border-0">
                    <li>
                    <Link to="/" className="mr-8">
                        <span className="text-2xl font-semibold whitespace-nowrap text-white">LeetCoach</span>
                    </Link>
                    </li>
                    <li>
                    <Link to='/decks' activeClassName='' className="py-2 pl-3 pr-4 md:bg-transparent md:p-0 md:hover:text-gray-300 text-white" aria-current="page">Decks</Link>
                    </li>
                    <li>
                    <a href="#" className="block py-2 pl-3 pr-4 rounded md:hover:text-gray-300 md:p-0 text-white">About</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 pl-3 pr-4 rounded md:hover:text-gray-300 md:p-0 text-white">Services</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 pl-3 pr-4 rounded md:hover:text-gray-300 md:p-0 text-white">Pricing</a>
                    </li>
                    <li>
                    <a href="#" className="block py-2 pl-3 pr-4 rounded md:hover:text-gray-300 md:p-0 text-white">Contact</a>
                    </li>
                </ul>
                <div class='flex items-center justify-center'>
                    <div class="rounded-xl m-5">
                        <button onClick={() => login()} class="px-4 py-2 rounded-l-xl text-white m-0 bg-main hover:bg-main-hover transition">Login</button>
                        <button class="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-200 transition">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;