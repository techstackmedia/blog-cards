import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import { defaultBlogValue } from '../defaultValues';
import { BASE_URL } from '../../constants/BASE_URL';
import { useTheme } from '../../hooks/useTheme';

const BlogContext = createContext(defaultBlogValue);

const BlogProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();
  const [bookMark, setBookMark] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [successDelete, setSuccessDelete] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const initialPageIndex = parseInt(searchParams.get('page')) || 1;
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  useEffect(() => {
    void getAllRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const navigate = useNavigate();

  useEffect(() => {
    void getAllBookmark();
  }, []);

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

  const getAllBookmark = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/bookmarks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error in getting all bookmarked items!');
      } else {
        const json = await response.json();
        setBookMark(json);
      }
    } catch (e) {
      setErrorDelete(e.message);
      setTimeout(() => {
        setErrorDelete(null);
      }, 3000);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error in deleting item.');
      } else {
        setBookMark((prevBookMark) => ({
          ...prevBookMark,
          data: prevBookMark.data.filter((item) => item.id !== id),
        }));
        setSuccessDelete('Item was successfully deleted');
        setTimeout(() => {
          setSuccessDelete('');
        }, 3000);
      }
    } catch (e) {
      setErrorDelete(e.message);
      setTimeout(() => {
        setErrorDelete('');
      }, 3000);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const smoothScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const prevPage = () => {
    setPageIndex((prev) => {
      return prev - 1;
    });
    navigate(`?page=${pageIndex - 1}`);
    smoothScroll();
  };

  const nextPage = () => {
    setPageIndex((prev) => {
      return prev + 1;
    });
    navigate(`?page=${pageIndex + 1}`);
    smoothScroll();
  };

  const handleArticleNav = (link) => {
    navigate(link);
    smoothScroll();
  };

  const pageCount = restaurants?.meta?.pagination.pageCount;

  const getAllRestaurants = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/restaurants?pagination[page]=${pageIndex}&pagination[pageSize]=12`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Error in fetching all restaurants');
      }
      const json = await response.json();
      setRestaurants(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p className='blogs-status'>{error}</p>;
  }

  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
          background: isDark ? '' : '#fff',
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!restaurants?.data || restaurants?.data.length === 0) {
    return <p className='blogs-status'>No blog posts found</p>;
  }
  return (
    <BlogContext.Provider
      value={{
        prevPage,
        nextPage,
        bookMark,
        errorDelete,
        successDelete,
        isDeleteLoading,
        inputLoginPasswordError,
        authToken,
        pageCount,
        deleteBookmark,
        handleArticleNav,
        restaurants,
        isLoginLoading,
        isRegisterLoading,
        handleLoginSubmit,
        errorRegister,
        formLoginData,
        handleRegisterChange,
        handleRegisterSubmit,
        handleLoginChange,
        inputLoginEmailUsenameError,
        inputRegisterPasswordError,
        inputRegisterEmailUsenameError,
        formRegisterData,
        userRegister,
        userLogin,
        pageIndex,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
