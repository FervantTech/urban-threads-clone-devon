import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stopListening = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login", { replace: true });
        return;
      }

      setUser(currentUser);

      const cartKey = `cart-${currentUser.uid}`;
      const savedCart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

      setCart(savedCart);
      setLoading(false);
    });

    return stopListening;
  }, [navigate]);

function removeFromCart(productId) {
  const updatedCart = cart
    .map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }

      return product;
    })
    .filter((product) => product.quantity > 0);

  setCart(updatedCart);

  const cartKey = `cart-${user.uid}`;
  localStorage.setItem(cartKey, JSON.stringify(updatedCart));
}

  const totalPrice = cart.reduce(
    (total, product) =>
      total + Number(product.price) * product.quantity,
    0,
  );

  if (loading) {
    return <p>Loading cart...</p>;
  }

    return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-list">
            {cart.map((product) => (
              <article className="cart-item" key={product.id}>
                <img
                  src={product.imageURL}
                  alt={product.name}
                />

                <div className="cart-details">
                  <h2>{product.name}</h2>
                  <p>Quantity: {product.quantity}</p>
                  <p>
                    Price: ${Number(product.price).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove One
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <p>Order summary</p>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button>Checkout</button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;