import React, { useState, useEffect } from 'react';
import api from '../../Services/api';

function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        setProducts(response.data);
      } catch (error) {
        alert('Failed to fetch products: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchProducts();
  }, []);

  const incrementStock = async (id) => {
    try {
      await api.patch(`/products/${id}/increment`);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, stock: product.stock + 1 } : product
        )
      );
    } catch (error) {
      alert('Failed to increment stock: ' + (error.response?.data?.message || error.message));
    }
  };

  const decrementStock = async (id) => {
    try {
      await api.patch(`/products/${id}/decrement`);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id && product.stock > 0
            ? { ...product, stock: product.stock - 1 }
            : product
        )
      );
    } catch (error) {
      alert('Failed to decrement stock: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800 mt-2">
              <span className="font-semibold">Final Price:</span> {product.finalPrice}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => decrementStock(product.id)}
                className="bg-blue-400 text-white py-1 px-3 rounded-lg hover:bg-blue-500 transition"
              >
                -
              </button>
              <button
                onClick={() => incrementStock(product.id)}
                className="bg-blue-400 text-white py-1 px-3 rounded-lg hover:bg-blue-500 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;