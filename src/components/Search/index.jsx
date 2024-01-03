import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './styles.css';
import { ThemeContext } from '../../context/ThemeContext';
import MeiliSearch from 'meilisearch';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const { isDark } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      const client = new MeiliSearch({
        host: 'http://localhost:7700',
        apiKey: 'aSampleMasterKey',
      });
      const index = client.index('restaurant');
      try {
        const searchResults = await index.search(query);
        if (!searchResults) {
          throw new Error(
            'Unable to make search request at the moment! Please try again later.'
          );
        }
        setResults(searchResults.hits);
      } catch (e) {
        setError(e.message);
      }
    };
    search();
  }, [query]);

  useEffect(() => {
    if (selectedItem !== null) {
      handleCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);
  const navigate = useNavigate();

  const searchResults = results.map((result) => {
    const handleNavClick = () => {
      handleItemClick(result.Name);
      navigate(`/${result.id}`);
    };

    if (!result || !result.Name) {
      return null;
    }

    return (
      <div
        key={result._meilisearch_id}
        tabIndex={0}
        onClick={handleNavClick}
        className={`search-result ${
          selectedItem === result.Name ? 'selected' : ''
        }`}
        style={{
          border: isDark ? '1px solid var(--dark-color-button-disable)' : '',
          backgroundColor: isDark ? 'var(--transparent-navbar)' : '',
          color: isDark ? 'var(--color-white)' : '',
        }}
      >
        <h4>{result.Name}</h4>
        <p>{result.Description[0]?.children[0]?.text}</p>
        <p style={{ color: isDark ? 'var(--dark-color-link)' : '' }}>
          Categories:{' '}
          {result.categories.map((categories) => categories.Name).join(', ')}
        </p>
      </div>
    );
  });

  useEffect(() => {
    const body = document.body;

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      body.style.overflow = 'hidden';
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      body.style.overflow = 'auto';
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      body.style.overflow = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSelectedItem(null);
  };

  const handleSearchClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleItemClick = useCallback(
    (item) => {
      setQuery(item);
      setSelectedItem(item);
      handleCloseModal();
    },
    [handleCloseModal]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      } else if (event.ctrlKey && event.key === 'k') {
        handleSearchClick();
      } else if (showModal) {
        const items = modalRef.current?.querySelectorAll('li');
        const currentIndex = items
          ? Array?.from(items).indexOf(document.activeElement)
          : -1;

        if (event.key === 'ArrowDown' && currentIndex < items?.length - 1) {
          items[currentIndex + 1].focus();
        } else if (event.key === 'ArrowUp' && currentIndex > 0) {
          items[currentIndex - 1].focus();
        } else if (event.key === 'Enter' && currentIndex !== -1) {
          handleItemClick(items[currentIndex].innerText);
        }
      }
    },
    [handleCloseModal, handleItemClick, handleSearchClick, showModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedItem(null);
  }, [showModal]);

  return (
    <div className='search-container'>
      <div className='command' style={{ display: showModal ? 'none' : '' }}>
        <code>Ctrl</code> + <code>K</code>
      </div>
      <input
        type='search'
        value={query}
        onChange={handleInputChange}
        onClick={handleSearchClick}
        placeholder='🔍 Search...'
        className={`${isDark ? 'search-input' : ''} ${
          showModal ? 'hidden' : ''
        }`}
        style={{
          border: !isDark ? '1px solid var(--color-button-disable)' : '',
        }}
      />
      {showModal ? (
        <div
          role='dialog'
          aria-labelledby='modal-title'
          className={`search-modal ${isDark ? 'dark-search-modal' : ''}`}
          style={{
            backdropFilter: query?.length > 0 ? 'blur(7px)' : '',
            WebkitBackdropFilter: query?.length > 0 ? 'blur(7px)' : '',
          }}
        >
          <div
            ref={modalRef}
            className={`modal-content ${isDark ? 'dark-modal-content' : ''}`}
          >
            <div className='search'>
              <input
                type='search'
                value={query}
                onChange={handleInputChange}
                onClick={handleSearchClick}
                placeholder='🔍 Search...'
                autoFocus
                ref={inputRef}
                className={`${isDark ? 'search-input' : ''} ${
                  showModal ? 'visible' : ''
                }`}
                style={{
                  border: !isDark
                    ? '1px solid var(--color-button-disable)'
                    : '',
                }}
              />
            </div>
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            {error ? (
              error
            ) : query && query.length > 0 ? (
              <div className='search-results'>{searchResults}</div>
            ) : (
              <p>🔍 Type to see search results</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
