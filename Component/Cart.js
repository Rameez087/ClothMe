export default function Cart(props) {
    return(
        <div className="cart-page">
            <div className="logo-container">
                <img
                    className="logo"
                    src="/static/images/logotransparent.png"
                    alt="ClothMe! logo"
                    width="150"
                    height="50"
                />
            </div>
            <h1>Your Cart</h1>
            <p>Items in your cart</p>
            <div className="cart-items">
                {/* Cart items will be displayed here */}
            </div>
            <button className="checkout-btn">Checkout</button>
        </div>
    )
}