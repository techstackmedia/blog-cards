import { useState } from 'react';
import { BASE_URL } from '../../../../constants/BASE_URL';
import Spinner from '../../../shared/Spinner';
import { Navigate } from 'react-router-dom';
import Navbar from '../../../Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setIsLoading(true)
      const response = await fetch(`${BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      setUser(json.jwt);
    } catch {
        setError(e.message)
    } finally {
        setIsLoading(false)
    }
  };
  localStorage.setItem('auth_token', user)
  
  if (user) {
    return <Navigate to='/' />
  }

  console.log(user)

  if (error) {
    return <p>{error}</p>
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
        <Navbar />
      <form onSubmit={handleSubmit} style={{marginTop: 100}}>
        <input type='text' placeholder='Your Username' name='username' value={formData.username} onChange={handleChange} required />
        <input type='email' placeholder='Your Email' name='email' value={formData.email} onChange={handleChange} required />
        <input type='password' placeholder='Your Password' name='password' value={formData.password} onChange={handleChange} required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
