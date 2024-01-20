import { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import { defaultBlogValue } from '../defaultValues';
import { BASE_URL } from '../../constants/BASE_URL';
import { useTheme } from '../../hooks/useTheme';
import { BlogAuthContext } from '../BlogAuthContext';
import useFetch from '../../hooks/useFetch';

const BlogContext = createContext(defaultBlogValue);

const BlogProvider = ({ children }) => {
  const {isLoading, error, restaurants, setPageIndex, pageIndex} = useFetch(`${BASE_URL}/restaurants`,         {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }, 'Error in fetching all restaurants')
  const { pathname } = useLocation();
  const { isDark } = useTheme();
  const { authToken } = useContext(BlogAuthContext);
  const navigate = useNavigate();

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
