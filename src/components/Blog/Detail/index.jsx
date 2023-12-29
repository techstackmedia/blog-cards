import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogDetailContext } from '../../../context/BlogDetailContext';
import { BlogContext } from '../../../context/BlogContext';
import { dateFormatter } from '../../../utils/Formatter';
import { calculateReadingTime, countWords } from '../../../utils/Content';
import Sidebar from '../Sidebar';
import './styles.css';
import Subscription from '../Subscription';

const BlogDetail = () => {
  const [readingTime, setReadingTime] = useState(0);
  const { renderHTML, getRestaurantsPost } = useContext(BlogDetailContext);
  const { restaurants, pageIndex } = useContext(BlogContext);
  const [activeHeading, setActiveHeading] = useState(null);
  const [headings, setHeadings] = useState([]);
  const { id } = useParams();

  const handleScroll = () => {
    const headings = document.querySelectorAll('h3');

    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();

      if (rect.top <= 100) {
        setActiveHeading(heading.id);
        break;
      }
    }
  };

  useEffect(() => {
    const headings = document.querySelectorAll('h3');
    const headingTexts = Array.from(headings).map(
      (heading) => heading.textContent
    );
    setHeadings(headingTexts);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [renderHTML]);

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
  const updatedDate = restaurant?.attributes?.updatedAt;
  const publish = publishedDate?.split('T')[0];
  const update = updatedDate?.split('T')[0];

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
    <>
      <div className='blog-detail-page'>
        <Sidebar headings={headings} activeHeading={activeHeading} />
        <div className='blog-detail'>
          <div>
            <Link className='blog-detail-link' to={blogPage}>
              {' '}
              <span className='arrow'>&lt;</span>
              {blog}
            </Link>
          </div>
          {!publishedDate ? null : (
            <>
              <div className='blog-cover'>
                <h1 className='blog-cover-text'>
                  {restaurant?.attributes?.Name}
                </h1>
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
                  Posted on {dateFormatter(publishedDate)}
                  {update === publish ? null : (
                    <span>
                      <span className='dot'></span>Updated on{' '}
                      {dateFormatter(update)}
                    </span>
                  )}{' '}
                  &mdash; {readingTime}{' '}
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
            <div>
              <div>
                <Link
                  title={prevPage === unknownURL ? blogPosts : prevTopic}
                  to={prevPage === unknownURL ? blogPage : prevPage}
                  className='blog-detail-link'
                >
                  <span className='arrow'>&lt;</span>
                  {prevPage === unknownURL ? blog : 'Previous'}
                </Link>
              </div>
            </div>

            <div>
              <Link
                title={nextPage === unknownURL ? blogPosts : nextTopic}
                to={nextPage === unknownURL ? blogPage : nextPage}
                className='blog-detail-link'
              >
                {nextPage === unknownURL ? blog : 'Next'}
                <span className='arrow'>&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Subscription />
    </>
  );
};

export default BlogDetail;
