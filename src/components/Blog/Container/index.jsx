import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { calculateReadingTime, countWords } from '../../../utils/Content';
import { useTheme } from '../../../hooks/useTheme';
import { BASE_URL } from '../../../constants/BASE_URL';
import Spinner from '../../shared/Spinner';
import { BlogContext } from '../../../context/BlogContext';

const BlogContainer = ({
  item,
  cardTitle,
  truncatedWords,
  formattedDate,
  handleArticleNav,
  cardDescription,
}) => {
  const { restaurants, deleteBookmark, authToken } = useContext(BlogContext);
  const userId = localStorage.getItem('user_id');
  useEffect(() => {
    const wordsPerMinute = 225;
    const wordCount = countWords(cardDescription);
    const estimatedTime = calculateReadingTime(wordCount, wordsPerMinute);
    setReadingTime(estimatedTime);
  }, [cardDescription]);
  const [readingTime, setReadingTime] = useState(0);
  const { isDark } = useTheme();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [bookmark, setBookMark] = useState(null);
  const [success, setSuccess] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      setSuccess(null);
    };
  }, []);

  const restaurantList = restaurants.data;

  const handleBookMark = async (id) => {
    const restaurant = restaurantList.find((item) => {
      return item.id === id;
    });
    const request = {
      data: {
        Name: restaurant?.attributes.Name,
        Description: restaurant?.attributes.Description,
      },
    };
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error('Error in adding item to bookmark page!');
      } else {
        const json = await response.json();
        setBookMark(json);
      }
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (success) {
    return <p>{success}</p>;
  }

  return (
    <div className={`blog-card ${isDark ? 'dark-blog-card' : ''}`}>
      <div
        onClick={
          pathname === `/bookmark/${userId}`
            ? () => deleteBookmark(item.id)
            : () => handleBookMark(item.id)
        }
        style={{
          cursor: 'pointer',
          position: 'absolute',
          bottom: 5,
          color: '#fff',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <span style={{ color: isDark ? 'var(--color-white)' : 'var(--color-black)' }}>
          {pathname.includes('/bookmark') ? 'Delete' : 'Save'}
        </span>
      </div>
      <div
        className={`blog-card-image ${
          isDark ? 'blog-card-image' : 'dark-blog-card-image'
        }`}
        onClick={() => handleArticleNav(`/${item.id}`)}
      >
        <h1 className={`blog-card-title ${isDark ? 'dark-blog-title' : ''}`}>
          {cardTitle}
        </h1>
      </div>
      <div className='blog-card-body'>
        <div className='blog-card-content'>
          <p
            className={`blog-card-published-date ${
              isDark ? 'dark-blog-card-published-date' : ''
            }`}
          >
            <span>{formattedDate}</span> &mdash;{' '}
            <span>
              {readingTime} {readingTime === 1 ? 'minute' : 'minutes'} read
            </span>
          </p>
          <h2
            className={`blog-card-title ${
              isDark ? 'dark-blog-card-title' : ''
            }`}
          >
            <Link to={`/${item.id}`}>{cardTitle}</Link>
          </h2>
          <p
            className={`blog-card-description ${
              isDark ? 'dark-blog-card-description' : ''
            }`}
          >
            <Link to={`/${item.id}`}>{truncatedWords}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
