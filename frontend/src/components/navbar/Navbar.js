import { memo, useState } from "react";
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

const Navbar = memo(function Navbar({showHero, user, loginHandler, logoutHandler}) {
  console.log('rerender');
    const [toggle, setToggle] = useState(false);
    let navClass = null;
    if (!showHero) {
        navClass = 'bg-main';
    }

    let userElement = null;
    let userElementMobile = null;

    if (user && 'email' in user) {
        userElement = <ProfileMenu logoutHandler={logoutHandler} user={user} className={"sm:flex hidden items-center gap-4"}/>
        userElementMobile = <ProfileMenu logoutHandler={logoutHandler} user={user} className={"flex items-center gap-4 mb-4"}/>
    } else {
        userElement = <div className="rounded-xl m-5">
        <button onClick={() => loginHandler()} className="px-4 py-2 rounded-xl bg-neutral-50 hover:bg-neutral-200 transition">Login</button>
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
              className={`text-white hover:text-gray-300 cursor-pointer text-[16px]  ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              >
              <Link to={item.link}>{item.title}</Link>
              </li>
          ))}
          </ul>
          {userElement}
            

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center z-10">
          <FontAwesomeIcon
            icon={faBars}
            className="w-[28px] h-[28px] object-contain text-white"
            onClick={() => setToggle(!toggle)}
          />

          {/* Sidebar */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } flex-col p-6 absolute top-10 right-0 my-2 min-w-[140px] rounded-xl sidebar bg-main`}
          >
            {userElementMobile}
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((item, index) => (
                <li
                  key={item.title}
                  className={`font-poppins font-medium cursor-pointer text-[16px] text-white  ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                >
                  <Link to={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
});

export default Navbar;