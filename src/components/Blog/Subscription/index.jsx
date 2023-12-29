import React, { useState } from 'react';
import './styles.css';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  const handleSubscribe = () => {
    console.log(`Subscribed: ${name ? name : 'No Name'}, Email: ${email}`);
  };

  return (
    <div className='subscription-container'>
      <h2>Subscribe to Bello's Blog Newsletter</h2>
      <p>
        Receive insightful articles directly in your inbox. Don't miss out on
        the latest updates!
      </p>

      <form className='subscription-form'>
        {/* <label className='subscription-label' htmlFor='email'>
          Email:
        </label> */}
        <input
          className='subscription-input'
          type='email'
          // id='email'
          placeholder='Your email'
          value={email}
          onChange={handleEmailChange}
          required
        />

        {/* <label className='subscription-label' htmlFor='name'>
          Name (optional):
        </label> */}
        <input
          className='subscription-input'
          type='text'
          // id='name'
          placeholder='Your name'
          value={name}
          onChange={handleNameChange}
        />

        <button
          className='subscription-button'
          type='button'
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscription;
