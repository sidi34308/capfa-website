"use client"
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/public/api-calls/products';
import { fetchUsers } from '@/public/api-calls/users';

const StatisticsPage = () => {
    const [totalPurchases, setTotalPurchases] = useState(0);
    const [topProducts, setTopProducts] = useState([]);
    const [unpurchasedProducts, setUnpurchasedProducts] = useState([]);
    const [totalAmountTransferred, setTotalAmountTransferred] = useState(0);
    const [highestPaidSeller, setHighestPaidSeller] = useState(null);
    const [totalProductsSold, setTotalProductsSold] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [averageProductPrice, setAverageProductPrice] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                // Fetching products data
                const productsResponse = await fetchProducts();
                const products = productsResponse;

                // Calculating total purchases
                const totalPurchases = products.reduce((acc, curr) => acc + curr.quantity, 0);
                setTotalPurchases(totalPurchases);

                // Finding top 3 products
                const sortedProducts = [...products].sort((a, b) => b.quantity - a.quantity);
                setTopProducts(sortedProducts.slice(0, 3));

                // Finding unpurchased products
                const unpurchasedProducts = products.filter((product) => product.quantity === 0);
                setUnpurchasedProducts(unpurchasedProducts);

                // Fetching users data
                const usersResponse = await fetchUsers();
                const users = usersResponse;

                // Calculating total amount transferred
                const totalAmountTransferred = users.reduce((acc, curr) => acc + curr.balance, 0);
                setTotalAmountTransferred(totalAmountTransferred);

                // Finding highest paid seller
                const sellerUsers = users.filter((user) => user.type === 'seller');
                const highestPaidSeller = sellerUsers.reduce((prev, current) => (prev.balance > current.balance) ? prev : current, {});
                setHighestPaidSeller(highestPaidSeller);

                // Calculating total number of products sold
                const totalProductsSold = products.reduce((acc, curr) => acc + curr.quantity, 0);
                setTotalProductsSold(totalProductsSold);

                // Calculating total number of registered users
                const totalUsers = users.length;
                setTotalUsers(totalUsers);

                // Calculating average product price
                const totalProductPrice = products.reduce((acc, curr) => acc + curr.price, 0);
                const averageProductPrice = totalProductPrice / products.length;
                setAverageProductPrice(averageProductPrice);

            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };
        fetchStatistics();
    }, []);

    return (
        <div className='text-white flex flex-col justify-center items-center h-auto'>
            <h1 className='text-7xl font-bold mb-20  mt-20 text-center'><span className='class91BBCA'>Capfashion</span> Statistics</h1>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-2 '>Total Purchases: {totalPurchases}</h2>
            </div>
            <div className='mb-8'>
                <h2 className='text-2xl font-bold mb-2'>Top 3 Products:</h2>
                <ul>
                    {topProducts.map((product) => (
                        <li key={product.id} className='text-xl mb-2'>
                            {product.productname} - {product.quantity} purchases
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className='text-2xl font-bold mb-2'>Products Never Purchased:</h2>
                <ul>
                    {unpurchasedProducts.map((product) => (
                        <li key={product.id} className='text-xl mb-2'>{product.productname}</li>
                    ))}
                </ul>
            </div>
            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-2'>Total Amount Transferred: {totalAmountTransferred}</h2>
            </div>
            <div>
                <h2 className='text-2xl font-bold mb-2'>Highest Paid Seller:</h2>
                {highestPaidSeller && (
                    <div>
                        <p className='text-xl'>Name: {highestPaidSeller.name}</p>
                        <p className='text-xl'>Balance: {highestPaidSeller.balance}</p>
                    </div>
                )}
            </div>
            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-2'>Total Number of Products Sold: {totalProductsSold}</h2>
            </div>
            <div>
                <h2 className='text-2xl font-bold mb-2'>Total Number of Registered Users: {totalUsers}</h2>
            </div>
            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-2'>Average Product Price: {averageProductPrice}</h2>
            </div>
        </div>
    );
};

export default StatisticsPage;
