import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogDetailContext } from '../../../context/BlogDetailContext';
import { BlogContext } from '../../../context/BlogContext';
import { dateFormatter } from '../../../utils/Formatter';
import { calculateReadingTime, countWords } from '../../../utils/Content';
import Sidebar from '../Sidebar';
import './styles.css';
import Subscription from '../Subscription';
import { useTheme } from '../../../hooks/useTheme';

const BlogDetail = () => {
  const { isDark } = useTheme();
  const [readingTime, setReadingTime] = useState(0);
  const { renderHTML, getRestaurantsPost } = useContext(BlogDetailContext);
  const { restaurants, pageIndex } = useContext(BlogContext);
  const [activeHeading, setActiveHeading] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [scrollDirection, setScrollDirection] = useState('down');

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

    setScrollDirection((prevDirection) =>
      window.scrollY >= 663
        ? window.scrollY > prevDirection
          ? 'down'
          : 'up'
        : 'down'
    );
  };

  useEffect(() => {
    const headings = document.querySelectorAll('h3');

    const handleHeadingClick = (event) => {
      const sectionId = event.target.id;
      if (sectionId) {
        window.location.hash = sectionId;
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener('click', handleHeadingClick);
    });

    const headingTexts = Array.from(headings).map(
      (heading) => heading.textContent
    );
    setHeadings(headingTexts);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      headings.forEach((heading) => {
        heading.removeEventListener('click', handleHeadingClick);
      });
    };
  }, [renderHTML]);

  useEffect(() => {
    if (id) {
      getRestaurantsPost(id);
    }
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

  useEffect(() => {
    document.title = restaurant?.attributes?.Name
  }, [restaurant?.attributes?.Name])

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

  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const [height1, setHeight1] = useState(0);
  const [height2, setHeight2] = useState(0);

  useEffect(() => {
    if (divRef1.current || divRef2.current) {
      const divHeight1 = divRef1.current.clientHeight;
      setHeight1(divHeight1);
      const divHeight2 = divRef2.current.clientHeight;
      setHeight2(divHeight2);
    }
  }, [prevPage, prevTopic, isDark]);

  const storedEmail = localStorage.getItem('email');

  if (!content) {
    return null;
  }
  
  return (
    <>
      <style>
        {`
          h3 {
            scroll-margin-top: ${scrollDirection === 'up' ? '70px' : '40px'};
          }
        `}
      </style>
      <div className='blog-detail-page'>
        <Sidebar headings={headings} activeHeading={activeHeading} />
        <div className={`blog-detail ${isDark ? 'dark-blog-detail' : ''}`}>
          <div>
            <Link className='blog-detail-link' to={blogPage}>
              {' '}
              <span className={`arrow ${isDark ? 'dark-arrow' : ''}`}>
                &lt;
              </span>
              {blog}
            </Link>
          </div>
          {!publishedDate ? null : (
            <>
              <div className='blog-cover'>
                <h1
                  className={`blog-cover-text ${
                    isDark ? 'dark-blog-cover-text' : ''
                  }`}
                >
                  {restaurant?.attributes?.Name}
                </h1>
                <img
                  className={`blog-cover-image ${
                    isDark ? 'dark-blog-cover-image' : ''
                  }`}
                  src='http://www.pngmart.com/files/13/Pattern-Transparent-Background.png'
                  alt={`blog cover with text, "${restaurant?.attributes.Name}"`}
                  width='100%'
                  height={250}
                />
              </div>
              <span
                className={`blog-content-info ${
                  isDark ? 'dark-content-info' : ''
                }`}
              >
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
          <div className='blog-detail-links' style={{ margin: '50px 0 0' }}>
            <div>
              <div ref={divRef1}>
                <Link
                  title={prevPage === unknownURL ? blogPosts : prevTopic}
                  to={prevPage === unknownURL ? blogPage : prevPage}
                  className={`blog-detail-link ${
                    isDark ? 'dark-blog-detail-link' : ''
                  }`}
                  style={{
                    display: 'flex',
                    gap: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span className='arrow'>&lt;</span>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      height: height1,
                      flexDirection: 'column',
                      width: 230,
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        color: isDark
                          ? 'var(--color-white)'
                          : 'var(--color-black)',
                      }}
                    >
                      {prevPage === unknownURL ? blog : 'Previous'}
                    </div>
                    <div>{prevPage === unknownURL ? `Posts` : prevTopic}</div>
                  </div>
                </Link>
              </div>
            </div>

            <div ref={divRef2}>
              <Link
                title={nextPage === unknownURL ? blogPosts : nextTopic}
                to={nextPage === unknownURL ? blogPage : nextPage}
                className={`blog-detail-link ${
                  isDark ? 'dark-blog-detail-link' : ''
                }`}
                style={{
                  display: 'flex',
                  gap: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: height2,
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    width: 230,
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      color: isDark
                        ? 'var(--color-white)'
                        : 'var(--color-black)',
                    }}
                  >
                    {nextPage === unknownURL ? blog : 'Next'}
                  </div>
                  <div>{nextPage === unknownURL ? `Posts` : nextTopic}</div>
                </div>

                <span className='arrow'>&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!storedEmail ? (
        <>
          <hr className={`${isDark} ? 'hr' : ''`} />
          <Subscription />
        </>
      ) : null}
    </>
  );
};

export default BlogDetail;
