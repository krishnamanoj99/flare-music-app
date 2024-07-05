import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const LogoutModal = ({closeModal}) => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Replace with your cookie name
    const handleLogout = () => {
      
        removeCookie('token');
      };


    return (
        <div className="absolute w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center" onClick={closeModal}>
            <div className="h-1/3 w-1/4 bg-white rounded-3xl flex flex-col items-center p-10 space-y-6 shadow-2xl" onClick={(e) => {
                e.stopPropagation();
            }}>
                <div className="font-semibold text-3xl">Do you wish to log out of Flare?</div>

                <div className="bg-flare-orange  text-white w-3/5 flex justify-center items-center rounded-full full p-5 cursor-pointer font-semibold" onClick={handleLogout}>
                    LOG OUT
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;