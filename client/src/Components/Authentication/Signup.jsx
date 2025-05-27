import React, { useState } from 'react';
import { api } from '../../Servies/api';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({}); // Corrected initial state and variable name

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, // Corrected variable name
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Form Data Submitted:', formData); // Added a log for debugging
        const responce= api('/signup', 'POST', formData)
        if (responce.status==200) {
            alert('Signup successful!');
        } else {
            alert('Signup failed. Please try again.');
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen shadow-lg">
            <form className="w-96 p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        onChange={handleChange}
                    />
                </div>
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
                    Sign Up
                </button>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
