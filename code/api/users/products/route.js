import { deleteProduct, getAllProducts, createProduct, updateProduct } from '@/repos/products';

export async function GET(request) {
    try {
        const products = await getAllProducts();
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error fetching products" }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const productData = await request.json();
        const product = await createProduct(productData);
        return new Response(JSON.stringify(product), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error creating product" }), { status: 400 });
    }
}

export async function PUTCH(request, { params }) {
    try {
        const productData = await request.json();
        const updatedProduct = await updateProduct(params.id, productData);
        return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error updating product" }), { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await deleteProduct(params.id);
        return new Response(JSON.stringify({ message: "Product deleted" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error deleting product" }), { status: 500 });
    }
}
