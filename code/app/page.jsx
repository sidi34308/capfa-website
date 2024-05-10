"use client"
// Home.jsx
import Layout from "./Layout.jsx";
import Card from "./components/Card";
import CartTab from "./components/CartTab";
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/public/api-calls/products'; // Import the fetchProducts function

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]); // State to store fetched products
    const [cartItems, setCartItems] = useState([]); // State to store cart items
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, []); // Fetch products on component mount

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const addToCart = (product) => {
        const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    const togglePopup = () => {
        setShowCart(!showCart);
    };

    const filteredProducts = products.filter((product) =>
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <video autoPlay loop muted playsInline className="back-video">
                <source src="/media/background-vid-2.mp4" type="video/mp4" />
            </video>

            <section className="page-title">
                <div className="text-container">
                    <h1 className="text animate__animated animate__zoomIn">
                        <span style={{ color: "#91BBCA" }}>Explore</span> our latest collection designed for the bold and fearless.
                    </h1>
                </div>
                <div className="page-images">
                    {/* Add page images here */}
                </div>
            </section>

            <section className="product-section">
                <div id="searchbar-container">
                    <input
                        id="search-bar"
                        name="text"
                        placeholder="Search..."
                        type="text"
                        autoComplete="off"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="cards-container">
                    {filteredProducts.map((product, index) => (
                        <Card
                            key={index}
                            product={product}
                            addToCart={addToCart}
                            title={product.productname}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            </section>

            {showCart && (
                <CartTab cartItems={cartItems} removeFromCart={removeFromCart} />
            )}

            <div className="cart-tab-icon" onClick={togglePopup}>
                {/* Cart icon */}
                <img src="/media/icons/cart-icon.png" alt="Cart" />
            </div>

            <div className="login-overlay" id="login-overlay" onClick={togglePopup}></div>
            <div className="login-container" id="popup-1">
                <button className="cancel">cancel</button>
                <div className="login-image">
                    <img src="/media/icons/account-black.png" alt="logo" className="logo" />
                </div>

                <div className="info">
                    <p>Sign in to continue</p>
                    <label htmlFor="uname">
                        <b>Username</b>
                    </label>
                    <input className="login-input" type="text" placeholder="Enter Username" name="uname" required />
                    <label htmlFor="psw">
                        <b>Password</b>
                    </label>
                    <input className="login-input" type="password" placeholder="Enter Password" name="psw" required />
                    <div id="login-error" style={{ display: "none", color: "rgb(99, 35, 35)" }}>
                        Incorrect username or password.
                    </div>

                    <button className="login-button">Login</button>
                </div>
            </div>
        </>
    );
}
