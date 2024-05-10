import prisma from "../repo/prisma";

export async function getAllProducts() {
    return prisma.product.findMany({
        include: {
            seller: true,
        },
    });
}

export async function getProductById(id) {
    return prisma.product.findUnique({
        where: {
            id: id,
        },
        include: {
            seller: true,
        },
    });
}

export async function createProduct(data) {
    return prisma.product.create({
        data: data,
    });
}

export async function updateProduct(id, data) {
    return prisma.product.update({
        where: {
            id: id,
        },
        data: data,
    });
}

export async function deleteProduct(id) {
    return prisma.product.delete({
        where: {
            id: id,
        },
    });
}
