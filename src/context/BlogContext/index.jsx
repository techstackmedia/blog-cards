import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import { defaultBlogValue } from '../defaultValues';
import { BASE_URL } from '../../constants/BASE_URL';
import { useTheme } from '../../hooks/useTheme';
import { BlogAuthContext } from '../BlogAuthContext';

const BlogContext = createContext(defaultBlogValue);

const BlogProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [restaurants, setRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();
  const searchParams = new URLSearchParams(window.location.search);
  const initialPageIndex = parseInt(searchParams.get('page')) || 1;
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const { authToken } = useContext(BlogAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    void getAllRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

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

  const pageCount =
    pathname === '/' ? restaurants?.meta?.pagination.pageCount : null;

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
    return (
      <p className='blogs-status'>
        <span>{error}</span>
      </p>
    );
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
        authToken,
        pageCount,
        handleArticleNav,
        restaurants,
        pageIndex,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogProvider, BlogContext };
