import React, { useState } from 'react';    
import CartContext from '../pages/context/CartContext';
import { useContext } from 'react';
import { useEffect } from 'react';
export default function Cart(props) {
    const { cartItems, setCartItems } = useContext(CartContext);
    function removeItem(id){
        console.log(`Product with ID ${id} removed from cart`);
        const product = props.c.find(product => product._id === id);
        if (product) {
            setCartItems((prevCart) => prevCart.filter(item => item._id !== id));
            console.log("Product removed from cart:", product);
        } else {
            console.log("Product not found in cart");
        }
    }
    return(
        <div className="cart-page">
            
            <h1 className="total-btn try-btn">Your Cart</h1>
            
            <div className="product-grid">
                {props.c.map((item) => (
                    <div className="product-card" key={item._id}>
                        <img src={item.image} alt={item.name} className="product-img" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Price: ${item.rating}</p>
                            <button className="model-btn try-btn" onClick={()=>removeItem(item._id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-btn try-btn">
                <h2>Total: ${props.c.reduce((total, item) => total + item.rating, 0)}</h2>
            </div>
            <button className="checkout-btn try-btn">Checkout</button>
            <style jsx>{`
            .total-btn {
                    padding: 1.5rem 4rem;
                    border: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    width: 10%;
                    padding: 1.2rem 2rem;
                    }
            .checkout-btn {
                    padding: 1.5rem 4rem;
                    border: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    width: 10%;
                    padding: 1.2rem 2rem;
                    }
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
                    height: 150px;
                    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FF69B4' fill-opacity='0.2' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
                    background-size: cover;
                }
            `}</style>
        </div>
    )
}