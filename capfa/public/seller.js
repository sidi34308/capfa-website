import { fetchProducts } from './api-calls/products.js';
import { fetchUsers } from './api-calls/users.js';


document.addEventListener("DOMContentLoaded", async function () {
    const sellerContainer = document.querySelector('.seller-container');
    const productsContainer = document.querySelector('.products-container');
    const productForm = document.getElementById('productForm');
    const successMessage = document.createElement('h4');
    successMessage.textContent = 'Product submitted successfully';
    successMessage.style.display = 'none';

    let users = [];
    let cart = [];
    let products = [];
    let logged_in_user = [];

    const storedUsers = await fetchUsers();

    console.log("users sss", storedUsers)

    if (storedUsers) {
        users = storedUsers;
    } else {
        console.log("No products found");
    }



    const storedCart = JSON.parse(localStorage.getItem('cart'));
    cart = storedCart ? storedCart : [];

    const storedProducts = await fetchProducts();

    console.log("products sss", storedProducts)

    if (storedProducts) {
        products = storedProducts;
    }
    const retrievedUser = JSON.parse(localStorage.getItem('logged_in_user'));
    logged_in_user = retrievedUser ? retrievedUser : [];
    console.log("logged_in_user", logged_in_user);
    function displaySellerInfo() {
        if (logged_in_user && logged_in_user.name) {
            const sellerInfoHTML = `
                <p>Name: ${logged_in_user.name}</p>
                <p>balance: ${logged_in_user.balance}</p>
            `;
            sellerContainer.innerHTML = sellerInfoHTML;
        } else {
            sellerContainer.innerHTML = '<p>No seller information found.</p>';
        }
    }

    function displaySellerProducts() {
        if (products && products.length > 0) {
            let productsHTML = '';
            products.forEach(product => {
                productsHTML += `
                    <div class="product">
                        <h3>${product.productname}</h3>
                        <p>Price: ${product.price} QR</p>
                        <p>Quantity: ${product.quantity}</p>
                        <button class="remove-product" data-id="${product.id}">Remove</button>
                    </div>
                `;
            });
            productsContainer.innerHTML = productsHTML;
        } else {
            productsContainer.innerHTML = '<p>No products added yet.</p>';
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productQuantity = document.getElementById('productQuantity').value;
        const productImage = document.getElementById('productImage').files[0];

        if (productName && productPrice && productQuantity && productImage) {
            console.log("product url ", `media/${productImage.name}`);
            const newProduct = {
                id: products.length,
                image: `media/${productImage.name}`,
                productname: productName,
                price: productPrice,
                quantity: productQuantity,
                seller_ID: logged_in_user.id
            };

            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
                productForm.reset();
            }, 3000);

            displaySellerProducts();
        } else {
            console.error('All fields are required.');
        }
    }

    function removeProduct(event) {
        if (event.target.classList.contains('remove-product')) {
            const productId = parseInt(event.target.getAttribute('data-id'));

            products = products.filter(product => product.id !== productId);

            localStorage.setItem('products', JSON.stringify(products));

            displaySellerProducts();
        }
    }

    productForm.addEventListener('submit', handleFormSubmit);
    productsContainer.addEventListener('click', removeProduct);

    productForm.parentNode.insertBefore(successMessage, productForm.nextSibling);

    displaySellerInfo();
    displaySellerProducts();
});
