import { Link } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import { calculateReadingTime, countWords } from '../../../utils/Content';
import { useTheme } from '../../../hooks/useTheme';

const BlogContainer = ({
  item,
  cardTitle,
  truncatedWords,
  formattedDate,
  handleArticleNav,
  cardDescription,
}) => {
  const [readingTime, setReadingTime] = useState(0);
  const { isLight } = useTheme();

  useEffect(() => {
    const wordsPerMinute = 225;
    const wordCount = countWords(cardDescription);
    const estimatedTime = calculateReadingTime(wordCount, wordsPerMinute);
    setReadingTime(estimatedTime);
  }, [cardDescription]);

  return (
    <div className={`blog-card ${isLight ? 'dark-blog-card' : ''}`}>
      <div
        className={`blog-card-image ${isLight ? 'blog-card-image' : 'dark-blog-card-image'}`}
        onClick={() => handleArticleNav(`/${item.id}`)}
      >
        <h1 className={`blog-card-title ${isLight ? 'dark-blog-title' : ''}`}>{cardTitle}</h1>
      </div>
      <div className='blog-card-body'>
        <div className='blog-card-content'>
          <p className={`blog-card-published-date ${isLight ? 'dark-blog-card-published-date' : ''}`}>
            <span>{formattedDate}</span> &mdash;{' '}
            <span>
              {readingTime} {readingTime === 1 ? 'minute' : 'minutes'} read
            </span>
          </p>
          <h2 className={`blog-card-title ${isLight ? 'dark-blog-card-title' : ''}`}>
            <Link to={`/${item.id}`}>{cardTitle}</Link>
          </h2>
          <p className={`blog-card-description ${isLight ? 'dark-blog-card-description' : ''}`}>
            <Link to={`/${item.id}`}>{truncatedWords}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
