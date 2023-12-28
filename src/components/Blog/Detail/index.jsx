import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogDetailContext } from '../../../context/BlogDetailContext';
import { BlogContext } from '../../../context/BlogContext';
import { dateFormatter } from '../../../utils/Formatter';
import { calculateReadingTime, countWords } from '../../../utils/Content';
import './styles.css';

const BlogDetail = () => {
  const [readingTime, setReadingTime] = useState(0);
  const { renderHTML, getRestaurantsPost } = useContext(BlogDetailContext);
  const { restaurants } = useContext(BlogContext);
  const { id } = useParams();

  useEffect(() => {
    void getRestaurantsPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const content = renderHTML().__html;
  const wordsPerMinute = 225;

  useEffect(() => {
    if (content) {
      const wordCount = countWords(content);
      const estimatedTime = calculateReadingTime(wordCount, wordsPerMinute);
      setReadingTime(estimatedTime);
    }
  }, [content, renderHTML]);

  const restaurant = restaurants?.data.find((item) => {
    return item.id === +id;
  });

  const publishedDate = restaurant?.attributes?.publishedAt;

  if (!content) {
    return null;
  }

  return (
    <div className='blog-detail'>
      <p>
        <Link to='/'>&lt; Blog</Link>
      </p>
      <div className='blog-cover'>
        <p className='blog-cover-text'>{restaurant?.attributes?.Name}</p>
        <img
          className='blog-cover-image'
          src='http://www.pngmart.com/files/13/Pattern-Transparent-Background.png'
          alt={`blog cover with text, "${restaurant?.attributes.Name}"`}
          width='100%'
          height={250}
        />
      </div>
      <span className='blog-content-info'>
        {publishedDate === undefined ? null : (
          <span>
            Posted on {dateFormatter(publishedDate)} &mdash; {readingTime}{' '}
            {readingTime === 1 ? 'minute' : 'minutes'} read
          </span>
        )}
      </span>
      <div
        className='blog-content-description'
        dangerouslySetInnerHTML={renderHTML()}
      />
    </div>
  );
};

export default BlogDetail;
