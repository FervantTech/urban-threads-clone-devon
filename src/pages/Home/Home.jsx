import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">New season · Urban essentials</p>
          <h1>Own the street.</h1>

          <p className="hero-description">
            Everyday streetwear made for bold moves, late nights, and city life.
          </p>

          <Link className="primary-link blue-hover" to="/shop">
            Shop the collection
          </Link>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Urban Threads streetwear" />
        </div>
      </section>

      <section className="collection-intro">
        <div>
          <p className="eyebrow">Urban essentials</p>
          <h2>Built for everyday movement.</h2>
        </div>

        <div>
          <p>
            Explore hoodies, T-shirts, sneakers, and accessories selected for a
            modern streetwear wardrobe.
          </p>
          <Link className="primary-link blue-hover" to="/shop">
            Browse all products
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
