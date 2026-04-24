import React, { useState, useEffect } from 'react';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products/');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                // The backend returns { products: [...] }
                setProducts(Array.isArray(data.products) ? data.products : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="shop-container">
            <h1>Productos</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span className="price">${product.price}</span>
                        <button>Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;