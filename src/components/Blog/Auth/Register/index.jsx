import { useContext } from 'react';
import { BlogContext } from '../../../../context/BlogContext';
import './styles.css';

const Register = () => {
  const {
    isRegisterLoading,
    errorRegister,
    formData,
    handleChange,
    handleSubmit,
    inputPasswordError,
    inputEmailUsenameError,
  } = useContext(BlogContext);

  return (
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            className='formInput'
            type='text'
            placeholder='Your Username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            autoComplete='off'
            required
            style={{
              border: inputEmailUsenameError
                ? '1px solid var(--dark-background-error)'
                : 'none',
            }}
          />
        </div>
        <div>
          <input
            className='formInput'
            type='email'
            placeholder='Your Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            autoComplete='off'
            required
            style={{
              border: inputEmailUsenameError
                ? '1px solid var(--dark-background-error)'
                : 'none',
            }}
          />
        </div>
        <div>
          <input
            className='formInput'
            type='password'
            placeholder='Your Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            autoComplete='off'
            required
            style={{
              border: inputPasswordError
                ? '1px solid var(--dark-background-error)'
                : 'none',
            }}
          />
        </div>
        <div className='errorForm'>
          {inputEmailUsenameError || inputPasswordError ? (
            <>
              <p>{inputEmailUsenameError}</p>
              <p>{inputPasswordError}</p>
            </>
          ) : (
            <p>{errorRegister}</p>
          )}
          <button className='formInput'  type='submit'>
            {isRegisterLoading ? 'Loading' : 'Submit'}
          </button>
        </div>
      </form>
  );
};

export default Register;
