// contact,email,Name,phone number,address,profile photo. i want ta admin profile page that display these informations coming from my backend
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Services/api';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        setProfile(response.data);
      } catch (error) {
        alert('Failed to fetch profile: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-32 h-32  shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="text-gray-800">
              <span className="font-semibold">Phone:</span> {profile.phone}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Address:</span> {profile.address}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
