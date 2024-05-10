"use client"


import { useState } from 'react';
import Link from 'next/link';
import styles from '@/public/styles/global.css';

function Header() {
    const toHomePage = () => {
        window.location.href = '/home.html';
    };

    return (
        <header>
            <nav>
                <div className={styles.logo}>
                    <Link href="/">

                        <img className="w-12" src="media/icons/logo.png" alt="logo" />

                    </Link>
                </div>
                <ul>
                    <li>
                        <a href="#" className="icon-cart" onClick={toHomePage}>
                            <img src="media/icons/cart-icon.png" alt="" />
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

