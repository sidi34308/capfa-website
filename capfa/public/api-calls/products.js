
export async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function postProduct(product) {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting product:', error);
        throw error;
    }
}

export async function updateProduct(product) {
    try {
        const response = await fetch(`/api/products`, {
            method: 'PUTCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await fetch(`/api/product/${productId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
