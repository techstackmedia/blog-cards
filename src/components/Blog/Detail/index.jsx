import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../shared/Spinner'
import './styles.css'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BlogDetail = () => {
  const { id } = useParams();
  useEffect(() => {
    void getRestaurantsPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailPost, setDetailPost] = useState(null);
  const getRestaurantsPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error in getting blog post with id of ${id}`);
      }
      const json = await response.json();
      setDetailPost(json);
    } catch (e) {
      setError(e.message);
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

  return (
    <div className='blog-detail'>
      <p>
        <Link to='/'>&lt; Back</Link>
      </p>
      <h1>{detailPost?.data.attributes.Name}</h1>
      <p>{detailPost?.data.attributes.Description[0].children[0].text}</p>
    </div>
  );
};

export default BlogDetail;
