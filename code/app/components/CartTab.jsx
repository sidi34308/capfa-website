// CartTab.jsx
import { useState, useEffect } from 'react';

const CartTab = ({ cartItems, removeFromCart }) => {
    return (
        <div className="cart-tab">
            <h1>My Cart</h1>
            <div className="listcart">
                {/* Cart items will be dynamically generated here */}
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-card">
                        <img src={item.image} alt="Product" />
                        <div className="cart-content">
                            <h4>{item.title}</h4>
                            <div className="cart_card_price">Price: {item.price} QR</div>
                            <div className="quantity-dropdown" data-id={item.id}>
                                <label htmlFor="quantity">Quantity:</label>
                                <select className="quantity-select" data-id={item.id} name="quantity">
                                    {/* Generate options for quantity dropdown */}
                                    {[...Array(item.quantity).keys()].map((num) => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="remove" onClick={() => removeFromCart(item.id)}>
                                <img src="/media/Remove.png" alt="Remove" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <p>Order Total:</p>
                <p>
                    <span id="cart-total">0</span> QR
                </p>
            </div>
            <div className="btn">
                <button className="close">Close</button>
                <button className="checkout">Checkout</button>
            </div>
        </div>
    );
};

export default CartTab;
