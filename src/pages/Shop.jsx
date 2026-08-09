import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const productList = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setProducts(productList);
      } catch (error) {
        setError("Could not load products.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  function handleAddToCart(product) {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in before adding products to your cart.");
      navigate("/login");
      return;
    }

    const cartKey = `cart-${user.uid}`;
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingProduct = savedCart.find(
      (item) => item.id === product.id,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      savedCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(savedCart));
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Shop</h1>

      <section className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.imageURL} alt={product.name} />
            <p>{product.category}</p>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <strong>${Number(product.price).toFixed(2)}</strong>

            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Shop;