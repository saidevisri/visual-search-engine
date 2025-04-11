import React, { useState, useEffect } from 'react';
import './Body.css';
import { FaUpload, FaSearch } from 'react-icons/fa';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom'; // <-- Import Link

const Body = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // 👇 Fetch all data on component mount
    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/api/");
                const data = await res.json();
                setSearchResults(data);
            } catch (err) {
                console.error("Error fetching all products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/search", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setSearchResults(result);
        } catch (error) {
            console.error("Error searching image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body-container">
            {preview && (
                <div className="preview-container">
                    <img src={preview} alt="Preview" className="preview-image" />
                </div>
            )}

            <div className="upload-section">
                <label className="custom-file-upload">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <FaUpload className="icon" /> Upload Image
                </label>
                <button className="search-btn" onClick={handleUpload}>
                    <FaSearch className="icon" /> Search
                </button>
            </div>

            <div className="search-results">
                <h2>Search Results</h2>
                <div className="results-grid">
                    {loading ? (
                        <>
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                            <Shimmer />
                        </>
                    ) : searchResults.length > 0 ? (
                        searchResults.map((product) => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                className="product-card"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <img src={product.imageUrl} alt={product.name} />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-seller">Sold by: {product.seller}</p>
                                    <p className="product-rating">⭐ {product.rating}</p>
                                    <p className="product-price">₹ {product.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Body;
