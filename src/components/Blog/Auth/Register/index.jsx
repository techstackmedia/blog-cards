import { useContext } from 'react';
import Navbar from '../../../Navbar';
import Footer from '../../../Footer';
import { BlogContext } from '../../../../context/BlogContext';

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
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: 100,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
          height: 'calc(100vh - 190px)',
          gap: 25,
        }}
      >
        <div>
          <input
            type='text'
            placeholder='Your Username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: '357px',
              border: inputEmailUsenameError ? '1px solid red' : 'none',
            }}
          />
        </div>
        <div>
          <input
            type='email'
            placeholder='Your Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '357px',
              border: inputEmailUsenameError ? '1px solid red' : 'none',
            }}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Your Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '357px',
              border: inputPasswordError ? '1px solid red' : 'none',
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          {inputEmailUsenameError || inputPasswordError ? (
            <>
              <p
                style={{
                  position: 'absolute',
                  top: -35,
                  color: 'red',
                  fontSize: 14,
                }}
              >
                {inputEmailUsenameError}
              </p>
              <p
                style={{
                  position: 'absolute',
                  top: -35,
                  color: 'red',
                  fontSize: 14,
                }}
              >
                {inputPasswordError}
              </p>
            </>
          ) : (
            <p
              style={{
                position: 'absolute',
                top: -35,
                color: 'red',
                fontSize: 14,
              }}
            >
              {errorRegister}
            </p>
          )}
          <button type='submit' style={{ width: 357 }}>
            {isRegisterLoading ? 'Loading' : 'Submit'}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
