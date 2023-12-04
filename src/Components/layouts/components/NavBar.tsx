import React, { useRef, useEffect, useState } from 'react';
import Logo from './Logo';
import { useAuth } from '@hooks/useAuth';
import ImageProfileAndContent from '@components/ImageProfileAndContent';
import Profile from '@components/Profile';
import NavigateLinks from './NavigateLinks';

const NavBar: React.FC = () => {

    const profileRef = useRef<HTMLDivElement>(null);
    const [showProfile, setShowProfile] = useState(false);
    const [clickedOutside, setClickedOutside] = useState(false);

    const { user } = useAuth();

    const handleShowProfile = (): void => {
        setShowProfile((prevShowProfile) => !prevShowProfile);
        setClickedOutside(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): void => {
            if (showProfile && profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setClickedOutside(true);
            }
            if (clickedOutside) {
                handleShowProfile()
            }
        };
        if (showProfile) {
            document.addEventListener('click', handleOutsideClick);
            return () => {
                document.removeEventListener('click', handleOutsideClick);
                if (clickedOutside) {
                    setShowProfile(false);
                }
            };
        }
        return () => { };
    }, [showProfile, clickedOutside]);

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse h-10">
                    <div className="flex items-center justify-center">
                        <button type="button" onClick={handleShowProfile}>
                            <ImageProfileAndContent
                                img={user?.photo}
                            />
                        </button>
                        <div className={`${showProfile ? 'block' : 'hidden'}`} ref={profileRef}>
                            <Profile name={user?.name} />
                        </div>
                    </div>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        <NavigateLinks />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;