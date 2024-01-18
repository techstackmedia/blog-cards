import React, { useContext, useState } from 'react';
import { BASE_URL } from '../../../constants/BASE_URL';
import './styles.css';
import { useTheme } from '../../../hooks/useTheme';
import { BlogContext } from '../../../context/BlogContext';
import { useLocation } from 'react-router-dom';

const Subscription = () => {
  const { isDark } = useTheme();
  const { bookMark } = useContext(BlogContext);
  const { pathname } = useLocation();
  console.log(pathname);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorsMsg, seteErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSubscribe = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const request = {
      data: {
        Email: email,
        Name: name,
      },
    };
    try {
      const response = await fetch(`${BASE_URL}/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error(
          'Error occured in subscription. Please try again later!'
        );
      } else {
        const json = await response.json();
        setEmail(json.Email);
        setName(json.Name);
        localStorage.setItem('email', email);
        setSuccessMsg('Subscription was successful!');
        setTimeout(() => {
          setSuccessMsg('');
        }, 3000);
      }
    } catch (e) {
      seteErrorMsg(e.message);
      setTimeout(() => {
        seteErrorMsg('');
      }, 3000);
    } finally {
      setIsLoading(false);
      setEmail('');
      setName('');
    }
  };

  if (errorsMsg) {
    return (
      <p
        className={`blog-error-status ${
          isDark ? 'dark-blog-error-status' : ''
        }`}
        style={{ position: 'relative', top: -2 }}
      >
        {errorsMsg}
      </p>
    );
  }

  if (isLoading) {
    return (
      <p
        className={`blog-subscription-spinner ? ${isDark} ? 'dark-blog-subscription-spinner' : ''`}
      ></p>
    );
  }

  if (successMsg) {
    return (
      <p
        className={`blog-success-status ${
          isDark ? 'dark-blog-success-status' : ''
        }`}
        style={{ position: 'relative', top: -2 }}
      >
        {successMsg}
      </p>
    );
  }

  return (
    <div
      className='subscription-container'
      style={{
        position:
          bookMark?.data.length === 0 && pathname.includes('bookmark')
            ? 'absolute'
            : '',
        bottom: bookMark?.data.length === 0 ? 0 : '',
      }}
    >
      <h2>Subscribe to Bello's Blog Newsletter</h2>
      <p>
        Receive insightful articles directly in your inbox. Don't miss out on
        the latest updates!
      </p>

      <form onSubmit={handleSubscribe} className='subscription-form'>
        <input
          className={`subscription-input ${
            isDark ? 'dark-subscription-input' : ''
          }`}
          type='email'
          placeholder='Your email'
          value={email}
          onChange={handleEmailChange}
          autoComplete='off'
          spellCheck={false}
          required
        />

        <input
          className={`subscription-input ${
            isDark ? 'dark-subscription-input' : ''
          }`}
          type='text'
          placeholder='Your name'
          value={name}
          onChange={handleNameChange}
          autoComplete='off'
          spellCheck={false}
        />

        <button
          className={`subscription-button ${
            isDark ? 'dark-subscription-button' : ''
          }`}
          type='submit'
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscription;
