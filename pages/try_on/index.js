import React, { useState, useEffect, useContext } from 'react';
import { ShoppingCart } from "lucide-react";
import Cart from '../../Component/Cart.js';
import CartContext from '../../pages/context/CartContext.js'; 
import Navbar from '../../Component/navbar.js';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router.js';

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/getProducts');
    const data = await res.json();

    return {
      props: { products: data.products },
      revalidate: 60, 
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: { products: [] },
    };
  }
}
export default function ProductGallery({ products: staticProducts }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartItems, setCartItems } = useContext(CartContext);

  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState(staticProducts); 
  const [loading, setLoading] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log("login first");
      router.push('/login');
    }
  }, [status, router]);
    useEffect(() => {
        if (status === 'unauthenticated') {
            console.log("login first");
            router.push('/login');
        }
    }, [status, router]);

  function ProductDetail(id) {
    console.log('------------------------------------------------------------------------')
    router.push(`/products/${id}`);
    console.log('------------------------------------------------------------------------')
    console.log(`Product with ID ${id} clicked`);
  }
    function addToCart(id){
        if(!cartItems.find(item=> item._id === id)){
            console.log(`Product with ID ${id} added to cart`);
            const product = products.find(product => product._id === id);
            if (product) {
                setCartItems((prevCart) => [...prevCart, product]);
                console.log("Product added to cart:", product);
            } else {
                console.log("Product not found");
            }
        } else {
            console.log("Product already in cart")
        }
    }
    function openCart(){
        setShowCart((prev) => !prev);
    }

    
    
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (!session) {
        return null;
        
    }
    else{  console.log(session)
}
    if (loading) {
        return (
            <div className="app-container">
                <Navbar/>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        ); 
    }

    const categories = ['all', ...new Set(products.map(p => p.category || 'uncategorized'))];
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="app-container">
        <Navbar/>
        
        <div className="modern-product-page">
            <div className="container">
                <div className="page-header">
                    <div className="header-content">
                        <h1>Our Latest Collection</h1>
                        <p>Discover our curated selection of premium fashion items</p>
                    </div>
                    
                    <button className="cart-button" onClick={openCart}>
                        <ShoppingCart size={20} />
                        <span>Cart ({cartItems.length})</span>
                        {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                    </button>
                </div>

                <div className="filters-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div className="modern-product-card" key={product._id}>
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-overlay">
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => ProductDetail(product._id)}
                                    >
                                        Try On
                                    </button>
                                </div>
                            </div>
                            
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <div className="product-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`star ${i < (product.rating || 0) ? 'filled' : ''}`}>
                                            ★
                                        </span>
                                    ))}
                                    <span className="rating-text">({product.rating || 0})</span>
                                </div>
                                <div className="product-price">
                                    ${product.price || 'N/A'}
                                </div>
                                <button 
                                    className="btn btn-outline btn-sm add-to-cart-btn"
                                    onClick={() => addToCart(product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <p>No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
        
        {showCart && (
            <div className="cart-overlay" onClick={() => setShowCart(false)}>
                <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                    <Cart c={cartItems} />
                </div>
            </div>
        )}
        </div>
    );
}

