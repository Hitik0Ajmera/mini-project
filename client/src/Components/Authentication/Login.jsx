import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Login Data Submitted:', formData);
        // Add your login request logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen shadow-lg">
            <form className="w-96 p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
                        ID:
                    </label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <p className="text-center mt-4">
                    Don't have an account? <Link to="/" className="text-blue-500">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;