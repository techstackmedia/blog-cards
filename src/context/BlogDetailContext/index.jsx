import { createContext, useState } from 'react';
import { defaultBlogDetailValue } from '../defaultValues';
import Spinner from '../../components/shared/Spinner';
import { BASE_URL } from '../../constants/BASE_URL';

const BlogDetailContext = createContext(defaultBlogDetailValue);
const BlogDetailProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailPost, setDetailPost] = useState(null);
  const getRestaurantsPost = async (id) => {
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

  if (error && isLoading) {
    return (
      <div>
        <Spinner />
        <p>{error}</p>
      </div>
    );
  }

  const name = detailPost?.data.attributes.Name;
  const description = detailPost?.data.attributes.Description;

  const renderHTML = () => {
    let html = name === undefined ? null : `<h2>${name}</h2>`;

    if (description && description.length > 0) {
      description.forEach((paragraph) => {
        if (paragraph.children && paragraph.children.length > 0) {
          const text = paragraph.children
            .map((child) => {
              if (child.bold) {
                return `<strong>${child.text}</strong>`;
              } else if (child.type === 'link') {
                return `<a href=${child.url}>${child.children[0].text}</a>`;
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
    <BlogDetailContext.Provider value={{ renderHTML, getRestaurantsPost }}>
      {children}
    </BlogDetailContext.Provider>
  );
};

export { BlogDetailProvider, BlogDetailContext };
