import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">New season · Urban essentials</p>
          <h1>Own the street.</h1>

          <p className="hero-description">
            Everyday streetwear made for bold moves, late nights,
            and city life.
          </p>

          <Link className="primary-link" to="/shop">
            Shop the collection
          </Link>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Urban Threads streetwear" />
        </div>
      </section>

      <section className="categories">
        <p className="eyebrow">Shop by category</p>
        <h2>Find your fit</h2>

        <div className="category-list">
          <Link to="/shop">Hoodies</Link>
          <Link to="/shop">T-shirts</Link>
          <Link to="/shop">Sneakers</Link>
          <Link to="/shop">Accessories</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;