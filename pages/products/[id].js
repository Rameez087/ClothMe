import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../Component/navbar';

export async function getStaticPaths() {
    try {
        const res = await fetch('http://localhost:3000/api/getProducts');
        const data = await res.json();

        // Ensure that products are available
        if (!data.success || !data.products) {
            return { paths: [], fallback: 'blocking' };
        }

        const paths = data.products.map((product) => ({
            params: { id: product._id.toString() }, // Ensure _id is a string
        }));

        return { paths, fallback: 'blocking' };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { paths: [], fallback: 'blocking' };
    }
}


export async function getStaticProps({ params }) {
    try {
        console.log("Fetching product with ID:", params.id);
        const res = await fetch(`http://localhost:3000/api/getProduct/${params.id}`);
        const data = await res.json();
        console.log("Response from API:", data);

        // If the product is not found or there's an error fetching it, return null
        if (!data.success || !data.product) {
            return { props: { product: null } };
        }

        return {
            props: { product: data.product || null }, // Ensure product is never undefined
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return { props: { product: null } };  // Return null if there's an error
    }
}



export default function ProductDetail({ product }) {
    const router = useRouter();

    if (!product) {
        return <div>Product not found. Please check the URL or try again later.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="product-detail-page">
                <div className="product-detail-card">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-img" 
                        width={500} 
                        height={500} 
                    />
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <span 
                                    key={i} 
                                    className={i < product.rating ? 'filled' : ''}>★
                                </span>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
