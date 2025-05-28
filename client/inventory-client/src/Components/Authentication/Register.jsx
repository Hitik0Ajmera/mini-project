import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      photoUrl: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
        )
        .required("Password is required"),
      phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .required("Phone number is required"),
      address: Yup.string()
        .max(200, "Address cannot exceed 200 characters")
        .required("Address is required"),
      photoUrl: Yup.string().url("Invalid URL format").optional(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          "http://localhost:5272/api/Auth/register",
          values
        );
        navigate('/login');
        
        alert(response.data.Message); // Show success message
        // Redirect to login page or dashboard

      } catch (error) {
        if (error.response && error.response.data.Errors) {
          setErrors({ submit: error.response.data.Errors.join(", ") });
        } else {
          setErrors({ submit: "An error occurred during registration." });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register Admin</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full p-2 border rounded"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-2 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full p-2 border rounded"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}
        </div>
        <div>
          <label htmlFor="address" className="block">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="w-full p-2 border rounded"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-sm">{formik.errors.address}</div>
          )}
        </div>
        <div>
          <label htmlFor="photoUrl" className="block">
            Photo URL (Optional)
          </label>
          <input
            id="photoUrl"
            name="photoUrl"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.photoUrl}
            className="w-full p-2 border rounded"
          />
          {formik.touched.photoUrl && formik.errors.photoUrl && (
            <div className="text-red-500 text-sm">{formik.errors.photoUrl}</div>
          )}
        </div>
        {formik.errors.submit && (
          <div className="text-red-500 text-sm">{formik.errors.submit}</div>
        )}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
