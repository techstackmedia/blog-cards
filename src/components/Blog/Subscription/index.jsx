import React, { useState } from 'react';
import { BASE_URL } from '../../../constants/BASE_URL';
import './styles.css';
import { useTheme } from '../../../hooks/useTheme';

const Subscription = () => {
  const { isLight } = useTheme();
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
          isLight ? 'dark-blog-error-status' : ''
        }`}
      >
        {errorsMsg}
      </p>
    );
  }

  if (isLoading) {
    return (
      <p
        className={`blog-subscription-spinner ? ${isLight} ? 'dark-blog-subscription-spinner' : ''`}
      ></p>
    );
  }

  if (successMsg) {
    return (
      <p
        className={`blog-success-status ${
          isLight ? 'dark-blog-success-status' : ''
        }`}
      >
        {successMsg}
      </p>
    );
  }

  return (
    <div className='subscription-container'>
      <h2>Subscribe to Bello's Blog Newsletter</h2>
      <p>
        Receive insightful articles directly in your inbox. Don't miss out on
        the latest updates!
      </p>

      <form onSubmit={handleSubscribe} className='subscription-form'>
        <input
          className={`subscription-input ${
            isLight ? 'dark-subscription-input' : ''
          }`}
          type='email'
          placeholder='Your email'
          value={email}
          onChange={handleEmailChange}
          required
        />

        <input
          className={`subscription-input ${
            isLight ? 'dark-subscription-input' : ''
          }`}
          type='text'
          placeholder='Your name'
          value={name}
          onChange={handleNameChange}
        />

        <button
          className={`subscription-button ${
            isLight ? 'dark-subscription-button' : ''
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
