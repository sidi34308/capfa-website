
import { fetchProducts, postProduct } from './api-calls/products.js';
import { fetchUsers, postUser, updateUser } from './api-calls/users.js';

document.addEventListener("DOMContentLoaded", async function () {

    let users = [];

    const storedUsers = await fetchUsers();

    console.log("users sss", storedUsers)

    if (storedUsers) {
        users = storedUsers;
    } else {
        console.log("No products found");
    }




    let cart = [];
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    cart = storedCart;
    console.log(cart);

    let products = [];
    const storedProducts = await fetchProducts();

    console.log("products sss", storedProducts)

    if (storedProducts) {
        products = storedProducts;
    }


    let logged_in_user = [];
    const retrievedUser = JSON.parse(localStorage.getItem('logged_in_user'));
    logged_in_user = retrievedUser;
    console.log(logged_in_user);

    function calculateTotal(cart) {
        let total = 0;
        for (const cartItem of cart) {
            const product = fetchproduct(cartItem.product_Id);
            if (product) {
                total += cartItem.quantity * product.price;
            }
        }
        return total;
    }

    function displayUserInfoAndTotal(logged_in_user, cart) {
        const usernameElement = document.querySelector('.username');
        const totalElement = document.querySelector('.total');

        if (logged_in_user && logged_in_user.name) {
            usernameElement.textContent = `Hello, ${logged_in_user.name}!`;
        } else {
            usernameElement.textContent = "Hello!";
        }
        const totalAmount = calculateTotal(cart);
        totalElement.textContent = `Total: ${totalAmount} QR`;
    }

    displayUserInfoAndTotal(logged_in_user, cart);

    function checkout() {
        const total = calculateTotal(cart);
        console.log("Total amount:", total);
        console.log("User balance:", logged_in_user.balance);

        if (total < logged_in_user.balance) {
            const remainingBalance = logged_in_user.balance - total;
            logged_in_user.balance = remainingBalance;
            console.log("Remaining balance:", logged_in_user.balance);
            console.log("user", logged_in_user);
            transferAmount(total);
            addToPastHistory(logged_in_user);
            console.log("updated user", logged_in_user)
            updateuser(logged_in_user);
            localStorage.setItem('logged_in_user', JSON.stringify(logged_in_user));
            // Display success message and redirect to main page
            alert("Purchase successful!");
            // window.location.href = 'home.html';
        } else {
            // Display error message for insufficient balance
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = "Insufficient balance to purchase these items.";
            errorMessage.style.display = 'block';
        }
    }

    function transferAmount(total) {
        cart.forEach(item => {
            for (const product of products) {
                if (item.product_Id == product.id) {
                    product.quantity -= item.quantity;
                    updateSellerBalance(product.seller_ID, total);
                }
            }
        });
    }


    function updateSellerBalance(sellerId, amount) {
        users.forEach(user => {
            if (user.type == "seller" && user.id == sellerId) {
                console.log("Old balance for seller", user.id, ":", user.balance);
                user.balance += amount;
                console.log("New balance for seller", user.id, ":", user.balance);
            }
        });
    }

    function addToPastHistory(user) {
        cart.forEach(item => {
            const product = fetchproduct(item.product_Id);
            if (product) {
                product.quantity = item.quantity;
                user.past_purchases.push(product);
            }
        });
        updateUser(user);
    }

    async function updateuser(updatedUser) {
        console.log(updatedUser);
        const userIndex = users.findIndex(user => user.id == updatedUser.id);

        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            await updateUser(updatedUser);
            console.log('User updated successfully:', updatedUser);
        } else {
            console.error('User not found for update');
        }
    }

    // Fetch product function
    function fetchproduct(id) {
        return products.find(product => product.id == id);
    }

    // Form submission handling
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        checkout();
    });
});
