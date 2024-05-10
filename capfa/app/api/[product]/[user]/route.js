import { getAllUsers, createUser, updateUser, deleteUser } from '../../repo/users';

export async function GET(request) {
    try {
        const users = await getAllUsers();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error fetching users" }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const userData = await request.json();
        const user = await createUser(userData);
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error creating user" }), { status: 400 });
    }
}

export async function PUTCH(request, { params }) {
    try {
        const userData = await request.json();
        const updatedUser = await updateUser(params.id, userData);
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error updating user" }), { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await deleteUser(params.id);
        return new Response(JSON.stringify({ message: "User deleted" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error deleting user" }), { status: 500 });
    }
}
