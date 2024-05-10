// components/Footer.js
import Link from 'next/link';
import styles from '@/public/styles/global.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
            <p>&copy; 2024 capfashion. All rights reserved.</p>
        </footer>
    );
}
