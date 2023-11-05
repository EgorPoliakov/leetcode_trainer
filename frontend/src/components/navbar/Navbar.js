import { useState } from "react";
import { Link } from 'react-router-dom';
import { ProfileMenu } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const navLinks = [
    {
        link: '/decks',
        title: 'Decks',
    },
    {
        link: '/about',
        title: 'About',
    },
    {
        link: '/decks',
        title: 'Product',
    },
    {
        link: '/decks',
        title: 'Clients',
    },
];

const Navbar = ({showHero, user, loginHandler, logoutHandler}) => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
    let navClass = null;
    if (!showHero) {
        console.log(showHero);

        navClass = 'bg-main';
    }

    let userElement = null;
    let userElementMobile = null;

    if ('email' in user) {
        userElement = <ProfileMenu logoutHandler={logoutHandler} user={user} className={"sm:flex hidden items-center gap-4"}/>
        userElementMobile = <ProfileMenu logoutHandler={logoutHandler} user={user} className={"flex items-center gap-4"}/>
    } else {
        userElement = <div className="rounded-xl m-5">
        <button onClick={() => loginHandler()} className="px-4 py-2 rounded-l-xl text-white m-0 bg-main hover:bg-main-hover transition">Login</button>
        <button className="px-4 py-2 rounded-r-xl bg-neutral-50 hover:bg-neutral-200 transition">Register</button>
    </div>;
    }

    

  return (
    <nav className={`${navClass} w-full flex justify-between items-center navbar lg:px-24 sm:px-10 px-4 h-[8vh]`}>
      {/* Logo */}
        <Link to="/" className="mr-16">
            <span className="text-2xl font-semibold whitespace-nowrap text-white">LeetCoach</span>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden items-center flex-1">
        {navLinks.map((item, index) => (
            <li
            key={item.title}
            className={`text-white hover:text-gray-300 cursor-pointer text-[16px] ${
                active === item.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(item.title)}
            >
            <Link to={item.link}>{item.title}</Link>
            </li>
        ))}
        </ul>
        {userElement}
          

      {/* Mobile Navigation */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <FontAwesomeIcon
          icon={faBars}
          className="w-[28px] h-[28px] object-contain text-white"
          onClick={() => setToggle(!toggle)}
        />

        {/* Sidebar */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } flex-col p-6 bg-black-gradient absolute top-10 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((item, index) => (
              <li
                key={item.title}
                className={`font-poppins font-medium cursor-pointer text-[16px] text-white ${
                  active === item.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(item.title)}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
          {userElementMobile}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;