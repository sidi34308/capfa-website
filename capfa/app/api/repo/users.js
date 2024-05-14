import prisma from "../repo/prisma";

export async function getAllUsers() {
    return prisma.user.findMany({
        include: {
            past_purchases: true,
        }
    });
}

export async function getUserById(id) {
    return prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            past_purchases: true,
        },
    });
}

export async function createUser(data) {
    return prisma.user.create({
        data: data,
    });
}

export async function updateUser(id, data) {
    return prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: data,

    });
}

export async function deleteUser(id) {
    return prisma.user.delete({
        where: {
            id: parseInt(id),
        },
    });
}
