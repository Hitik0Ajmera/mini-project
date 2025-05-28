import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5272/api/Auth/logout', {}, {
        withCredentials: true // Include cookies in the request
      });
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      if (error.response && error.response.data.Errors) {
        alert(error.response.data.Errors.join(', '));
      } else {
        alert('An error occurred during logout.');
      }
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default Logout;