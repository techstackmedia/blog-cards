import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function BlogCard() {
  useEffect(() => {
    void getAllRestaurants();
  }, []);

  const [restaurants, setRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/restaurants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
    return <p>{error}</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='blog-container'>
      {
        restaurants?.data.map((item) => {
          const cardTitle = item.attributes.Name;
          const cardDescription = item.attributes.Description[0].children[0].text

          return (
            <div key={item.id} className='blog-card'>
              <div className='blog-card-image'>
                <p className='blog-card-title'>{cardTitle}</p>
              </div>
              <div className='blog-card-content'>
                <h2 className='blog-card-title'>{cardTitle}</h2>
                <p className='blog-card-description'>{cardDescription}</p>
              </div>
              <Link to={`/${item.id}`} className='blog-card-link'>Read More</Link>
            </div>
          )
        })
      }
    </div>
  );
}

export default BlogCard;
