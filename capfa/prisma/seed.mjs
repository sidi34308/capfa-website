import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.createMany({
        data: [
            {
                type: 'admin',
                name: 'Admin User',
                password: 'admin123',
                balance: 10000.00,
                image: "media/admin.jpg"
            },
            {
                type: 'seller',
                name: 'Seller 1',
                password: 'seller123',
                balance: 5000.00,
                image: "media/seller1.jpg"
            },
            {
                type: 'seller',
                name: 'Seller 2',
                password: 'seller123',
                balance: 5000.00,
                image: "media/seller2.jpg"
            },
            {
                type: 'buyer',
                name: 'Buyer 1',
                password: 'buyer123',
                balance: 2000.00,
                image: "media/buyer1.jpg"
            },
            {
                type: 'buyer',
                name: 'Buyer 2',
                password: 'buyer123',
                balance: 2000.00,
                image: "media/buyer2.jpg"
            }
        ]
    });

    console.log({ user: { count: users.length } });

    const products = await prisma.product.createMany({
        data: [
            {
                image: "media/pic1.jpg",
                productname: "Black jeans",
                price: 99.00,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic3.jpg",
                productname: "White jeans",
                price: 89,
                quantity: 9,
                sellerId: 3
            },
            {
                image: "media/pic5.jpg",
                productname: "Bag",
                price: 129,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic6.webp",
                productname: "Hat",
                price: 69,
                quantity: 10,
                sellerId: 1
            },
            {
                image: "media/pic5.jpg",
                productname: "Hat",
                price: 79,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic6.webp",
                productname: "Hat",
                price: 39,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic8.webp",
                productname: "Regular Fit Textured-knit resort shirt",
                price: 69,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic9.webp",
                productname: "Regular Fit Linen-mix trousers",
                price: 89,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic10.jpg",
                productname: "Relaxed Jeans",
                price: 79,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic11.jpg",
                productname: "Loose Jeans",
                price: 99,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic12.jpg",
                productname: "Reglar Fit Cargo trousers",
                price: 120,
                quantity: 10,
                sellerId: 3
            },
            {
                image: "media/pic8.webp",
                productname: "Regular Fit Oxford shirt",
                price: 59.00,
                quantity: 10,
                sellerId: 3
            }
        ]
    });

    console.log({ products });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
