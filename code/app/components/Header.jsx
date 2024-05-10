"use client"
import { useState } from 'react';


function UserPopup() {
    const [isVisible, setIsVisible] = useState(false);

    const togglePopup = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <img src="media/icons/account-black.png" alt="User Image" />
            <div className="user-info">
                <h3>User Name</h3>
                <p>Log in to see your info</p>
                <button onClick={togglePopup}>Log-in</button>
            </div>
        </div>
    );
}

function Header() {
    const [isCartTabVisible, setIsCartTabVisible] = useState(false);
    const [isUserPopupVisible, setIsUserPopupVisible] = useState(false);

    const toggleCartTab = () => {
        setIsCartTabVisible(!isCartTabVisible);
        setIsUserPopupVisible(false); // Close user popup when cart is clicked
    };

    const togglePopup = () => {
        setIsUserPopupVisible(!isUserPopupVisible);
        setIsCartTabVisible(false); // Close cart tab when user popup is clicked
    };

    const closeCart = () => {
        setIsCartTabVisible(false);
    };

    return (
        <header>
            <nav>
                <div className="logo">
                    <a href={typeof window !== 'undefined' ? window.location.pathname : '/'}>
                        <img src="media/icons/logo.png" alt="logo" />
                    </a>
                </div>
                <ul>
                    <li id="seller-dashboard-nav" style={{ display: 'none' }}>
                        <a href="seller.html">Dashboard</a>
                    </li>
                    <li>
                        <a href="#searchbar-container" className="smooth-scroll">
                            <img src="media/icons/search-icon.png" alt="" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="icon-cart" onClick={toggleCartTab}>
                            <img src="media/icons/cart-icon.png" alt="" />
                            <span>0</span>
                        </a>
                        {isCartTabVisible && <CartTab closeCart={closeCart} />}
                    </li>
                    <li>
                        <a href="#" className="icon-account" onClick={togglePopup}>
                            <img src="media/icons/account-icon.png" alt="" />
                        </a>
                        {/* New user pop-up */}
                        {isUserPopupVisible && <div className="user-popup" id="userPopup"><UserPopup /></div>}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
