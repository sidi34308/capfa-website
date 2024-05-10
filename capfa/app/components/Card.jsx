import React from 'react';

function Card({ title, image, price }) {
    return (
        <div className="card">
            <div className="image-container">
                <img src={image} alt={title} className="card-image" />
            </div>
            <div className="details">
                <div className="product-name">{title}</div>
                <div className="price">{price} QR</div>
            </div>
            <div className="addCart">
                <button>Add to Cart</button>
            </div>
        </div>
    );
}

export default Card;
