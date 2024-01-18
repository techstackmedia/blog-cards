import { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../constants/BASE_URL';
import { useNavigate } from 'react-router-dom';
import { defaultAuthContext } from '../defaultValues';

const BlogAuthContext = createContext(defaultAuthContext);
const BlogAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formRegisterData, setFormRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState(null);
  const [JWTRegister, setJWTRegister] = useState(null);
  const [userRegister, setUserRegister] = useState(null);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setFormRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsRegisterLoading(true);
      const response = await fetch(`${BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegisterData),
      });
      const json = await response.json();
      if (response.ok) {
        setJWTRegister(json.jwt);
        setUserRegister(json.user);
        localStorage.setItem('auth_token', json.jwt);
        localStorage.setItem('user_id', json.user.id);
        localStorage.setItem('user_email', json.user.email);
        localStorage.setItem('user_name', json.user.username);
        // navigate('/');
      } else {
        setErrorRegister(json.error.message);
        setTimeout(() => {
          setErrorRegister(null);
        }, 3000);
      }
    } catch {
      setErrorRegister(e.message);
      setTimeout(() => {
        setErrorRegister(null);
      }, 3000);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  useEffect(() => {
    if (JWTRegister) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JWTRegister]);

  const inputRegisterEmailUsenameError =
    errorRegister === 'Email or Username are already taken'
      ? errorRegister
      : null;
  const inputRegisterPasswordError =
    errorRegister === 'password must be at least 6 characters'
      ? errorRegister
      : null;

  const [formLoginData, setFormLoginData] = useState({
    identifier: '',
    password: '',
  });
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  const [JWTLogin, setJWTLogin] = useState(null);
  const [userLogin, setUserLogin] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoginLoading(true);
      const response = await fetch(`${BASE_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formLoginData),
      });
      const json = await response.json();
      if (response.ok) {
        setJWTLogin(json.jwt);
        setUserLogin(json.user);
        localStorage.setItem('auth_token', json.jwt);
        localStorage.setItem('user_id', json.user.id);
        localStorage.setItem('user_email', json.user.email);
        localStorage.setItem('user_name', json.user.username);
        // navigate('/');
      } else {
        setErrorLogin(json.error.message);
        setTimeout(() => {
          setErrorLogin(null);
        }, 3000);
      }
    } catch {
      setErrorLogin(e.message);
      setTimeout(() => {
        setErrorLogin(null);
      }, 3000);
    } finally {
      setIsLoginLoading(false);
    }
  };

  useEffect(() => {
    if (JWTLogin) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JWTLogin]);

  const inputLoginEmailUsenameError =
    errorLogin === 'identifier is a required field' ? errorLogin : null;
  const inputLoginPasswordError =
    errorLogin === 'password is a required field' ? errorLogin : null;

  const authToken = localStorage.getItem('auth_token');
  return (
    <BlogAuthContext.Provider
      value={{
        isRegisterLoading,
        userRegister,
        handleRegisterChange,
        handleRegisterSubmit,
        inputRegisterEmailUsenameError,
        inputRegisterPasswordError,
        isLoginLoading,
        userLogin,
        handleLoginChange,
        handleLoginSubmit,
        inputLoginEmailUsenameError,
        inputLoginPasswordError,
        authToken,
      }}
    >
      {children}
    </BlogAuthContext.Provider>
  );
};

export { BlogAuthProvider, BlogAuthContext };
