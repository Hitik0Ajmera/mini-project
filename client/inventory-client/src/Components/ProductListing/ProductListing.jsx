import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Product 1', price: '$20', image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 10 },
  { id: 2, name: 'Product 2', price: '$30', image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 15 },
  { id: 3, name: 'Product 3', price: '$40', image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 8 },
  { id: 4, name: 'Product 4', price: '$25', image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 20 },
  { id: 5, name: 'Product 5', price: '$50', image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 5 },
  { id: 6, name: 'Product 6', price: '$35', image: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', stock: 12 },
];

function ProductListing() {
  const [products, setProducts] = useState(initialProducts);

  const incrementStock = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, stock: product.stock + 1 } : product
      )
    );
  };

  const decrementStock = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.stock > 0
          ? { ...product, stock: product.stock - 1 }
          : product
      )
    );
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
            <p className="text-gray-600">{product.price}</p>
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