import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { BlogDetailContext } from '../../../context/BlogDetailContext';
import { BlogContext } from '../../../context/BlogContext';
import { dateFormatter } from '../../../utils/Formatter';
import { calculateReadingTime, countWords } from '../../../utils/Content';

const BlogDetail = () => {
  const [readingTime, setReadingTime] = useState(0);
  const { renderHTML, getRestaurantsPost } = useContext(BlogDetailContext);
  const { restaurants } = useContext(BlogContext);

  const { id } = useParams();
  useEffect(() => {
    void getRestaurantsPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const wordsPerMinute = 225;
    const content = renderHTML().__html;
    if (content) {
      const wordCount = countWords(renderHTML().__html);
      const estimatedTime = calculateReadingTime(wordCount, wordsPerMinute);
      setReadingTime(estimatedTime);
    }
  }, [renderHTML]);

  const restaurant = restaurants.data.find((item) => {
    return item.id === +id;
  });

  const publishedDate = restaurant?.attributes.publishedAt;

  if (renderHTML().html === null) {
    return null;
  }

  return (
    <div className='blog-detail'>
      <p>
        <Link to='/'>&lt; Blog</Link>
      </p>
      <span>
        Posted on {dateFormatter(publishedDate)} &mdash; {readingTime}{' '}
        {readingTime === 1 ? 'minute' : 'minutes'} read
      </span>
      <div dangerouslySetInnerHTML={renderHTML()} />
    </div>
  );
};

export default BlogDetail;
