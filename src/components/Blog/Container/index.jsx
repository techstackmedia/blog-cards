import { Link } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import {
  calculateReadingTime,
  countWords,
} from '../../../utils/ContentReadingTime';

const BlogContainer = ({
  item,
  cardTitle,
  truncatedWords,
  formattedDate,
  handleArticleNav,
  cardDescription,
}) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const wordsPerMinute = 225;
    const wordCount = countWords(cardDescription);
    const estimatedTime = calculateReadingTime(wordCount, wordsPerMinute);
    setReadingTime(estimatedTime);
  }, [cardDescription]);
  return (
    <div className='blog-card'>
      <div
        className='blog-card-image'
        onClick={() => handleArticleNav(`/${item.id}`)}
      >
        <p className='blog-card-title'>{cardTitle}</p>
      </div>
      <div className='blog-card-body'>
        <div className='blog-card-content'>
          <h2 className='blog-card-title'>
            <Link to={`/${item.id}`}>{cardTitle}</Link>
          </h2>
          <p className='blog-card-description'>
            <Link to={`/${item.id}`}>{truncatedWords}</Link>
          </p>
          <p className='blog-card-published-date'>
            <span>{formattedDate}</span> &mdash;{' '}
            <span>
              {readingTime} {readingTime === 1 ? 'minute' : 'minutes'} read
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogContainer;
