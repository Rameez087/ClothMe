import React, { useState } from 'react';    
import CartContext from '../pages/context/CartContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Cart(props) {
    const router = useRouter();
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
    function checkoutHandler(){
        router.push('/checkout')
    }
    return(
        <div className="modern-cart">
            <div className="cart-header">
                <h2>Your Cart</h2>
                <button className="close-cart-btn" onClick={() => window.history.back()}>×</button>
            </div>
            
            <div className="cart-items-container">
                {props.c.map((item) => (
                    <div className="modern-cart-item" key={item._id}>
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-price">${item.price}</p>
                            <button className="btn btn-outline btn-sm remove-btn" onClick={()=>removeItem(item._id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {props.c.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="cart-total">
                        <h3>Total: ${props.c.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
                    </div>
                    <div className="cart-actions">
                        <Link href="/checkout" legacyBehavior>
                            <a className="btn btn-primary btn-lg checkout-btn">
                                Proceed to Checkout
                            </a>
                        </Link>
                    </div>
                </>
            )}

            <style jsx>{`
                .modern-cart {
                    background: white;
                    border-radius: var(--radius-lg);
                    padding: 0;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .cart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                    background: var(--secondary-color);
                }

                .cart-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-color);
                }

                .close-cart-btn {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #64748b;
                    padding: 0;
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }

                .close-cart-btn:hover {
                    background: #f1f5f9;
                    color: var(--text-color);
                }

                .cart-items-container {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .modern-cart-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    margin-bottom: 1rem;
                    transition: all 0.2s ease;
                }

                .modern-cart-item:hover {
                    box-shadow: var(--shadow-sm);
                }

                .cart-item-image {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: var(--radius-sm);
                    flex-shrink: 0;
                }

                .cart-item-details {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .item-name {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--text-color);
                    margin: 0;
                }

                .item-price {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--accent-color);
                    margin: 0;
                }

                .remove-btn {
                    align-self: flex-start;
                    margin-top: auto;
                }

                .empty-cart {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: #64748b;
                }

                .cart-total {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid var(--border-color);
                    background: var(--secondary-color);
                }

                .cart-total h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-color);
                    text-align: right;
                }

                .cart-actions {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid var(--border-color);
                }

                .checkout-btn {
                    width: 100%;
                    text-align: center;
                    text-decoration: none;
                }
            `}</style>
        </div>
    )
}

            </div>
                <Link href="/checkout" legacyBehavior>
                <a>
                    <button className="checkout-btn ">Checkout Now</button>
                </a>
                </Link>
             
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
                    padding: 0.8rem 2rem;
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
                    .checkout-btn {
                    background-color: white;
                    color: var(--accent-color);
                    border: 2px solid var(--accent-color);
                    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.1);
                    }
                .checkout-btn:hover {
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
                    width: 100%;
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