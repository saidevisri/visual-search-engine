import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ← Add useNavigate
import { Star } from "lucide-react";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ← Initialize navigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <ShimmerLoader />;

  return (
    <div className="flipkart-container">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      {/* <Breadcrumbs product={product} /> */}

      <div className="flipkart-card">
        <div className="flipkart-image-box">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="flipkart-details">
          <h1 className="flipkart-title">{product.name}</h1>

          <div className="flipkart-rating">
            <Star size={16} fill="white" color="green" />
            <span className="rating-text">{product.rating} ★</span>
            <span className="review-count">({product.reviews.length} reviews)</span>
          </div>

          <div className="flipkart-price">₹{product.price}</div>

          <p className="flipkart-stock">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

          <div className="flipkart-offers">
            <p>Available Offers</p>
            <ul>
              <li>10% off with Credit Card</li>
              <li>Free Delivery above ₹999</li>
              <li>5% off on first purchase</li>
            </ul>
          </div>

          <div className="flipkart-desc">
            <p className="desc-title">Description</p>
            <p>{product.description}</p>
          </div>

          <div className="flipkart-tags">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="flipkart-tag">#{tag}</span>
            ))}
          </div>

          <p className="flipkart-seller">
            <strong>Sold by:</strong> {product.seller}
          </p>

          <div className="flipkart-buttons">
            <button className="cart-btn">Add to Cart</button>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShimmerLoader = () => (
  <div className="shimmer-container">
    <div className="shimmer-card">
      <div className="shimmer-image shimmer"></div>
      <div className="shimmer-lines">
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line shimmer"></div>
        <div className="shimmer-line shimmer"></div>
      </div>
    </div>
  </div>
);

export default ProductDetails;
