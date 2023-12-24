import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../shared/Spinner';
import './styles.css';

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

  const name = detailPost?.data.attributes.Name;
  const description = detailPost?.data.attributes.Description;

  const renderHTML = () => {
    let html = `<h2>${name}</h2>`;

    if (description && description.length > 0) {
      description.forEach((paragraph) => {
        if (paragraph.children && paragraph.children.length > 0) {
          const text = paragraph.children
            .map((child) => {
              if (child.bold) {
                return `<strong>${child.text}</strong>`;
              } else if (child.url) {
                return `<a href=${child.url} target="_blank" rel="noopener noreferrer">${child.children[0].text}</a>`;
              } else {
                return child.text;
              }
            })
            .join(' ');

          html += `<p>${text}</p>`;
        }
      });
    }

    return { __html: html };
  };

  return (
    <div className='blog-detail'>
      <p>
        <Link to='/'>&lt; Back</Link>
      </p>
      <div dangerouslySetInnerHTML={renderHTML()} />
    </div>
  );
};

export default BlogDetail;
