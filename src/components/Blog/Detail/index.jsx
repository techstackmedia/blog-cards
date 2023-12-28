import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogDetailContext } from '../../../context/BlogDetailContext';
import { BlogContext } from '../../../context/BlogContext';
import { dateFormatter } from '../../../utils/Formatter';
import { calculateReadingTime, countWords } from '../../../utils/Content';
import './styles.css';

const BlogDetail = () => {
  const [readingTime, setReadingTime] = useState(0);
  const { renderHTML, getRestaurantsPost } = useContext(BlogDetailContext);
  const { restaurants, pageIndex } = useContext(BlogContext);
  const { id } = useParams();

  useEffect(() => {
    getRestaurantsPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderedHTML = renderHTML();
  const content = renderedHTML.__html;
  const wordsPerMinute = 225;

  useEffect(() => {
    if (content) {
      const wordCount = countWords(content);
      const estimatedTime = calculateReadingTime(wordCount, wordsPerMinute);
      setReadingTime(estimatedTime);
    }
  }, [content, renderHTML]);

  const findRestaurantById = (restaurantId) =>
    restaurants?.data.find((item) => item.id === +restaurantId);

  const restaurant = findRestaurantById(id);
  const restaurantID = restaurant?.id;

  const restaurantIndex = restaurants?.data.findIndex(
    (item) => item.id === +id
  );

  const getNextPage = (index) =>
    index === undefined || !restaurants?.data.length
      ? null
      : `/${restaurants?.data[index + 1]?.id}`;

  const getPrevPage = (index) =>
    index === undefined || !restaurants?.data.length
      ? null
      : `/${restaurants?.data[index - 1]?.id}`;

  const nextPage = getNextPage(restaurantIndex);
  const prevPage = getPrevPage(restaurantIndex);

  const publishedDate = restaurant?.attributes?.publishedAt;

  const getNextRestaurant = findRestaurantById(restaurantID + 1);
  const nextTopic = getNextRestaurant?.attributes?.Name;

  const getPrevRestaurant = findRestaurantById(restaurantID - 1);
  const prevTopic = getPrevRestaurant?.attributes?.Name;
  const unknownURL = '/undefined';
  const blogPosts = 'Blog Posts';
  const blogPage = `/?page=${pageIndex}`;
  const blog = 'Blog';

  if (!content) {
    return null;
  }

  return (
    <div className='blog-detail'>
      <p>
        <Link to={blogPage}>&lt; {blog}</Link>
      </p>
      {!publishedDate ? null : (
        <>
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
            <span>
              Posted on {dateFormatter(publishedDate)} &mdash; {readingTime}{' '}
              {readingTime === 1 ? 'minute' : 'minutes'} read
            </span>
          </span>
        </>
      )}
      <div
        className='blog-content-description'
        dangerouslySetInnerHTML={renderedHTML}
      />
      <div className='blog-detail-links'>
        <div className='blog-detail-link'>
          <span>&lt;</span>
          <div>
            <Link
              title={prevPage === unknownURL ? blogPosts : prevTopic}
              to={prevPage === unknownURL ? blogPage : prevPage}
            >
              {prevPage === unknownURL ? blog : 'Previous'}
            </Link>
          </div>
        </div>

        <div className='blog-detail-link'>
          <Link
            title={nextPage === unknownURL ? blogPosts : nextTopic}
            to={nextPage === unknownURL ? blogPage : nextPage}
          >
            {nextPage === unknownURL ? blog : 'Next'} &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
