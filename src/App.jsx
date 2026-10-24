
import { useState } from "react";
import "./App.css";

const BUSINESS = {
  name: "Maa Vooru Chapalu",
  phone: "917288900770",
  address: "ekuvuru village, sompeta mandel, srikakulam dist",
};

const fishProducts = [
  {
    id: 1,
    name: "Fresh Rohu",
    category: "Freshwater",
    price: 250,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Fresh Prawns",
    category: "Seafood",
    price: 400,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Fresh Fish",
    category: "Seafood",
    price: 300,
    unit: "kg",
    image:
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=800&q=80",
  },
];

function App() {
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");

  const filteredFish = fishProducts.filter((fish) =>
    fish.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = fishProducts.reduce(
    (sum, fish) => sum + fish.price * (cart[fish.id] || 0),
    0
  );

  function updateQuantity(id, change) {
    setCart((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + change),
    }));
  }

  function orderOnWhatsApp() {
    const items = fishProducts
      .filter((fish) => cart[fish.id] > 0)
      .map(
        (fish) =>
          `${fish.name} - ${cart[fish.id]} kg = ₹${
            fish.price * cart[fish.id]
          }`
      );

    if (items.length === 0) {
      alert("Please add fish to your cart first.");
      return;
    }

    const message = `Hello ${BUSINESS.name}, I want to order:\n${items.join(
      "\n"
    )}\nTotal: ₹${total}`;

    window.open(
      `https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <div>
      <header className="navbar">
        <a className="brand" href="#">
          🐟 Maa Vooru Chapalu
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#fish">Our Fish</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="call-button" href={`tel:+${BUSINESS.phone}`}>
          Call Now
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">FRESHNESS YOU CAN TRUST</p>
          <h1>Fresh Fish, Straight to Your Kitchen.</h1>
          <p>
            Welcome to Maa Vooru Chapalu. Explore our selection of fish
            and seafood and place your order with us.
          </p>
          <a className="primary-button" href="#fish">
            Explore Fresh Fish
          </a>
        </div>
      </section>

      <section className="benefits">
        <div>🐟 Fresh Selection</div>
        <div>📦 Easy Ordering</div>
        <div>📱 WhatsApp Support</div>
      </section>

      <section className="products-section" id="fish">
        <div className="section-heading">
          <p className="eyebrow">OUR COLLECTION</p>
          <h2>Choose Your Fish</h2>
          <p>Choose your quantity and order directly through WhatsApp.</p>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Search for fish..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="product-grid">
          {filteredFish.map((fish) => (
            <article className="product-card" key={fish.id}>
              <img src={fish.image} alt={fish.name} />

              <div className="product-details">
                <span className="category">{fish.category}</span>
                <h3>{fish.name}</h3>
                <p className="price">
                  ₹{fish.price} <span>/ {fish.unit}</span>
                </p>

                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(fish.id, -1)}
                    aria-label={`Remove ${fish.name}`}
                  >
                    −
                  </button>
                  <span>{cart[fish.id] || 0} kg</span>
                  <button
                    onClick={() => updateQuantity(fish.id, 1)}
                    aria-label={`Add ${fish.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredFish.length === 0 && (
          <p className="empty-message">No matching fish found.</p>
        )}

        <div className="order-summary">
          <div>
            <span>Estimated total</span>
            <h2>₹{total}</h2>
          </div>
          <button className="primary-button" onClick={orderOnWhatsApp}>
            Order on WhatsApp
          </button>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">WE ARE HERE TO HELP</p>
        <h2>Contact Maa Vooru Chapalu</h2>
        <p>{BUSINESS.address}</p>
        <a className="primary-button" href={`tel:+${BUSINESS.phone}`}>
          📞 Call Our Shop
        </a>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Maa Vooru Chapalu</p>
        <p>Fresh fish. Easy ordering.</p>
      </footer>
    </div>
  );
}

export default App;
