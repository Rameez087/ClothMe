import React from 'react';
import { useState } from 'react';
import { ShoppingCart } from "lucide-react";
import Cart from '../../Component/Cart.js';
import CartContext from '../../pages/context/CartContext.js'; 

import { useEffect } from 'react';
import { useContext } from 'react';
import Navbar from '../../Component/navbar.js';


export default function ProductGallery() {
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
    }
        else{
            console.log("Product already in cart")
        }
        
    }
    function openCart(){
        if (showCart) {
            console.log("Cart opened");
            setShowCart(false)
        }else{
        console.log("Cart opened");
        setShowCart(true)
        }
    }
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    
 





    const [products, setProducts] = useState([]); // State to hold fetched products
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await fetch('/api/getProducts');
            const data = await res.json();
            if (data.success) {
              setProducts(data.products);  
            } else {
              console.error('Failed to fetch products');
            }
          } catch (error) {
            console.error('Error fetching products:', error);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchProducts();
      }, []); 
    
    
      if (loading) {
        return <div>Loading products...</div>;  // Display loading message while fetching
      }
    


    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Navbar/>

        <div className="product-page">
            <div className="logo-container">
                <img
                    className="logo"
                    src="/static/images/logotransparent.png"
                    alt="ClothMe! logo"
                    width="150"
                    height="50"
                />
            </div>
            <button className="cart-btn try-btn" onClick={()=>openCart()}>
                <ShoppingCart size={50} style={{ width: 'auto', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} />
                Cart
            </button>
            {showCart && <Cart c={cartItems} />}
            <div className="product-header">
                <h1>Our Latest Collection</h1>
                <p>Browse our stylish outfits for your virtual try-on experience</p>
            </div>

            <div className="product-grid">
                {products.map((product) => (

                    <div className="product-card" key={product._id}>
                        <img src={product.image} alt={product.name} className="product-img" />
                        <h3>{product.name}</h3>
                        <div className="rating">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < product.rating ? 'filled' : ''}>★</span>
                            ))}
                        </div>
                        <button className="model-btn try-btn">Try On</button>
                        <button className="model-btn try-btn" onClick={()=>addToCart(product._id)}>Buy Now</button>
                    </div>
                )
                )}
            </div>

            <div className="wave-decoration"></div>

            <style jsx>{`
                .try-btn {
                    background-color: white;
                    color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.1);
                    }
                .try-btn:hover {
                    background-color: var(--accent-color);
                    color: white;
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
                    }
                .model-btn {
                    padding: 1.5rem 4rem;
                    border: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    }
                .cart-btn {
                    width: auto;
                    padding: 1.2rem 2rem;
                }
                .cart-btn {
                    padding: 1.5rem 4rem;
                    border: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    }
                .model-btn {
                    width: 60%;
                    padding: 1.2rem 2rem;
                }    
                .product-page {
                    background-color: var(--primary-color);
                    padding: 3rem;
                    max-width: 100%;
                    margin: 0 auto;
                    
                }

                .logo-container {
                    margin-bottom: 2rem;
                }

                .product-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    width: 100%;
                    margin-left: auto;
                    margin-right: auto;
                }


                .product-header h1 {
                    font-size: 2.5rem;
                    color: var(--text-color);
                }

                .product-header p {
                    color: var(--text-color);
                    opacity: 0.8;
                }

                .product-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2rem;
                    justify-content: center;
                }


                .product-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                    text-align: center;
                    transition: transform 0.2s ease;
                    
                }

                .product-card:hover {
                    transform: translateY(-5px);
                }

                .product-img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                }

                .product-card h3 {
                    color: var(--text-color);
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                }

                .rating span {
                    color: #ccc;
                    font-size: 1.2rem;
                    transition: color 0.2s ease;
                }

                .rating .filled {
                    color: gold;
                }

                .wave-decoration {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100px;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FF69B4' fill-opacity='0.2' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
                    background-size: cover;
                }
            `}</style>
        </div>
        </CartContext.Provider>
    );
}

