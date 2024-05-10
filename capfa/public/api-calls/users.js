export async function fetchUsers() {
    try {
        const response = await fetch('/api/product/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching users:', error);
        throw error;
    }
}

export async function postUser(users) {
    try {
        const response = await fetch('/api/product/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(users),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error posting user:', error);
        throw error;
    }
}

export async function updateUser(user) {
    try {
        const response = await fetch(`/api/product/users/${user.id}`, {
            method: 'PUTCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error updating user:', error);
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/product/users/${userId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error deleting user:', error);
        throw error;
    }
}
