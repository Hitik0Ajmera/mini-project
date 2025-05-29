import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import api from '../../api';
import { AuthContext } from '../Context/AuthContext';
import api from '../../Services/api';

function Header() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    finalPrice: '', // This will be calculated
    stock: '',
    description: '',
    imageUrl: '',
    categoryId: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        alert('Failed to load categories: ' + (error.response?.data?.Errors?.join(', ') || error.message));
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/login');
    }
  };

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Calculate FinalPrice whenever Price or Discount changes
      if (name === 'price' || name === 'discount') {
        const price = parseFloat(updatedFormData.price) || 0;
        const discount = parseFloat(updatedFormData.discount) || 0;
        updatedFormData.finalPrice = price - (price * discount) / 100;
      }

      return updatedFormData;
    });

    // Clear error for the field being edited
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.price || formData.price < 0) errors.price = 'Price must be a positive number.';
    if (formData.discount < 0 || formData.discount > 100) errors.discount = 'Discount must be between 0 and 100.';
    if (!formData.stock || formData.stock < 0) errors.stock = 'Stock must be a positive number.';
    if (!formData.description) errors.description = 'Description is required.';
    if (!formData.imageUrl) errors.imageUrl = 'Image URL is required.';
    if (!formData.categoryId) errors.categoryId = 'Category is required.';
    return errors;
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Prepare the product data (ensure FinalPrice is calculated)
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        finalPrice: parseFloat(formData.finalPrice),
        stock: parseInt(formData.stock),
        description: formData.description,
        imageUrl: formData.imageUrl,
        categoryId: formData.categoryId,
      };

      await api.post('/product', productData, { withCredentials: true });
      alert('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        discount: '',
        finalPrice: '',
        stock: '',
        description: '',
        imageUrl: '',
        categoryId: '',
      });
      setShowModal(false);
      window.dispatchEvent(new Event('product-added'));
    } catch (error) {
      alert('Failed to add product: ' + (error.response?.data?.Errors?.join(', ') || error.message));
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Inventory App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            {isLoggedIn && isAdmin && (
              <li>
                <button
                  onClick={() => setShowModal(true)}
                  className="hover:underline focus:outline-none"
                >
                  Add Product
                </button>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline focus:outline-none"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
                {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="discount"
                  placeholder="Discount (%)"
                  value={formData.discount}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
                {formErrors.discount && <p className="text-red-500 text-sm">{formErrors.discount}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="finalPrice"
                  placeholder="Final Price (calculated)"
                  value={formData.finalPrice}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  readOnly
                />
              </div>
              <div>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.stock && <p className="text-red-500 text-sm">{formErrors.stock}</p>}
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.imageUrl && <p className="text-red-500 text-sm">{formErrors.imageUrl}</p>}
              </div>
              <div>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleAddProductChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formErrors.categoryId && <p className="text-red-500 text-sm">{formErrors.categoryId}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;